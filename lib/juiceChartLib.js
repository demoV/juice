var juiceData = require('./juiceData.js').juiceData;

exports.getWithoutSugarDrinks = function(){
	var withoutSugarDrinks = juiceData.filter(function(perOrder){
		return perOrder.isSugarless;
	});
	return withoutSugarDrinks;
};
exports.getDrinksWithSugar = function(){
	return juiceData.filter(function(perOrder){
		return !perOrder.isSugarless;
	});
};