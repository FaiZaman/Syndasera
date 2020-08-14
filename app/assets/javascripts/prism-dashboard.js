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

// X axis: scale and draw:
    var x = d3.scaleLinear()
//        .domain([0, 20])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .domain([0, d3.max(data, function(d) { return +d["Hemoglobin (g/dL) [EUPATH_0000047]"]})])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var histogram = d3.histogram()
        .value(function(data) { return data["Hemoglobin (g/dL) [EUPATH_0000047]"]; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(20)); // then the numbers of bins

                // And apply this function to data to get the bins
    var bins = histogram(data);

                  // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
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
