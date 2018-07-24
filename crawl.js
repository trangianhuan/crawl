const pt = require('puppeteer');
(async() => {
    const browser = await pt.launch();
    const page = await browser.newPage();
    await page.goto('https://viblo.asia/',{waitUntil: 'domcontentloaded'});
    await page.screenshot({path:'example.png'});
    await browser.close();
})();