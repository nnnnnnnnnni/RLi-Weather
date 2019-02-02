//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../qqMap/qqmap-wx-jssdk.js');
var resloca = ''

Page({
  data: {
    location: '',
    updatetime: '',
    temp: '',
    length:'',
    weathertype: '',
    nengjiandu: '',
    bcgImgList: [{
        src: '../../imgs/qing.jpg',
        topColor: '#0085e5'
      },
      {
        src: '../../imgs/yu.jpg',
        topColor: '#0e202c'
      },
      {
        src: '../../imgs/xue.jpg',
        topColor: '#0f0e1c'
      },
      {
        src: '../../imgs/yun.jpg',
        topColor: '#004092'
      },
      {
        src: '../../imgs/wu.jpg',
        topColor: '#d3ebf5'
      },
      {
        src: '../../imgs/bg5.jpg',
        topColor: '#b8bab9'
      },
    ],
    foreList: [{
        time: '',
        type: '',
        max: '',
        min:'',
        wind_x: '',
        wind_l:''
      },
    ],
    tableList: {
      temp: '',
      bodytemp: '',
      humidity: '',
      rain: '',
      winds: '',
      windx: '',
      windl: '',
      nengjiandu: '',
      p: '',
      cloud: ''
    }
  },
  onLoad: function() {
    var that = this
    var i=0
    wx.getLocation({
      success: function(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        var qqmapsdk = new QQMapWX({
          key: '3ANBZ-WN2CK-DQGJH-A66QX-ATDE7-P6FLV' // 必填
        });
        qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function(res) {
              resloca = res.result.address_component.district
              that.setData({
                location: resloca
              })
            },
          }),
          wx.request({
            url: 'https://free-api.heweather.net/s6/weather/now',
            data: {
              location: longitude + ',' + latitude,
              key: '51a4964f1879433eb2c93b360a01860d'
            },
            success: function(res) {
              var data = res.data.HeWeather6[0]
              that.setData({
                updatetime: data.update.loc,
                temp: data.now.tmp,
                weathertype: data.now.cond_txt,
                nengjiandu: data.now.vis,
                'tableList.temp': data.now.tmp,
                'tableList.bodytemp': data.now.fl,
                'tableList.humidity': data.now.hum,
                'tableList.rain': data.now.pcpn,
                'tableList.winds': data.now.wind_spd,
                'tableList.windx': data.now.wind_dir,
                'tableList.windl': data.now.wind_sc,
                'tableList.nengjiandu': data.now.vis,
                'tableList.p': data.now.pres,
                'tableList.cloud': data.now.cloud
              })
            }
          }),
          wx.request({
            url: 'https://free-api.heweather.net/s6/weather/forecast',
            data: {
              location: longitude + ',' + latitude,
              key: '51a4964f1879433eb2c93b360a01860d'
            },
            success: function (res) {
              var data = res.data.HeWeather6[0].daily_forecast
              that.setData({
                'foreList[0].time': data[0].date,
                'foreList[0].type': data[0].cond_txt_d,
                'foreList[0].max': data[0].tmp_max,
                'foreList[0].min': data[0].tmp_min,
                'foreList[0].wind_x': data[0].wind_dir,
                'foreList[0].wind_l': data[0].wind_sc,
                'foreList[1].time': data[1].date,
                'foreList[1].type': data[1].cond_txt_d,
                'foreList[1].max': data[1].tmp_max,
                'foreList[1].min': data[1].tmp_min,
                'foreList[1].wind_x': data[1].wind_dir,
                'foreList[1].wind_l': data[1].wind_sc,
                'foreList[2].time': data[2].date,
                'foreList[2].type': data[2].cond_txt_d,
                'foreList[2].max': data[2].tmp_max,
                'foreList[2].min': data[2].tmp_min,
                'foreList[2].wind_x': data[2].wind_dir,
                'foreList[2].wind_l': data[2].wind_sc,
                length:data.length
              })
            }
          })
      },
    })
  }
})