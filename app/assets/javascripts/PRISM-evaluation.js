var margin = {top: 20, right: 30, bottom: 40, left: 40},
  width = 340 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

//-- tSNE and PCA plot--//
//upload the output from PCA and tSNE plot ipynb for tGAN and DoppelGANger
//for this script,the output needs to be two separate arrays for original and synthetic with an x-tSNE and a y-tSNE parameter

function tSNE_PCA (dom, array, xReal, yReal, xGen, yGen, xaxisName, yaxisName, name){

    var svg = d3.select(dom)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
                .domain([0, 20])
    //            .domain([0, d3.min([(d3.max(array, function(d) { return +d[xReal]})),(d3.max(array, function(d) { return +d[xGen]}))])])
                .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 10)
        .text(xaxisName)
        .style("font-size", "10px");

    // Add Y axis
    var y = d3.scaleLinear()
                .domain([0, 20])
    //            .domain([0, d3.min([(d3.max(array, function(d) { return +d[yReal]})),(d3.max(array, function(d) { return +d[yGen]}))])])
                .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 10)
        .attr("x", -margin.top)
        .text(yaxisName)
        .style("font-size", "10px");

    // Add dots
    svg.append('g')
          .selectAll("dot")
          .data(array)
          .enter()
          .append("circle")
          .attr("cx", function (d) { return x(d.xReal); } )
          .attr("cy", function (d) { return y(d.yReal); } )
          .attr("r", 4)
          .style("fill", "#fa0000")
          .style("opacity", 0.7);

    svg.append('g')
          .selectAll("dot")
          .data(array)
          .enter()
          .append("circle")
          .attr("cx", function (d) { return x(d.xGen); } )
          .attr("cy", function (d) { return y(d.yGen); } )
          .attr("r", 4)
          .style("fill", "#417ee0")
          .style("opacity", 0.7);

//legend
      svg.append("circle").attr("cx",20).attr("cy",10).attr("r", 5).style("fill", "#fa0000").style("opacity", 0.7)
      svg.append("circle").attr("cx",20).attr("cy",30).attr("r", 5).style("fill", "#417ee0").style("opacity", 0.7)
      svg.append("text").attr("x", 35).attr("y", 15).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 35).attr("y", 35).text("synthetic data").style("font-size", "10px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 100).attr("y", 0).text(name).style("font-size", "15px").attr("alignment-baseline","middle")

}

//tSNE_PCA ("#tSNE", data, "real_x","real_y","gen_x","gen_y", "tSNE-x", "tSNE-y","tSNE plot")
//tSNE_PCA ("#PCA", data, "real_x","real_y","gen_x","gen_y", "PCA-x", "PCA-y","PCA plot")

  //--histogram--//

function empDist
