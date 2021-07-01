const pt = require('puppeteer');
const removeMd = require('remove-markdown');
const natural = require('natural');
const tokenizer = new natural.SentenceTokenizer();


var   fs = require('fs');
var axios = require('axios');
const { join } = require('path');
var url = 'https://viblo.asia/api/post/';
var content ="test save file\r\n";
var data;

step2GetDataById();
// test
// axios.get('https://viblo.asia/api/posts/maGK7jMD5j2').then(function (response) {
//     var article = [];
//     article = {
//         id: response.data.post.data.id,
//         title: response.data.post.data.title,
//         category_id: response.data.post.data.category_id,
//         contents: response.data.post.data.contents,
//         thumbnail_url: response.data.post.data.thumbnail_url,
//         is_published: response.data.post.data.is_published,
//         views_count: response.data.post.data.views_count,
//         reading_time: response.data.post.data.reading_time,
//         user_id: response.data.post.data.user_id,
//         tags: response.data.post.data.tags,
//         create_at: response.data.post.data.updated_at,
//         update_at: response.data.post.data.updated_at,
//         published_at: response.data.post.data.published_at
//     };

//     var test=tokenizer.tokenize(removeMd(response.data.post.data.contents))
//     arr = test.filter(function (item) {
//         return item.length > 10;
//     });

//     console.log(arr);
//     console.log(arr.join("\n"))
//     // let contentJson = JSON.stringify(article);
//     // fs.appendFile('file/json.txt', contentJson + "\n", function (err) {
//     //     if (err) throw err;
//     //     console.log('Saved!');
//     // });

//     // let plainText = removeMd(response.data.post.data.contents)
//     // fs.appendFile('file/plainText.txt', plainText + "\n", function (err) {
//     //     if (err) throw err;
//     //     console.log('Saved!');
//     // });

// }).catch(function (err) {
//     console.log(err)
// })


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
    fs.readFile('file/write2.txt', 'utf8', async function(err,data){
        let url = 'https://viblo.asia/api/posts/';
        //https://viblo.asia/api/posts/maGK7jMD5j2
        if(err) throw err;
        else {
            data = data.split('\r\n');
        }
        if(!data) return;
        var jsonFile = {
            article: []
        };
        id=0;
        let result;

        // data = data.slice(0,10);
        // console.log(data);
        var flag = true;
        for(var value of data){
            id++;

            if (flag) {
                if (value == '3ZabG9KkRzY6') {
                    flag = false;
                }
                continue;
            }

            console.log(url + value, id);
            await new Promise(resolve => setTimeout(resolve, 200));

            result = await axios.get(url+value).then(function(response){
                article = {
                    id: response.data.post.data.id,
                    title: response.data.post.data.title,
                    category_id: response.data.post.data.category_id,
                    contents: response.data.post.data.contents,
                    thumbnail_url: response.data.post.data.thumbnail_url,
                    is_published: response.data.post.data.is_published,
                    views_count: response.data.post.data.views_count,
                    reading_time: response.data.post.data.reading_time,
                    user_id: response.data.post.data.user_id,
                    slug: response.data.post.data.slug,
                    tags: response.data.post.data.tags,
                    create_at: response.data.post.data.updated_at,
                    update_at: response.data.post.data.updated_at,
                    published_at: response.data.post.data.published_at
                };
                let contentJson = JSON.stringify(article);
                fs.appendFile('file/json.txt', contentJson + "\n", function (err) {
                    if (err) throw err;
                    // console.log('Saved!');
                });

                var test = tokenizer.tokenize(removeMd(response.data.post.data.contents))
                arr = test.filter(function (item) {
                    return item.length > 10;
                });

                var viblo;
                for (var element of arr) {
                    viblo = {
                        content: element
                    }
                    contentJson = JSON.stringify(viblo);

                    fs.appendFile('file/plainJson.json', contentJson + "\n", function (err) {
                        if (err) throw err;
                        // console.log('Saved!');
                    });
                }

                // if([500,1000,2000,3000,4000,5000,6000,7000,8000,9000,
                //     10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000,
                //     20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000,
                //     30000, 31000, 32000, 33000, 34000, 25000, 36000, 37000, 38000, 39000,
                //     40000, 41000, 42000, 43000, 44000, 25000, 46000, 47000, 48000, 49000
                // ].indexOf(id) >= 0){
                //     let contentJson = JSON.stringify(jsonFile);
                //     fs.writeFile('file/data-viblo'+id+'.json', contentJson, 'utf8', function(err){
                //         if(err) throw err;
                //         else console.log('write json '+id+' file success!');
                //     });
                // }
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
    await page.setDefaultNavigationTimeout(0);

    await page.goto('https://viblo.asia/',{waitUntil: 'load'});
    //let article = document.querySelectorAll('.post-title--inline');
    for (var i = 2; i < 1545; i++) {
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
            await fs.appendFile('file/write2.txt', articles.join("\r\n").concat("\r\n"), 'utf8', function(err){
                if(err) throw err;
                else console.log('write id file success!');
            });
        }

        navigationPromise = page.waitForNavigation();
        await page.click('.pagination a[href*="/newest?page='+i+'"]'); // Clicking the link will indirectly cause a navigation
        await navigationPromise; // The navigationPromise resolves after navigation has finished
    }
}


// (async() => {
//     const browser = await pt.launch({
//         headless: false,
//         args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless'],
//       });
//     const page = await browser.newPage();
//     step1GetAllIdPost(page);


//     const response = await Promise.all([
//       page.waitForNavigation({ waitUntil: 'networkidle0' }),
//         page.click('.pagination a[href*="/newest?page=2"]'),
//     ]);
//     console.log(response);
//     await page.screenshot({path:'example.png'});
//     await browser.close();
// })();
