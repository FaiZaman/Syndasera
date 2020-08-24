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

	//--adding week column and grouping by week--//

	var dates = [];
	for (var i = 0; i < data.length; i++){
		dates.push(data[i].visit_date);
	}

	var groupByWeek = [];
	dates.forEach(function (d, i) {
		var v = data[i];
		var weekYear = d.slice(0, 4) + '-' + new Date(d).getWeekNumber();
		if (groupByWeek.hasOwnProperty(weekYear)) {
			groupByWeek[weekYear].push(v);
		} else {
			groupByWeek[weekYear] = [v];
		}
  });

console.log("These are the visits clustered by week")
console.log(groupByWeek)

  // 	// the format we want
	// // [{week:“week 1”, variable:“variable 1", count:“count 1”},
	// //{week:“week 1", variable:“variable 2”, count:“count 2"},
	// //{week:“week 1”, variable:“variable x”, count:“count x”}…,
	// //{week:“week 2", variable:“variable 1”, count:“count 1"}…,
	// //{week:“week y”, variable:“variable x”, count:“count x”}]
	// var columns = Object.keys(data[0])
  //
	// // groupByWeek current format is [2011-39: {{}, {}, ...}, 2011-40: ...]
	// // where {} is an observation and 2011-39 is the 39th week of 2011 (52 in total per year)
  //
	// // getting rid of unnecessary columns
	// columns.splice(columns.indexOf('id'), 1);
	// columns.splice(columns.indexOf('created_at'), 1);
	// columns.splice(columns.indexOf('updated_at'), 1);
  //
	// var weeks = Object.keys(groupByWeek);
  //
	// // creates the data structure we want for a specific column
	// function createWeekCountArray(column){
  //
	// 	var weekCountArray = [];
  //
	// 	// looping by weeks
	// 	for (var i = 0; i < weeks.length; i++){
  //
	// 		var weekNumber = i + 1;
	// 		var weeksObservations = groupByWeek[weeks[i]];
  //
	// 		// looking at each observation in each week
	// 		weeksObservations.forEach((observation) => {
  //
	// 			var value = observation[column];	// column value for current observation
  //
	// 			// check if the value is already in the array in the current week
	// 			if ((weekCountArray.some(el => el.variable === value && el.week === weekNumber))){
	// 				// increase the count by 1 for this week-value if so
	// 				const index = weekCountArray.map(e => e.variable).indexOf(value);
	// 				weekCountArray[index]['count']++;
	// 			}
	// 			else {
	// 				// create an entry for this week-value with default count 1 as first appearance
	// 				const obj = {
	// 					'week': weekNumber,
	// 					'variable': value,
	// 					'count': 1
	// 				};
	// 				weekCountArray.push(obj);
	// 			}
	// 		});
	// 	}
	// 	console.log(weekCountArray);
	// 	// check for missing weeks afterwards
	// }
  //
	// var column = "subjective_fever"
	// createWeekCountArray(column);
  //
  // //columns.forEach((element) => {
  // //  for (var i = 0; i < data.length; i++){
  // //  }
  // //  console.log(element);
  // //});

//-- END Faiz week collapse week--//

//--other counts tables--//

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

//--END other counts tables--//

//--START specific column count array--//

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

console.log(plasmodium_present1)

//--END specific column count array--//

//--remove null entries in count table--//

var countnonull = plasmodium_present1.filter(function(obj) {
	return obj.category != null;
});
console.log(countnonull);

//--END remove null entries in count table--//

//-- START specific column count table function--//

var plasmodium_present_count = [];
function getcountarray(dataset, column){
  for (var i = 0; i < dataset.length; i++) {
    if (plasmodium_present_count.some(el => el.category === dataset[i][column])){
      for (var j = 0; j < plasmodium_present_count.length; j++) {
        if(plasmodium_present_count[j].category === dataset[i][column]){
          plasmodium_present_count[j].count +=1
        }
      }
    } else {
      var category = {
  			category: dataset[i][column],
  			count: 1
  		}
  		plasmodium_present_count.push(category);
    }
  }
}
getcountarray(data, "plasmodium_gametocytes_present", plasmodium_present_count)
//getcountarray(data, "asexual_plasmodium_parasite_present", plasmodium_present_count)
console.log(plasmodium_present_count)
//-- END specific column count table--//

//-- START Function for giant count table function--//

var allcount = [];
function getcountarray3(dataset, column){
  for (var i = 0; i < dataset.length; i++) {
    if (allcount.some(el => el.variable === dataset[i][column])){
      for (var j = 0; j < allcount.length; j++) {
        if(allcount[j].variable === dataset[i][column]){
          allcount[j].count +=1
        }
      }
    } else {
      var add = {
  			variable: dataset[i][column],
        colname: column,
  			count: 1
  		}
  		allcount.push(add);
    }
  }
}

var all_cols1 = Object.keys(data[0])
  all_cols1.forEach((column) => {
    getcountarray3(data, column)
  })
