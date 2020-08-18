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

function visualisation(data) {
  console.log(data);

//--counts tables

  function getItems(input) {
  var arr = input, obj = [];
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i].asexual_plasmodium_parasite_present]) {
      obj[arr[i].asexual_plasmodium_parasite_present] = 1;
    } else if (obj[arr[i].asexual_plasmodium_parasite_present]) {
      obj[arr[i].asexual_plasmodium_parasite_present] += 1;
    }
  }
  return obj;
}
console.log(getItems(data));

//var plasmodium_present = {};
var plasmodium_present = [];
for (var i = 0; i < data.length; i++) {
    if (data[i].asexual_plasmodium_parasite_present in plasmodium_present) {
         plasmodium_present[data[i].asexual_plasmodium_parasite_present] += 1;
    } else {
         plasmodium_present[data[i].asexual_plasmodium_parasite_present] = 1;
    }
}

console.log(plasmodium_present)

plasmodium_present.forEach(element => console.log(element));

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
// console.log(getItems1("asexual_plasmodium_parasite_present"));

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
console.log(withoutNulls);

//console.log(Object.keys(data.haemoglobin))

// set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
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
.attr("y", height + margin.top + 20)
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
            .style("fill", "#69b3a2")


/////////-------COUNT BAR CHART "CATEGORICAL HISTOGRAM"-------/////////


// var svg1 = d3.select("#my_first_cathistogram")
//       .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//         .attr("transform",
//               "translate(" + margin.left + "," + margin.top + ")");
//
// //X axis
// var x1 = d3.scaleBand()
//           .range([ 0, width ])
//           .domain(plasmodium_present.map(function(d) { return d[0]; }))
//           .padding(0.2);
// svg1.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x))
//       .selectAll("text")
//       .attr("transform", "translate(-10,0)rotate(-45)")
//       .style("text-anchor", "end");
//
//
// // Add X axis label:
//
// svg1.append("text")
//       .attr("text-anchor", "end")
//       .attr("x", width)
//       .attr("y", height + margin.top + 10)
//       .text("variables")
//       .style("font-size", "10px");
//
// //Y axis
// var y = d3.scaleLinear()
//   .domain([0, 500])
//   .range([ height, 0]);
// svg1.append("g")
//   .call(d3.axisLeft(y));
// // Y axis label:
// svg1.append("text")
//   .attr("text-anchor", "end")
//   .attr("transform", "rotate(-90)")
//   .attr("y", -margin.left + 20)
//   .attr("x", -margin.top)
//   .text("count")
//   .style("font-size", "10px");
//
// svg1.selectAll("mybar")
//   .data(plasmodium_present)
//   .enter()
//   .append("rect")
//     .attr("x", function(d) { return x(d[0]); })
//     .attr("y", function(d) { return y(d[1]; })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return height - y(d.real); })
//     .attr("fill", "#fa0000")
//     .attr("opacity", 0.6)
//     .attr("stroke", "black");
//
// svg1.selectAll("mybar")
//   .data(hist_dummy_fake)
//   .enter()
//   .append("rect")
//     .attr("x", function(d) { return x(d.variable); })
//     .attr("y", function(d) { return y(d.fake); })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return height - y(d.fake); })
//     .attr("fill", "#417ee0")
//     .attr("opacity", 0.6)
//     .attr("stroke", "black");
//
//     svg1.append("text").attr("x", 60).attr("y", 0).text("Empirical distribution").style("font-size", "15px").attr("alignment-baseline","middle")
//     svg1.append("circle").attr("cx",20).attr("cy",10).attr("r", 5).style("fill", "#fa0000").style("opacity", 0.7)
//     svg1.append("circle").attr("cx",20).attr("cy",30).attr("r", 5).style("fill", "#417ee0").style("opacity", 0.7)
//     svg1.append("text").attr("x", 35).attr("y", 15).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
//     svg1.append("text").attr("x", 35).attr("y", 35).text("synthetic data").style("font-size", "10px").attr("alignment-baseline","middle")


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
