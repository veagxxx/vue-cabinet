//百度地图获取城市名称的方法
let getCurrentCityName = function () {
  return new Promise(function (resolve, reject) {
      let myCity = new BMap.LocalCity()
      myCity.get(function (result) {
          resolve(result.name)
      })
  })
}
export default getCurrentCityName; 