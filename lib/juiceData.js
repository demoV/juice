var fs = require('fs');
var juiceOrders;

juiceOrders =  fs.readFileSync('./juice_orders', 'utf8', function (err,data) {
  return data;
});

juiceOrders = JSON.parse(juiceOrders);
exports.juiceData = juiceOrders;
