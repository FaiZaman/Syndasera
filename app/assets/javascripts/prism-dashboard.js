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

//attempts at trying to make a counts table

  var hospital_counts = [];
  function getunique(){
    for (i = 0; i < data.length; i++) {
            if (hospital_counts.indexOf(data[i].admitting_hospital) === -1) {
              hospital_counts.push(data[i].admitting_hospital)
  }}}

    console.log(hospital_counts);

  function getItems(input) {
  var arr = input, obj = [];
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i].admitting_hospital]) {
      obj[arr[i].admitting_hospital] = 1;
    } else if (obj[arr[i].admitting_hospital]) {
      obj[arr[i].admitting_hospital] += 1;
    }
  }
  return obj;
}
console.log(getItems(data)); // outputs entire object

var hosp_counts = {};
for (var i = 0; i < data.length; i++) {
    if (data[i].admitting_hospital in hosp_counts) {
         hosp_counts[data[i].admitting_hospital] += 1;
    } else {
         hosp_counts[data[i].admitting_hospital] = 1;
    }
}

console.log(hosp_counts)

d3.select("#content")
    .append("div")
      .attr("id","my_first_histogram")

d3.select("#content")
      .append("div")
        .attr("id","my_second_histogram")

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

//var filteredData = data.filter(data.haemoglobin === null);
// var filtered = data.filter(function (el) {
//   return el != null;
// });

// X axis: scale and draw:
    var x = d3.scaleLinear()
//        .domain([0, 20])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .domain([d3.min(data, function(d) { return +d.haemoglobin}), d3.max(data, function(d) { return +d.haemoglobin})+1])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var histogram = d3.histogram()
//          .value(function(filteredData) { return data.haemoglobin; })   // Attempt at removing null value
//        .value(function(data) { return data.haemoglobin; return data.heamoglobin != null; })   // Attempt at removing null value
//        .value(function(data) { return data.haemoglobin.filter(function(data){data != null}); }) // Attempt at removing null value
        .value(function(data) { return data.haemoglobin; }) 
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(40)); // then the numbers of bins

                // And apply this function to data to get the bins
    var bins = histogram(data);

                  // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(data) { return data.length; })]);   // d3.hist has to be called before the Y axis obviously
//          y.domain([0, 50])
    svg.append("g")
        .call(d3.axisLeft(y));

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
