var homeData = require('./home.json');
var test1 = require('./recommend1.json')
var test2 = require('./recommend2.json')
var test3 = require('./recommend3.json')

var mockdata = {
    "/book/index":homeData,
    "/book/list?pagenum=1&limit=10":test1,
    "/book/list?pagenum=2&limit=10":test2,
    "/book/list?pagenum=3&limit=10":test3,
}
module.exports = function(url){
    return mockdata[url];
}