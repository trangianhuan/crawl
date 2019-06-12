'use strict'

const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

var images = [
  'http://cameracongnghemoi.com/upload/sanpham/large_dau-ghi-hinh-osamic-osd-8420sh-5463.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_dau-ghi-hinh-osamic-osd-8420sh-3135.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_dau-ghi-hinh-osamic-osd-8420sh-5547.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_dau-ghi-hinh-osamic-osd-8420sh-4440.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_dau-ghi-hinh-osd-604-ahd-5825.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_dau-ghi-hinh-osd-608-ahd-9832.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_dau-ghi-hinh-osd-6016-ahd-2782.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19108_dahua-dh-ipc-hfw1120sp-w-3822.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_20546_dahua-ipc-hdbw1120ep-w-3655.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19108_dahua-dh-ipc-hfw1120sp-w-5412.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/34918_2904-3799.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_16341_hikvision-ds-2ce56f7t-it3-2749.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_16343_hikvision-ds-2ce16f7t-it5-3153.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-osc-211-ahd-3554.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-osc-121-ahd-7479.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-osc-502-ahd-4791.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/12-4472.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-dahua-hac-hdw2120mp-3973.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/thumb_14468254531615_hac-hfw1000rp-6341.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-dahua-hac-hdw2120mp-3002.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/thumb_14468254531615_hac-hfw1000rp-5521.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-dahua-sd6c120s-hn-4709.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-dahua-sd59220i-hc-0749.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-dahua-hac-hfw2220dp-8622.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-dahua-hac-hdbw2120ep-2567.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-dahua-hac-hfw2120dp-8868.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-dahua-hac-hdw1100sp-1586.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/350_hac_hdw1200e-1222.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/pro.1513759303-4101.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-od-1500sp-6027.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-of-1500mp-4059.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-od-1500sp-5121.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-of-1500mp-5700.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-od-1500sp-7215.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-of-1500mp-2288.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-of-2400a-8056.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-osc-342-ahd-0399.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-osc-311-ahd-0009.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-osc-212-ahd-6372.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-osc-322-ahd-5864.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/large_camera-osamic-osc-321-ahd-7972.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/index-8516.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/index-6669.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19096_dahua-ipc-c15p-9620.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19096_dahua-ipc-c15p-5800.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_25382_dahua-dh-ipc-a12p-4323.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_25382_dahua-dh-ipc-a12p-0472.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19078_dahua-dh-ipc-k15p-1543.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19078_dahua-dh-ipc-k15p-2734.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_26332_dahua-dh-ipc-c26ep-1729.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19082_dahua-dh-ipc-a15p-4089.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19082_dahua-dh-ipc-a15p-3101.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_20546_dahua-ipc-hdbw1120ep-w-9692.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_23373_dahua-xvr5104c-4m-9538.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_23373_dahua-xvr5104c-4m-4320.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19145_dahua-xvr4104hs-4258.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19145_dahua-xvr4104hs-8606.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_19145_dahua-xvr4104hs-8064.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_23374_dahua-xvr5104h-4m-4815.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-8226.gif',
  'http://cameracongnghemoi.com/upload/sanpham/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-4050.gif',
  'http://cameracongnghemoi.com/upload/sanpham/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-7042.gif',
  'http://cameracongnghemoi.com/upload/sanpham/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-1613.gif',
  'http://cameracongnghemoi.com/upload/sanpham/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-8294.gif',
  'http://cameracongnghemoi.com/upload/sanpham/dau-ghi-hinh-camera-hd-cvi-4-kenh-dahua-xvr5104hs-s3-5105.gif',
  'http://cameracongnghemoi.com/upload/sanpham/ds-2ce56c0t-ir-vuhoang-2-1910.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/glg14613779961-8934.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/camera-hd-tvi-ban-cau-hong-ngoai-hikvision-ds-2ce56d0t-irp-3660.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/glg14613779961-9450.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/350_ds_2ce16c0t_it3-8529.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/1392_camera_hikvision_ds_2ce16c0t_it5-2625.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_17790_hikvision-ds-2ce16f1t-it-6811.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_17791_hikvision-ds-2ce56f1t-itm-3911.png',
  'http://cameracongnghemoi.com/upload/sanpham/p_17793_hikvision-ds-2ce56f1t-it3-7288.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_17796_hikvision-ds-2ce16f1t-it5-9926.JPG',
  'http://cameracongnghemoi.com/upload/sanpham/p_16338_hikvision-ds-2ce16f7t-it-0328.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_16339_hikvision-ds-2ce56f7t-itm-6639.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_22945_hikvision-ds-7104hqhi-k1-7642.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_22945_hikvision-ds-7104hqhi-k1-1210.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_22945_hikvision-ds-7104hqhi-k1-0893.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_16348_hikvision-ds-7204hghi-f1-5921.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_16348_hikvision-ds-7204hghi-f1-0984.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_16348_hikvision-ds-7204hghi-f1-0226.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_22945_hikvision-ds-7104hqhi-k1-2137.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_22945_hikvision-ds-7104hqhi-k1-1454.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_22945_hikvision-ds-7104hqhi-k1-5049.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_16348_hikvision-ds-7204hghi-f1-0370.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_16348_hikvision-ds-7204hghi-f1-1471.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/1525708623_65_ff558cac59694012b238036569d2f9d8_large-7257.png',
  'http://cameracongnghemoi.com/upload/sanpham/1525708623_65_ff558cac59694012b238036569d2f9d8_large-3022.png',
  'http://cameracongnghemoi.com/upload/sanpham/camera-ezviz-cs-cv206-a0-1b2w2fr_s5836-2068.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_23769_hikvision-ds-2cv2q21fd-iw-4246.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/small_camera-ip_176-0855.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/3876_camera-ip-wifi-ezviz-cs-cv246-c6c-720p-theo-doi-thong-minh-9498.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/3876_camera-ip-wifi-ezviz-cs-cv246-c6c-720p-theo-doi-thong-minh-4128.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/camera-ip-wifi-quay-quet-khong-day-vantech-vp-6300c-150x150-1981.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_14793_hikvision-ds-2cd2410f-iw-7508.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/3877_camera_ezviz_cs_cv248-5962.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_27084_ezviz-cs-cv310-5503.jpg',
  'http://cameracongnghemoi.com/upload/sanpham/p_27084_ezviz-cs-cv310-8700.jpg',
]

async function downloadImage (url) {
  const path = Path.resolve(__dirname, 'images', url.split('/').slice(-1)[0])
  console.log(path)
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

for (var i = 0; i < images.length; i++) {
  downloadImage(images[i])
}

