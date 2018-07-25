const pt = require('puppeteer');
var   fs = require('fs');
var axios = require('axios');
var url = 'https://viblo.asia/api/post/';
var content ="test save file\r\n";
fs.readFile('file/write.txt', 'utf8', function(err,data){
    let url = 'https://viblo.asia/api/posts/';//https://viblo.asia/api/posts/maGK7jMD5j2
    if(err) throw err;
    else {
        console.log('read file success!');
        data=data.split('\r\n');
        console.log(typeof data);
         for(var value of data){
            console.log(url + value);
            axios.get(url+value).then(function(response){
                console.log(response.data.post.data.contents);
            }).catch(function(err){
                console.log(err)
            })
            break;
        }
    }
});

(async() => {
    // const browser = await pt.launch({
    //     headless: false,
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   });
    // const page = await browser.newPage();
    //step1GetAllIdPost(page);


    // const response = await Promise.all([
    //   page.waitForNavigation(waitOptions),
    //   page.click('.pagination a[href*="/page=2"]', clickOptions),
    // ]);
    // console.log(response);
    //await page.screenshot({path:'example.png'});
    //await browser.close();
})();

async function step1GetAllIdPost(page){
    await page.goto('https://viblo.asia/',{waitUntil: 'load'});
    //let article = document.querySelectorAll('.post-title--inline');
    let imgLinks = await page.evaluate(() => {
        let imgElements = document.querySelectorAll('.post-title--inline h3 a');
        imgElements = [...imgElements];
        let imgLinks = imgElements.map(i => {
            return i.getAttribute('href').split('-').pop();
        });
        return imgLinks;
    });

    console.log(imgLinks);
    if(imgLinks){
        await fs.appendFile('file/write.txt', imgLinks.join("\r\n").concat("\r\n"), 'utf8', function(err){
            if(err) {
                console.log('loi roi!! ');
                throw err;
            }
            else console.log('write file success!');
        });
    }

    let navigationPromise = page.waitForNavigation();
    await page.click('.pagination a[href*="/?page=2"]'); // Clicking the link will indirectly cause a navigation
    await navigationPromise; // The nvigationPromise resolves after navigation has finished

    for (var i = 3; i < 700; i++) {
        console.log('page=',i);
        imgLinks = await page.evaluate(() => {
            let imgElements = document.querySelectorAll('.post-title--inline h3 a');
            imgElements = [...imgElements];
            let imgLinks = imgElements.map(i => {
                return i.getAttribute('href').split('-').pop();
            });
            return imgLinks;
        });

        if(imgLinks){
            await fs.appendFile('file/write.txt', imgLinks.join("\r\n").concat("\r\n"), 'utf8', function(err){
                if(err) throw err;
                else console.log('write file success!');
            });
        }

        navigationPromise = page.waitForNavigation();
        await page.click('.pagination a[href*="/?page='+i+'"]'); // Clicking the link will indirectly cause a navigation
        await navigationPromise; // The navigationPromise resolves after navigation has finished

    }
}