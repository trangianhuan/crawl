const puppeteer = require('puppeteer');
const sharp = require('sharp');
var   fs = require('fs');
var baseUrl = 'http://cameracongnghemoi.com/'
//var axios = require('axios');
//var url = 'https://viblo.asia/api/post/';
// var content ="test save file\r\n";
// var data;

var arrImage = [];

var links = [{
      key:'dau-ghi-hinh-hikvision',
      url:'http://cameracongnghemoi.com/san-pham/dau-ghi-hinh-hikvision/'
    },
    {
      key:'dau-ghi-hinh-dahua',
      url:'http://cameracongnghemoi.com/san-pham/dau-ghi-hinh-dahua/'
    },
    {
      key:'dau-ghi-hinh-osamic',
      url:'http://cameracongnghemoi.com/san-pham/dau-ghi-hinh-osamic/'
    },
    {
      key:'camera-quan-sat-hikvision',
      url:'http://cameracongnghemoi.com/san-pham/camera-quan-sat-hikvision/'
    },
    {
      key:'camera-quan-sat-hikvision-2',
      url:'http://cameracongnghemoi.com/san-pham/camera-quan-sat-hikvision/&p=2'
    },
    {
      key:'camera-quan-sat-dahua',
      url:'http://cameracongnghemoi.com/san-pham/camera-quan-sat-dahua/'
    },
    {
      key:'camera-quan-sat-osamic',
      url:'http://cameracongnghemoi.com/san-pham/camera-quan-sat-osamic/'
    },
    {
      key:'camera-quan-sat-osamic-2',
      url:'http://cameracongnghemoi.com/san-pham/camera-quan-sat-osamic/&p=2'
    },
    {
      key:'camera-khong-day-hikvision',
      url:'http://cameracongnghemoi.com/san-pham/camera-khong-day-hikvision/'
    },
    {
      key:'camera-khong-day-dahua',
      url:'http://cameracongnghemoi.com/san-pham/camera-khong-day-dahua/'
    },
    {
      key:'camera-khong-day-dahua-2',
      url:'http://cameracongnghemoi.com/san-pham/camera-khong-day-dahua/&p=2'
    },
  ]

var mapMenu = {
  'camera-khong-day-dahua-2.json' : 19,
  'camera-khong-day-dahua.json' : 19,
  'camera-khong-day-hikvision.json' : 18,
  'camera-quan-sat-dahua.json' : 15,
  'camera-quan-sat-hikvision-2.json' : 14,
  'camera-quan-sat-hikvision.json' : 14,
  'camera-quan-sat-osamic-2.json' : 16,
  'camera-quan-sat-osamic.json' : 16,
  'dau-ghi-hinh-dahua.json' : 11,
  'dau-ghi-hinh-hikvision.json' : 10,
  'dau-ghi-hinh-osamic.json' : 12,
}


function priceFormat(str){
  return str.replace(/\./g, "").replace(' VND', '')
}

function createSlug(str){
  var slug;
  //Đổi chữ hoa thành chữ thường
  slug = str.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  //Xóa các ký tự đặt biệt
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, " - ");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  //In slug ra textbox có id “slug”
  return slug;
}

readAndWriteSql()

//createImageFolder(1, 'large_dau-ghi-hinh-osamic-osd-8420sh-5463.jpg')

