// var onload = function() {
// 	setClickEvent();
// };


var renderGraph = function(dataToRender){
	d3.select('.graph').remove();

	var yScale = d3.scale.linear()
				.domain([0,300])
				.range([500,100]);

	var xAxis = d3.svg.axis()
                .scale(yScale)
                .orient("bottom");

	var svg = d3.select('body')
		.append('svg')
		.attr("class", "axis")
    	.attr("transform", "translate(0,500)")
		.call(xAxis)
		.attr('class','graph')
		.attr('width', 1000)
		.attr('height', 600);

	svg.selectAll('g')
		.data(dataToRender)	
		.enter()
		.append('line')
		.attr('x1',function(d,i){return (i+1)*50})
		.attr('x2',function(d,i){return (i+1)*50})
		.attr('y1',500)
		.attr('y2',function(d){return yScale(d.count)})
		.attr('stroke','black')

}


var getJuiceDataWithoutSugar = function(){
	$.get('/withoutSugar', function(withoutSugarData){
		renderGraph(withoutSugarData);
	});
};


// $(document).ready(onload);