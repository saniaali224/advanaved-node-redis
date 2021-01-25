const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async() => {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
})

afterEach(async()=>{
    await browser.close();
})


test('the header has the correct text', async () => {


    const text = await page.$eval('a.left brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');

    test('clicking oauth',async()=>{
      await page.click('.right a');

      const url = await page.url();
    })
})