console.log("These are the total counts")
console.log(allcount)
console.log(allcount.filter(e=>e.colname=="visit_type"))

//-- END Function for giant count tables--//

//-- Giant week count table--//

// function getcountarray2(dataset, column, arrayname, dates){
//   for (var i = 0; i < dataset.length; i++) {
//     if (arrayname.some(el => el.category === dataset[i][column])){
//       for (var j = 0; j < arrayname.length; j++) {
//         if(arrayname[j].category === dataset[i][column] & arrayname[j].dates === dataset[i][dates]){
//           arrayname[j].count +=1
//         }
//       }
//     } else {
//       const add = {
//         dates: dates,
//         colName: column,
//   			category: dataset[i][column],
//   			count: 1
//   		}
//   		arrayname.push(add);
//     }
//   }
// }
//
// var allweekcounts=[]
// var all_cols = Object.keys(data[0])
// Object.keys(groupByWeek).forEach(function(dates){
//   all_cols.forEach((column) => {
//     getcountarray2(groupByWeek[dates], column, allweekcounts, dates)
//   })
// })
// console.log("These are the counts per week")
// console.log(allweekcounts)
// console.log(allweekcounts.filter(e=>e.colName=="visit_type"))
// console.log(Object.keys(groupByWeek))

//-- END Giant week count table--//

var allweekcounts=[]
function getcountarray2(dataset, column, dates){
  for (var i = 0; i < dataset.length; i++) {
    if (allweekcounts.some(el => el.category === dataset[i][column])){
      for (var j = 0; j < allweekcounts.length; j++) {
        if(allweekcounts[j].category === dataset[i][column] & allweekcounts[j].date === dataset[i][dates]){
          allweekcounts[j].count +=1
        }
      }
    } else {
      const add = {
        date: dates,
        colName: column,
  			category: dataset[i][column],
  			count: 1
  		}
  		allweekcounts.push(add);
    }
  }
}

var all_cols = Object.keys(data[0])
var all_weeks = Object.keys(groupByWeek)
all_weeks.forEach((dates)=> {
  all_cols.forEach((column) => {
    getcountarray2(groupByWeek[dates], column, dates)
  })
})
console.log("These are the counts per week")
console.log(allweekcounts)
console.log(allweekcounts.filter(e=>e.colName=="visit_type"))
console.log(Object.keys(groupByWeek))
console.log(groupByWeek["2011-31"])

//--old bits of code--//

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

//--END old bits of code--//

d3.select("#content")
    .append("div")
      .attr("id","my_first_histogram")

d3.select("#content")
    .append("div")
      .attr("id","my_second_histogram")

d3.select("#content")
      .append("div")
        .attr("id","my_first_cathistogram")

d3.select("#content")
      .append("div")
        .attr("id","autocorrelation")

d3.select("#content")
      .append("div")
        .attr("id","autocorrelation2")

/////////-------HISTOGRAM-------/////////

//removes Nulls to draw histogram that would otherwise replace null with 0.

//why doesn't this work????
// function removenulls(column, arrayNa){
//   arrayNa = data.filter(function(obj) {
// 	   return obj[column] != null;
//   })
// }
// var withoutNulls=[]
// removenulls("haemoglobin",withoutNulls)

var withoutNulls=[]
function removenulls(column){
  withoutNulls = data.filter(function(obj) {
	   return obj[column] != null;
  })
}

removenulls("haemoglobin")
console.log("I've removed the nulls from haemoglobin")
console.log(withoutNulls);

//console.log(Object.keys(data.haemoglobin))


var margin = {top: 20, right: 30, bottom: 40, left: 40}
var width = 460 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom;

function drawHistogram (dom, array, column){

    var svg = d3.select(dom)
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// X axis
    var x = d3.scaleLinear()
        .domain([d3.min(array, function(d) { return +d[column]}) -1, d3.max(array, function(d) { return +d[column]})+1])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 10)
        .text(column)
        .style("font-size", "10px");

    var histogram = d3.histogram()
        .value(function(array) { return array[column]; })
        .domain(x.domain())
        .thresholds(x.ticks([((d3.max(array, function(d) { return +d[column]}))-(d3.min(array, function(d) { return +d[column]})))*2]));

    var bins = histogram(array);

// Y axis
    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(array) { return array.length; })]);
    svg.append("g")
        .call(d3.axisLeft(y));
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 10)
        .attr("x", -margin.top)
        .text("count")
        .style("font-size", "10px");

//bars
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#0275D8")

//legends
svg.append("text").attr("x", 200).attr("y", 0).text(column).style("font-size", "15px").attr("alignment-baseline","middle")
}

drawHistogram ("#my_first_histogram", withoutNulls, "haemoglobin")
drawHistogram ("#my_second_histogram", data, "Temperature (C) [EUPATH_0000110]")

