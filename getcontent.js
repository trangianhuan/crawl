
// In other environments:
const cheerio = require('cheerio');
const Axios = require('axios')
const Domain = require('./class')

// getContent('https://vnexpress.net/ky-thi-khac-thuong-cua-cau-hoc-sinh-18-tuoi-4306762.html')
url = 'https://vnexpress.net/ky-thi-khac-thuong-cua-cau-hoc-sinh-18-tuoi-4306762.html';

Axios({
        url,
        method: 'GET',
    }).then(function (response) {
        // handle success
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        var a = new Domain.VnExpress($);
        // console.log($.html('meta[name="description"]'))
        console.log(a.getMetaDescription())
        console.log(a.getHeadTitle())
        console.log(a.getDetailContent())
    })
    // console.log(response.data.body())

