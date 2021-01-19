const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {

    const redis = require('redis');
    const util = require('util');


    const redisUrl = 'redis://127.0.0.1:6379';

    const client = redis.createClient(redisUrl);
    client.get = util.promisify(client);
    console.log('im about to query');
    console.log(this.getQuery());

    console.log(this.mongooseCollection.name);
   const key= JSON.stringify(Object.assign({}, this.getQuery, {
        collection: this.mongooseCollection.name
    }));

    const cacheValue= await client.get(key);

    if(cacheValue){
        console.log(cacheValue);
    }

    const result= await exec.apply(this, arguments);
    console.log('done',result);

}