/////////-------COUNT BAR CHART "CATEGORICAL HISTOGRAM"-------/////////

function drawCatHistogram (dom, array, columnx, columny){

var svg = d3.select(dom)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

//X axis
var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(array.map(function(d) { return d[columnx]; }))
      .padding(0.2);
svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 5)
      .text("variables")
      .style("font-size", "10px");

//Y axis
var y = d3.scaleLinear()
      .domain([0, d3.max(array, function(d) { return +d[columny]})+d3.max(array, function(d) { return +d[columny]})*0.1])
      .range([ height, 0]);
svg.append("g")
      .call(d3.axisLeft(y));
svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", -margin.top)
      .text("count")
      .style("font-size", "10px");

//bars
svg.selectAll("mybar")
    .data(array)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d[columnx]); })
      .attr("y", function(d) { return y(d[columny]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[columny]); })
      .attr("fill", "#0275D8")
//    .attr("opacity", 0.6)
//    .attr("stroke", "black");

//labels
svg.append("text").attr("x", 100).attr("y", 0).text("Plasmodium Present").style("font-size", "15px").attr("alignment-baseline","middle")

}

//drawCatHistogram ("#my_first_cathistogram", countnonull, "category", "count")
drawCatHistogram ("#my_first_cathistogram", allcount.filter(e=>e.colname=="asexual_plasmodium_parasite_present"), "variable", "count")
console.log(allcount.filter(e=>e.colname=="asexual_plasmodium_parasite_present"))

//--Autocorrelation plot--//

var numbers = [];
for (var i = 0; i <= 40; i++) {
    numbers.push(i);
}
var auto_visits = [ 1.0        ,  0.83194072,  0.60752648,  0.40733211,  0.2393539 ,
        0.06308392, -0.03042551, -0.00156437,  0.11492175,  0.23156727,
        0.40431004,  0.587576  ,  0.74329417,  0.73899856,  0.60086223,
        0.42929339,  0.26445132,  0.08971791, -0.04624491, -0.10146541,
       -0.05592395,  0.02258253,  0.14953432,  0.32115828,  0.49650044,
        0.57808745,  0.56546254,  0.45923887,  0.31581384,  0.15070561,
       -0.00991299, -0.11399981, -0.14651289, -0.12881442, -0.04292734,
        0.0860217 ,  0.25763288,  0.37661576,  0.4222832 ,  0.39984781,
        0.30730804]
var auto_malaria=        [1.0        , 0.83565062, 0.8130502 , 0.76383794, 0.71543807,
               0.65666914, 0.60501138, 0.57992067, 0.50679016, 0.48354859,
               0.46075843, 0.41800086, 0.40867032, 0.40286374, 0.4099042 ,
               0.392492  , 0.42444531, 0.46037841, 0.45126127, 0.49003506,
               0.50018759, 0.51762959, 0.51669688, 0.52082638, 0.54145072,
               0.52657665, 0.54105676, 0.54035763, 0.50444073, 0.49208989,
               0.46402236, 0.44833461, 0.38715839, 0.36331611, 0.33538383,
               0.29451318, 0.26272362, 0.24484509, 0.2088821 , 0.16698784,
               0.18895723]
auto_visits_df=[];
auto_malaria_df=[];
for(var i=0; i<numbers.length; i++){
    var obj = {week_lag: numbers[i], autocorrelation: auto_visits[i]};
    var obj2 = {week_lag: numbers[i], autocorrelation: auto_malaria[i]};
    auto_visits_df.push(obj);
    auto_malaria_df.push(obj2);
        }

function autocorr (dom, array) {

var svg = d3.select(dom)
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
    var x = d3.scaleLinear()
      .domain(d3.extent(array, function(d) { return d.week_lag; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 10)
      .text("time-lag(weeks)")
      .style("font-size", "10px");

    //Y axis
    var y = d3.scaleLinear()
      .domain( [d3.min(array, function(d) { return +d.autocorrelation }), d3.max(array, function(d) { return +d.autocorrelation })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", -margin.top)
      .text("Autocorrelation")
      .style("font-size", "10px");

// Add the line
    svg.append("path")
      .datum(array)
      .attr("fill", "none")
      .attr("stroke", "#0275D8")
      .attr("opacity", 0.7)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.week_lag) })
        .y(function(d) { return y(d.autocorrelation) })
        )
    // Add the points
    svg.append("g")
      .selectAll("dot")
      .data(array)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.week_lag) } )
        .attr("cy", function(d) { return y(d.autocorrelation) } )
        .attr("r", 3)
        .attr("fill", "#0275D8")
//        .attr("opacity", 0.7);

// Handmade legend
svg.append("text").attr("x", 50).attr("y", 0).text("Autocorrelation plot for number of visits per week").style("font-size", "15px").attr("alignment-baseline","middle")
}
autocorr("#autocorrelation", auto_visits_df)
autocorr("#autocorrelation2", auto_malaria_df)
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
