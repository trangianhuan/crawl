const pt = require('puppeteer');
var   fs = require('fs');

var content ="test save file\r\n";
// fs.writeFile('file/write.txt', content, 'utf8', function(err){
//     if(err) throw err;
//     else console.log('write file success!');
// });

fs.appendFile('file/write.txt', content, 'utf8', function(err){
    if(err) throw err;
    else console.log('write file success!');
});

// (async() => {
//     const browser = await pt.launch({
//         headless: false,
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       });
//     const page = await browser.newPage();
//     await page.goto('https://viblo.asia/',{waitUntil: 'load'});
//     //let article = document.querySelectorAll('.post-title--inline');

//     const imgLinks = await page.evaluate(() => {
//         let imgElements = document.querySelectorAll('.post-title--inline h3 a');
//         imgElements = [...imgElements];
//         let imgLinks = imgElements.map(i => {
//             return i.getAttribute('href');
//         });
//         return imgLinks;
//     });

//     console.log(imgLinks);
//     await page.screenshot({path:'example.png'});
//     //await browser.close();
// })();