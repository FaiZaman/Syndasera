var x_axis = [1,1,2,2,3,3,4,4.5,5,5,6.5,6,7,7,8,8,9,9.5,10,10,11,11,12,12,13.5,13,14,14.5,15,15,16,16,17,17,18,18.5,19,19,20,20];
var y_axis_real = [2,4,2,4,3,5.5,6,7,3,8,9,3.5,4,5,7.5,11,12,15,16,11,16,4,16.5,13,4,15,20,1,3.5,5,6,7,18,16,19,7,10,13,9,11];
var y_axis_fake = [2,5,3,4,4.5,6,7,6,4,7,9,4,3,6,8,11.5,12,17,16,11.5,17,4,16,14,5,15.5,20,1,4,5,7,7.5,19,15,19,8,10,14,9,10];
var dataset_tSNE=[];
var dataset_tSNE_fake= [];
for(var i=0; i<x_axis.length; i++){
  var obj = {real_x: x_axis[i], real_y: y_axis_real[i]};
  var obj_fake = {fake_x: x_axis[i], fake_y: y_axis_fake[i]};
  dataset_tSNE.push(obj);
  dataset_tSNE_fake.push(obj_fake);
}
console.log(dataset_tSNE);
console.log(dataset_tSNE_fake);

// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 40},
  width = 340 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#tSNE_mockup")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

            // Add X axis
var x = d3.scaleLinear()
    .domain([0, 20])
    .range([ 0, width ]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    // Add X axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 10)
    .text("x-tSNE")
    .style("font-size", "10px");

           // Add Y axis
var y = d3.scaleLinear()
    .domain([0, 20])
    .range([ height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));
    // Y axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 10)
    .attr("x", -margin.top)
    .text("y-tSNE")
    .style("font-size", "10px");

           // Add dots
svg.append('g')
  .selectAll("dot")
  .data(dataset_tSNE)
  .enter()
  .append("circle")
      .attr("cx", function (d) { return x(d.real_x); } )
      .attr("cy", function (d) { return y(d.real_y); } )
      .attr("r", 8)
      .style("fill", "#fa0000") //#69b3a2
      .style("opacity", 0.7);

svg.append('g')
  .selectAll("dot")
  .data(dataset_tSNE_fake)
  .enter()
  .append("circle")
      .attr("cx", function (d) { return x(d.fake_x); } )
      .attr("cy", function (d) { return y(d.fake_y); } )
      .attr("r", 8)
      .style("fill", "#417ee0")//#404080
      .style("opacity", 0.7);

  // Handmade legend
  svg.append("circle").attr("cx",20).attr("cy",10).attr("r", 5).style("fill", "#fa0000").style("opacity", 0.7)
  svg.append("circle").attr("cx",20).attr("cy",30).attr("r", 5).style("fill", "#417ee0").style("opacity", 0.7)
  svg.append("text").attr("x", 35).attr("y", 15).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 35).attr("y", 35).text("synthetic data").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 100).attr("y", 0).text("tSNE plot").style("font-size", "15px").attr("alignment-baseline","middle")