function createImageFolder(imageId, imageName){

  var images = [
    './images/large_dau-ghi-hinh-osamic-osd-8420sh-5463.jpg',
    './images/large_dau-ghi-hinh-osamic-osd-8420sh-3135.jpg',
    './images/large_dau-ghi-hinh-osamic-osd-8420sh-5547.jpg',
    './images/large_dau-ghi-hinh-osamic-osd-8420sh-4440.jpg',
    './images/large_dau-ghi-hinh-osd-604-ahd-5825.jpg',
    './images/large_dau-ghi-hinh-osd-608-ahd-9832.jpg',
    './images/large_dau-ghi-hinh-osd-6016-ahd-2782.jpg',
    './images/p_19108_dahua-dh-ipc-hfw1120sp-w-3822.jpg',
    './images/p_20546_dahua-ipc-hdbw1120ep-w-3655.jpg',
    './images/p_19108_dahua-dh-ipc-hfw1120sp-w-5412.jpg',
    './images/34918_2904-3799.jpg',
    './images/p_16341_hikvision-ds-2ce56f7t-it3-2749.jpg',
    './images/p_16343_hikvision-ds-2ce16f7t-it5-3153.jpg',
    './images/large_camera-osamic-osc-211-ahd-3554.jpg',
    './images/large_camera-osamic-osc-121-ahd-7479.jpg',
    './images/large_camera-osamic-osc-502-ahd-4791.jpg',
    './images/12-4472.jpg',
    './images/large_camera-dahua-hac-hdw2120mp-3973.jpg',
    './images/thumb_14468254531615_hac-hfw1000rp-6341.jpg',
    './images/large_camera-dahua-hac-hdw2120mp-3002.jpg',
    './images/thumb_14468254531615_hac-hfw1000rp-5521.jpg',
    './images/large_camera-dahua-sd6c120s-hn-4709.jpg',
    './images/large_camera-dahua-sd59220i-hc-0749.jpg',
    './images/large_camera-dahua-hac-hfw2220dp-8622.jpg',
    './images/large_camera-dahua-hac-hdbw2120ep-2567.jpg',
    './images/large_camera-dahua-hac-hfw2120dp-8868.jpg',
    './images/large_camera-dahua-hac-hdw1100sp-1586.jpg',
    './images/350_hac_hdw1200e-1222.jpg',
    './images/pro.1513759303-4101.jpg',
    './images/large_camera-osamic-od-1500sp-6027.jpg',
    './images/large_camera-osamic-of-1500mp-4059.jpg',
    './images/large_camera-osamic-od-1500sp-5121.jpg',
    './images/large_camera-osamic-of-1500mp-5700.jpg',
    './images/large_camera-osamic-od-1500sp-7215.jpg',
    './images/large_camera-osamic-of-1500mp-2288.jpg',
    './images/large_camera-osamic-of-2400a-8056.jpg',
    './images/large_camera-osamic-osc-342-ahd-0399.jpg',
    './images/large_camera-osamic-osc-311-ahd-0009.jpg',
    './images/large_camera-osamic-osc-212-ahd-6372.jpg',
    './images/large_camera-osamic-osc-322-ahd-5864.jpg',
    './images/large_camera-osamic-osc-321-ahd-7972.jpg',
    './images/index-8516.jpg',
    './images/index-6669.jpg',
    './images/p_19096_dahua-ipc-c15p-9620.jpg',
    './images/p_19096_dahua-ipc-c15p-5800.jpg',
    './images/p_25382_dahua-dh-ipc-a12p-4323.jpg',
    './images/p_25382_dahua-dh-ipc-a12p-0472.jpg',
    './images/p_19078_dahua-dh-ipc-k15p-1543.jpg',
    './images/p_19078_dahua-dh-ipc-k15p-2734.jpg',
    './images/p_26332_dahua-dh-ipc-c26ep-1729.jpg',
    './images/p_19082_dahua-dh-ipc-a15p-4089.jpg',
    './images/p_19082_dahua-dh-ipc-a15p-3101.jpg',
    './images/p_20546_dahua-ipc-hdbw1120ep-w-9692.jpg',
    './images/p_23373_dahua-xvr5104c-4m-9538.jpg',
    './images/p_23373_dahua-xvr5104c-4m-4320.jpg',
    './images/p_19145_dahua-xvr4104hs-4258.jpg',
    './images/p_19145_dahua-xvr4104hs-8606.jpg',
    './images/p_19145_dahua-xvr4104hs-8064.jpg',
    './images/p_23374_dahua-xvr5104h-4m-4815.jpg',
    './images/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-8226.gif',
    './images/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-4050.gif',
    './images/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-7042.gif',
    './images/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-1613.gif',
    './images/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-8294.gif',
    './images/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-5105.gif',
    './images/ds-2ce56c0t-ir-vuhoang-2-1910.jpg',
    './images/glg14613779961-8934.jpg',
    './images/camera-hd-tvi-ban-cau-hong-ngoai-hikvision-ds-2ce56d0t-irp-3660.jpg',
    './images/glg14613779961-9450.jpg',
    './images/350_ds_2ce16c0t_it3-8529.jpg',
    './images/1392_camera_hikvision_ds_2ce16c0t_it5-2625.jpg',
    './images/p_17790_hikvision-ds-2ce16f1t-it-6811.jpg',
    './images/p_17791_hikvision-ds-2ce56f1t-itm-3911.png',
    './images/p_17793_hikvision-ds-2ce56f1t-it3-7288.jpg',
    './images/p_17796_hikvision-ds-2ce16f1t-it5-9926.JPG',
    './images/p_16338_hikvision-ds-2ce16f7t-it-0328.jpg',
    './images/p_16339_hikvision-ds-2ce56f7t-itm-6639.jpg',
    './images/p_22945_hikvision-ds-7104hqhi-k1-7642.jpg',
    './images/p_22945_hikvision-ds-7104hqhi-k1-1210.jpg',
    './images/p_22945_hikvision-ds-7104hqhi-k1-0893.jpg',
    './images/p_16348_hikvision-ds-7204hghi-f1-5921.jpg',
    './images/p_16348_hikvision-ds-7204hghi-f1-0984.jpg',
    './images/p_16348_hikvision-ds-7204hghi-f1-0226.jpg',
    './images/p_22945_hikvision-ds-7104hqhi-k1-2137.jpg',
    './images/p_22945_hikvision-ds-7104hqhi-k1-1454.jpg',
    './images/p_22945_hikvision-ds-7104hqhi-k1-5049.jpg',
    './images/p_16348_hikvision-ds-7204hghi-f1-0370.jpg',
    './images/p_16348_hikvision-ds-7204hghi-f1-1471.jpg',
    './images/1525708623_65_ff558cac59694012b238036569d2f9d8_large-7257.png',
    './images/1525708623_65_ff558cac59694012b238036569d2f9d8_large-3022.png',
    './images/camera-ezviz-cs-cv206-a0-1b2w2fr_s5836-2068.jpg',
    './images/p_23769_hikvision-ds-2cv2q21fd-iw-4246.jpg',
    './images/small_camera-ip_176-0855.jpg',
    './images/3876_camera-ip-wifi-ezviz-cs-cv246-c6c-720p-theo-doi-thong-minh-9498.jpg',
    './images/3876_camera-ip-wifi-ezviz-cs-cv246-c6c-720p-theo-doi-thong-minh-4128.jpg',
    './images/camera-ip-wifi-quay-quet-khong-day-vantech-vp-6300c-150x150-1981.jpg',
    './images/p_14793_hikvision-ds-2cd2410f-iw-7508.jpg',
    './images/3877_camera_ezviz_cs_cv248-5962.jpg',
    './images/p_27084_ezviz-cs-cv310-5503.jpg',
    './images/p_27084_ezviz-cs-cv310-8700.jpg',
  ]

  var dimensions = {
    'original' : '',
    'icon64' : [64, 64],
    'icon32' : [32, 32],
    'thumbnail256' : [256, 256],
    'large' : [900, 900],
  }

  var pathOut = './imagesOut/'
  var pathIn = './images/'

  for(var key in dimensions){
    let option = {
      fit: 'contain',
      position: sharp.strategy.entropy,
      background: { r: 255, g: 255, b: 255 }
    }
    if(key == 'original'){
      //console.log('key original')
    }else{
      option.width = dimensions[key][0]
      option.height = dimensions[key][0]
    }

    let inStream = fs.createReadStream(pathIn + imageName);
    fs.mkdirSync(pathOut + imageId + '/' + key +'/', { recursive: true });
    let outStream = fs.createWriteStream(pathOut + imageId + '/' + key +'/' + imageName, {flags: "w"});

    // on error of output file being saved
    outStream.on('error', function(e) {
        console.log("Error", e);
    });

    // input stream transformer
    // "info" event will be emitted on resize
    let transform = sharp().resize(option)
      .on('info', function(fileInfo) {
        console.log("Resizing done, file not saved");
      });

    inStream.pipe(transform).pipe(outStream);
  } // end for

}

