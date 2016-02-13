var onload = function() {
	getAllData();
};

var drinkData;

var getAllData = function(){
	d3.json("../juice_orders", function(error, json) {
	  if (error) throw error;
	  drinkData = json;
	});
}
var renderGraph = function(drinks){
	console.log(drinks.length)
	 d3.select('.graph').remove();

	var yScale = d3.scale.linear()
				.domain([0,500])
				.range([500,100]);

	var xAxis = d3.svg.axis()
                .scale(yScale)
                .orient("bottom");

	var svg = d3.select('body')
		.append('svg')
		.attr('class','graph')
		.attr('width', 1200)
		.attr('height', 700);

	svg.selectAll('g')
		.data(drinks)	
		.enter()
		.append('line')
		.attr('x1',function(d,i){return (i+1)*30})
		.attr('x2',function(d,i){return (i+1)*30})
		.attr('y1',500)
		.attr('y2',function(d){return yScale(d.value)})
		.attr('stroke','black');
		
		d3.selectAll('svg').selectAll('text')
					.data(drinks)
					.enter()
					.append('text')
					.text(function(d,i){
						return d.key
					})
					.attr('x',function(d,i){return (i+1)*30})
					.attr('y',510)
					.attr('stroke','black')
					.attr('transform', function(d,i){ return 'rotate(90,'+ (i+1)*30 +',510)';});
		d3.selectAll('svg').selectAll('t')
					.data(drinks)
					.enter()
					.append('text')
					.text(function(d,i){
						return d.value
					})
					.attr('x',function(d,i){return  (i+1)*30})
					.attr('y',function(d,i){return yScale(d.value)})
					.attr('stroke','green')
					// .attr('transform', function(d,i){ return 'rotate(90,'+ (i+1)*30 +',510)';});

}

var countDrinks = function(drinks){
	return drinks.reduce(function(initial, perOrder){
		if(!initial[perOrder.drinkName])
			initial[perOrder.drinkName] = 0;
		initial[perOrder.drinkName] += 1;
		return initial;
	},{});
}
var getWithoutSugarDrinks = function(data){
	var drinks = withoutSugarDrinks(data);
	var drinksCount = countDrinks(drinks);
	var keys = Object.keys(drinksCount);
	return keys.reduce(function(initial, key){
		var drink = {key: key, value: drinksCount[key]};
		initial.push(drink);
		return initial;
	},[]);
};

var getSugarDrinks = function(data){
	var drinks = DrinksWithSugar(data);
	var drinksCount = countDrinks(drinks);
	var keys = Object.keys(drinksCount);
	return keys.reduce(function(initial, key){
		var drink = {key: key, value: drinksCount[key]};
		initial.push(drink);
		return initial;
	},[]);
};

var DrinksWithSugar = function(){
	return drinkData.filter(function(perOrder){
		return !perOrder.isSugarless;
	});
};
var withoutSugarDrinks = function(juiceData){
	return juiceData.filter(function(perOrder){
		return perOrder.isSugarless;
	});
};
var showGraphWithoutSugar = function(){
		renderGraph(getWithoutSugarDrinks(drinkData));
};
var showGraphWithSugar = function(){
	renderGraph(getSugarDrinks(drinkData));	
}

$(document).ready(onload);