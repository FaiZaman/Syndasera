//--histogram for numerical data--//

//removes Nulls to draw histogram that would otherwise replace null with 0.
var withoutNulls = data.filter(function(obj) {
	return obj.haemoglobin != null;
});
console.log(withoutNulls);


//-- tSNE and PCA plot--//
//upload the output from PCA and tSNE plot ipynb for tGAN and DoppelGANger

//for this script,the output needs to be two separate arrays for original and synthetic with a an x-tSNE and a y-tSNE parameter

//--tSNE plot--
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