function readAndWriteSql(){
  const testFolder = './file/camera/';
  var count = 0;
  var idProductBase = 9;
  var idImageBase = 9;

  fs.readdirSync(testFolder).forEach(file => {
    console.log(testFolder + file);

    var sqlProduct ="INSERT INTO `products` (`id`, `thumbnail`, `price`, `code`, `is_new`, `view_count`, `created_at`, `updated_at`) VALUES ('IN_ID', '', 'IN_PRICE', 'IN_CODE', '0', '0', '2019-06-13 06:39:18', '2019-06-13 06:39:18');";

    var sqlProductLanguage ="INSERT INTO `product_languages` (`menu_id`, `language_code`, `product_id`, `name`, `detail`, `slug`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES ('IN_MENU_ID', 'vi', 'IN_PRODUCT_ID', 'IN_NAME', 'IN_DETAIL', 'IN_SLUG', 'IN_META_TITLE', 'IN_META_DESC', '2019-06-13 06:39:18', '2019-06-13 06:39:18');";

    var sqlImageProduct = "INSERT INTO `image_products` (`id`, `path`, `name`, `product_id`, `type`, `default`, `order`, `created_at`, `updated_at`) VALUES ('IN_IMAGE_ID', 'IN_PATH_NAME_IMAGE', '', 'IN_PRODUCT_ID', '', '0', '0', '2019-05-15 08:56:06', '2019-05-15 08:56:07');";

    //if (count>0) return;

    count++;

    var data = fs.readFileSync(testFolder + file, 'utf8')

    if(!data) return;

    let contentSql = "";

    //data = data.slice(0,1);
    data = JSON.parse(data).products

    for(var item of data){
      //arrImage.push(item.image.split('/').slice(-1)[0])
      arrImage.push(item.image)

      let writeSqlProduct = sqlProduct.replace('IN_ID', idProductBase)
        .replace('IN_PRICE', item.price)
        .replace('IN_CODE', item.code);
console.log('mapMenu[file]',file , mapMenu[file])
      let writeSqlProductLanguage = sqlProductLanguage.replace('IN_MENU_ID', mapMenu[file])
        .replace('IN_PRODUCT_ID', idProductBase)
        .replace('IN_NAME', item.name)
        .replace('IN_DETAIL', item.detail)
        .replace('IN_SLUG', createSlug(item.name))
        .replace('IN_META_TITLE', item.name)
        .replace('IN_META_DESC', item.seo_desc)

      let writeSqlImageProduct = sqlImageProduct.replace('IN_PATH_NAME_IMAGE', item.image.split('/').slice(-1)[0])
        .replace('IN_IMAGE_ID', idImageBase)
        .replace('IN_PRODUCT_ID', idProductBase)

      contentSql = contentSql + writeSqlProduct + "\n" + writeSqlProductLanguage + "\n" + writeSqlImageProduct + "\n\n";
      idProductBase++
      idImageBase++
    } // end for

    //console.log('arrImage', arrImage)

    fs.appendFile('sql/camera/camera.sql', contentSql, 'utf8', function(err){
      if(err) throw err;
      else console.log('write sql ' + file + ' success!');
    });

  });

}

