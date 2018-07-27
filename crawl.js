const pt = require('puppeteer');
var   fs = require('fs');
var axios = require('axios');
var url = 'https://viblo.asia/api/post/';
var content ="test save file\r\n";
var data;

step2GetDataById();

async function getArticle(id) {
    let url = 'https://viblo.asia/api/posts/';
    var result = await fetch(url+value, {
        method: 'GET'
    }).then(rs => rs.json());

    return result.value.map(vl => {
        return { title: vl.title, contents: vl.contents };
    });
}

async function step2GetDataById(){
    fs.readFile('file/write.txt', 'utf8', async function(err,data){
        let url = 'https://viblo.asia/api/posts/';
        //https://viblo.asia/api/posts/maGK7jMD5j2
        if(err) throw err;
        else {
            data = data.split('\n');
        }
        if(!data) return;
        var jsonFile = {
            article: []
        };
        id=0;
        let result;

        //data = data.slice(0,1);
        console.log(data.length);

        for(var value of data){
            console.log(url + value);
            id++;
            result = await axios.get(url+value).then(function(response){
                console.log(id);
                jsonFile.article.push({
                    id: id,
                    title: response.data.post.data.title,
                    category_id: response.data.post.data.category_id,
                    contents: response.data.post.data.contents,
                    is_published: response.data.post.data.is_published,
                    tags: response.data.post.data.tags,
                    create_at: response.data.post.data.updated_at,
                    update_at: response.data.post.data.updated_at,
                    published_at: response.data.post.data.published_at
                });
                if([500,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000].indexOf(id) >= 0){
                    let contentJson = JSON.stringify(jsonFile);
                    fs.writeFile('file/data-viblo'+id+'.json', contentJson, 'utf8', function(err){
                        if(err) throw err;
                        else console.log('write json '+id+' file success!');
                    });
                }
            }).catch(function(err){
                console.log(err)
            })
        }

        let contentJson = JSON.stringify(jsonFile);
        fs.writeFile('file/data-viblo.json', contentJson, 'utf8', function(err){
            if(err) throw err;
            else console.log('write all json success!');
        });

    });
}

async function step1GetAllIdPost(page){
    await page.goto('https://viblo.asia/',{waitUntil: 'load'});
    //let article = document.querySelectorAll('.post-title--inline');
    for (var i = 2; i < 700; i++) {
        console.log('page=', i - 1);
        articles = await page.evaluate(() => {
            let imgElements = document.querySelectorAll('.post-title--inline h3 a');
            imgElements = [...imgElements];
            let articles = imgElements.map(i => {
                return i.getAttribute('href').split('-').pop();
            });
            return articles;
        });

        if(articles){
            await fs.appendFile('file/write.txt', articles.join("\r\n").concat("\r\n"), 'utf8', function(err){
                if(err) throw err;
                else console.log('write id file success!');
            });
        }

        navigationPromise = page.waitForNavigation();
        await page.click('.pagination a[href*="/?page='+i+'"]'); // Clicking the link will indirectly cause a navigation
        await navigationPromise; // The navigationPromise resolves after navigation has finished
    }
}


//(async() => {
    // const browser = await pt.launch({
    //     headless: false,
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   });
    // const page = await browser.newPage();
    //step1GetAllIdPost(page);
    //
    //
    // const response = await Promise.all([
    //   page.waitForNavigation(waitOptions),
    //   page.click('.pagination a[href*="/page=2"]', clickOptions),
    // ]);
    // console.log(response);
    //await page.screenshot({path:'example.png'});
    //await browser.close();
//})();