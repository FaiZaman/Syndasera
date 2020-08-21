var loadData = function(){
                $.ajax({
                  type: 'GET',
                  contentType: 'application/json; charset=utf-8',
                  url: '/get_data_500',
                  dataType: 'json',
                  success: function(data){
                    visualisation(data);
                  },
                  failure: function(result){
                    error();
                  }
                });
              };
function error() {
    console.log("Something went wrong!");
}

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

function visualisation(data) {
  console.log(data);

	//--week counts table--//

	var dates = [];
	for (var i = 0; i < data.length; i++){
		dates.push(data[i].visit_date);
	}

	var groupByWeek = {};
	dates.forEach(function (d, i) {
		var v = data[i];
		var weekYear = d.slice(0, 4) + '-' + new Date(d).getWeekNumber();
		if (groupByWeek.hasOwnProperty(weekYear)) {
			groupByWeek[weekYear].push(v);
		} else {
			groupByWeek[weekYear] = [v];
		}
  });
  
	// [{week:“week 1”, variable:“variable 1", count:“count 1”},
	//{week:“week 1", variable:“variable 2”, count:“count 2"},
	//{week:“week 1”, variable:“variable x”, count:“count x”}…,
	//{week:“week 2", variable:“variable 1”, count:“count 1"}…,
	//{week:“week y”, variable:“variable x”, count:“count x”}]
	var columns = Object.keys(data[0])
	columns.splice(columns.indexOf('id'), 1);
	columns.splice(columns.indexOf('created_at'), 1);
	columns.splice(columns.indexOf('updated_at'), 1);

	var weeks = Object.keys(groupByWeek);
	var weekCountArray = [];

	function createWeekCountArray(column){
		for (var i = 0; i < weeks.length; i++){

			var weekNumber = i + 1;
			console.log(weekNumber);
			var weeksObservations = groupByWeek[weeks[i]];

			weeksObservations.forEach((observation) => {

				var value = observation[column];
				console.log(value);
				if ((weekCountArray.some(el => el.variable === value)) && (weekCountArray.some(el => el.week != weekNumber))){
					var result = weekCountArray.find(x => x.variable === value)
					const index = weekCountArray.map(e => e.variable).indexOf(value);
					weekCountArray[index]['count']++;
				}
				else {
					console.log(weekNumber);
					const obj = {
						'week': weekNumber,
						'variable': value,
						'count': 1
					};
					weekCountArray.push(obj);
				}
			});
		}
		console.log(weekCountArray);
		// check for missing weeks afterwards
	}

	var column = "subjective_fever"
	createWeekCountArray(column);

  //columns.forEach((element) => {
  //  for (var i = 0; i < data.length; i++){
  //  }
  //  console.log(element);
  //});


//--count table collapsed by week--//

  //var weekcounter=[]
  //function (x){ //x is the "column name"
  // for (var i = 0; i < groupByWeek.length; i++){ //where i is the week YYYY-W, how can we make sure it reads that? and then goes into that array?
  //for (var k = 0; k < groupByWeek[i].length; k++){ //where k is the array within the week?
//   if (weekcounter.some(el => el.category === groupByWeek[k].x)){
//       for (var j = 0; j < weekcounter.length; j++) {
//         if(weekcounter[j].category === groupByWeek[k].x){
//           weekcounter[j].count +=1
// }}
// } else { const category = {
//       category: groupByWeek[k].x,
//       count: 1,
//       week:indexOf.category[i] //don't know how to get the week.
//     }
//     weekcounter.push(category);
// }}
// }
////after this will need to 1) fill in with 0 where there was no entry for that variable for that week. 2) create weeks where there were no visits at all.



//--counts tables--//

//   function getItems(input) {
//   var arr = input, obj = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (!obj[arr[i].asexual_plasmodium_parasite_present]) {
//       obj[arr[i].asexual_plasmodium_parasite_present] = 1;
//     } else if (obj[arr[i].asexual_plasmodium_parasite_present]) {
//       obj[arr[i].asexual_plasmodium_parasite_present] += 1;
//     }
//   }
//   return obj;
// }
// console.log(getItems(data));
//
// //var plasmodium_present = {};
// var plasmodium_present = [];
// for (var i = 0; i < data.length; i++) {
//     if (data[i].asexual_plasmodium_parasite_present in plasmodium_present) {
//          plasmodium_present[data[i].asexual_plasmodium_parasite_present] += 1;
//     } else {
//          plasmodium_present[data[i].asexual_plasmodium_parasite_present] = 1;
//     }
// }
//
// console.log(plasmodium_present)

var plasmodium_present1 = [];
for (var i = 0; i < data.length; i++) {
  if (plasmodium_present1.some(el => el.category === data[i].asexual_plasmodium_parasite_present)){
      for (var j = 0; j < plasmodium_present1.length; j++) {
        if(plasmodium_present1[j].category === data[i].asexual_plasmodium_parasite_present){
          plasmodium_present1[j].count +=1
}}
} else { const category = {
			category: data[i].asexual_plasmodium_parasite_present,
			count: 1
		}
		plasmodium_present1.push(category);
}}

//console.log(plasmodium_present1)

var countnonull = plasmodium_present1.filter(function(obj) {
	return obj.category != null;
});
//console.log(countnonull);

// var plasmodium_present2 = [];
// for (var i = 0; i < data.length; i++) {
//    const found = plasmodium_present2.some(el => el.category === data[i].asexual_plasmodium_parasite_present)
//
//    if (!found) {plasmodium_present2.count +=1}
// //   if (!found){console.log(found)}
// //   if (!found){console.log(data[i].asexual_plasmodium_parasite_present)}
// //     if (!found){console.log("found it")}
//      //(!found){plasmodium_present2.push({ count: plasmodium_present2.count ++, category: data[i].asexual_plasmodium_parasite_present })}
// //  plasmodium_present1.push({ count: plasmodium_present1.count ++, category: data[i].asexual_plasmodium_parasite_present });
// else { const category = {
// 			'category': data[i].asexual_plasmodium_parasite_present,
// 			'count': 1
// 		}
// 		plasmodium_present2.push(category);
// }}

//console.log(plasmodium_present2)

// var newbie=[];
// for (var i = 0; i < plasmodium_present.length; i++) {
//   var object = { count: plasmodium_present[i]};
//   newbie.push(object);
// }
//
// console.log(newbie)

//--why doesn't this work?
// function getItems1(input) {
// var vari = input, obj = [];
// for (var i = 0; i < data.length; i++) {
//   if (!obj[data[i].vari]) {
//     obj[data[i].vari] = 1;
//   } else if (obj[data[i].vari]) {
//     obj[data[i].vari] += 1;
//   }
// }
// return obj;
// }

d3.select("#content")
    .append("div")
      .attr("id","my_first_histogram")

d3.select("#content")
      .append("div")
        .attr("id","my_first_cathistogram")

/////////-------HISTOGRAM-------/////////

//removes Nulls to draw histogram that would otherwise replace null with 0.
var withoutNulls = data.filter(function(obj) {
	return obj.haemoglobin != null;
});
//console.log(withoutNulls);

//console.log(Object.keys(data.haemoglobin))

// set the dimensions and margins of the graph
    var margin = {top: 20, right: 30, bottom: 40, left: 40},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("#my_first_histogram")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// X axis: scale and draw:
    var x = d3.scaleLinear()
//        .domain([0, 20])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .domain([d3.min(withoutNulls, function(d) { return +d.haemoglobin}) -1, d3.max(data, function(d) { return +d.haemoglobin})+1])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
// Add X axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("x", width)
.attr("y", height + margin.top + 10)
.text("Haemoglobin (mg/mL)")
.style("font-size", "10px");

    var histogram = d3.histogram()
        .value(function(withoutNulls) { return withoutNulls.haemoglobin; })
        .domain(x.domain())  // then the domain of the graphic
    //    .thresholds(x.ticks(40)); // then the numbers of bins
        .thresholds(x.ticks([((d3.max(withoutNulls, function(d) { return +d.haemoglobin}))-(d3.min(withoutNulls, function(d) { return +d.haemoglobin})))*2])); // then the numbers of bins

                // And apply this function to data to get the bins
    var bins = histogram(withoutNulls);

                  // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(withoutNulls) { return withoutNulls.length; })]);   // d3.hist has to be called before the Y axis obviously
//          y.domain([0, 50])
    svg.append("g")
        .call(d3.axisLeft(y));
//
// Y axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", -margin.left + 10)
.attr("x", -margin.top)
.text("count")
.style("font-size", "10px");

                  // append the bar rectangles to the svg element
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#0275D8")


/////////-------COUNT BAR CHART "CATEGORICAL HISTOGRAM"-------/////////


var svg1 = d3.select("#my_first_cathistogram")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

//X axis
var x1 = d3.scaleBand()
          .range([ 0, width ])
          .domain(countnonull.map(function(d) { return d.category; }))
          .padding(0.2);
svg1.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
// Add X axis label:
svg1.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 5)
      .text("variables")
      .style("font-size", "10px");