// (async () => {

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   for(var link of links){
//     console.log(link.url)

//     var jsonFile = {
//       products: []
//     };

//     await page.goto(link.url, {waitUntil: 'networkidle2'});

//     let hrefs  = await page.evaluate(() => {
//       let arrs = []
//       $('.wap_item .sp_img a').each((i,e)=>{
//         arrs.push($(e).attr('href'))
//       })
//       return arrs
//     })

//     for(var eUrl of hrefs){
//       console.log(baseUrl + eUrl);
//       await page.goto(baseUrl + eUrl, {waitUntil: 'networkidle2'});
//       let product  = await page.evaluate(() => {
//         return {
//             image: 'http://cameracongnghemoi.com/' + $('.wap_pro a figure img').eq(0).attr('src'),
//             name: $('.wap_pro .product_info .ten').text(),
//             code: $('.wap_pro .product_info li:nth-child(2)').text().substr(4),
//             price: $('.wap_pro .product_info .gia span').text().replace(/\./g, "").replace(' VND', '').replace('Liên hệ', '0'),
//             seo_desc: $('.wap_pro .product_info li').eq(-2).text().replace('...', ''),
//             detail: $('#content_tabs .tab').html(),
//           }
//       })
//       jsonFile.products.push(product)
//     }

//     let contentJson = JSON.stringify(jsonFile);
//     fs.writeFile('file/camera/'+ link.key +'.json', contentJson, 'utf8', function(err){
//         if(err) throw err;
//         else console.log('write all json success!');
//     });
//     console.log(jsonFile)
//   } //end for

//   await browser.close();
// })();