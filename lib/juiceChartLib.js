var juiceData = require('./juiceData.js').juiceData;

var withoutSugarDrinks = function(){
	var withoutSugarDrinks = juiceData.filter(function(perOrder){
		return perOrder.isSugarless;
	});
	return withoutSugarDrinks;
};

var DrinksWithSugar = function(){
	return juiceData.filter(function(perOrder){
		return !perOrder.isSugarless;
	});
};

var countDrinks = function(drinks){
	return drinks.reduce(function(initial, perOrder){
		if(!initial[perOrder.drinkName])
			initial[perOrder.drinkName] = 0;
		initial[perOrder.drinkName] += 1;
		return initial;
	},{});
}
exports.getWithoutSugarDrinks = function(){
	var drinks = withoutSugarDrinks();
	var drinksCount = countDrinks(drinks);
	var keys = Object.keys(drinksCount);
	return keys.reduce(function(initial, key){
		var drink = {name: key, count: drinksCount[key]};
		initial.push(drink);
		return initial;
	},[]);
};