//Y axis
var y1 = d3.scaleLinear()
  .domain([0, d3.max(countnonull, function(d) { return +d.count})+d3.max(countnonull, function(d) { return +d.count})*0.1])
  .range([ height, 0]);
svg1.append("g")
  .call(d3.axisLeft(y1));
// Y axis label:
svg1.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 10)
  .attr("x", -margin.top)
  .text("count")
  .style("font-size", "10px");

svg1.selectAll("mybar")
  .data(countnonull)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x1(d.category); })
    .attr("y", function(d) { return y1(d.count); })
    .attr("width", x1.bandwidth())
    .attr("height", function(d) { return height - y1(d.count); })
    .attr("fill", "#0275D8")
//    .attr("opacity", 0.6)
//    .attr("stroke", "black");


    svg1.append("text").attr("x", 100).attr("y", 0).text("Plasmodium Present").style("font-size", "15px").attr("alignment-baseline","middle")

    }

d3.select("body").transition().style("background-color", "#f6abb650")

d3.select("#content").append("div").attr("class", "container")
.append("p").text("Hello, welcome to the d3 playground. Everything should be possible in here <3.\
                    For the time being please use dummy data defined as an object in this file. \
                    Once we get the rails model with the data in it I might become a .js.erb so you\
                    can query the model from here :D.")

$(document).ready(function(){ 
loadData()
 });


//for bar charts etc to remove null values, replace .data(data) with:
// .data(data, function(inptArray) {
//   return inptArray.filter(function(obj) {
//    return obj.y != null;
//   })
// });
