$(document).ready(function(){
    var loadData_tSNE = function(){
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        url: '/get_tSNE_data',
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
    };

    function visualisation(data) {

        console.log("this is working")
        console.log(data)

        var margin = {top: 60, right: 30, bottom: 60, left: 50};
        var width = 345 - margin.left - margin.right;
        var height = 300 - margin.top - margin.bottom;

        //-- tSNE and PCA plot--//
        //upload the output from PCA and tSNE plot ipynb for tGAN and DoppelGANger

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
            //            .domain([-20, 20])
                        .domain([d3.min([(d3.min(array, function(d) { return +d[xReal]})),(d3.min(array, function(d) { return +d[xGen]}))]) -1, d3.max([(d3.max(array, function(d) { return +d[xReal]})),(d3.max(array, function(d) { return +d[xGen]}))])+1])
                        .range([ 0, width ]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + margin.top - 15)
                .text(xaxisName)
                .style("font-size", "10px");

            // Add Y axis
            var y = d3.scaleLinear()
            //            .domain([-20, 20])
                        .domain([d3.min([(d3.min(array, function(d) { return +d[yReal]})),(d3.min(array, function(d) { return +d[yGen]}))])-1, d3.max([(d3.max(array, function(d) { return +d[yReal]})),(d3.max(array, function(d) { return +d[yGen]}))])+1])
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
                  .attr("cx", function (d) { return x(d[xReal]); } )
                  .attr("cy", function (d) { return y(d[yReal]); } )
                  .attr("r", 2)
                  .style("fill", "#fa0000")
                  .style("opacity", 0.6);

            svg.append('g')
                  .selectAll("dot")
                  .data(array)
                  .enter()
                  .append("circle")
                  .attr("cx", function (d) { return x(d[xGen]); } )
                  .attr("cy", function (d) { return y(d[yGen]); } )
                  .attr("r", 2)
                  .style("fill", "#417ee0")
                  .style("opacity", 0.6);

            //legend
            svg.append("circle").attr("cx",20).attr("cy",-22).attr("r", 3.5).style("fill", "#fa0000").style("opacity", 0.6)
            svg.append("circle").attr("cx",20).attr("cy",-7).attr("r", 3.5).style("fill", "#417ee0").style("opacity", 0.6)
            svg.append("text").attr("x", 30).attr("y", -20).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
            svg.append("text").attr("x", 30).attr("y", -5).text("synthetic data").style("font-size", "10px").attr("alignment-baseline","middle");
            //  svg.append("text").attr("x", 100).attr("y", -30).text(name).style("font-size", "15px").attr("alignment-baseline","middle")

        };

        tSNE_PCA ("#tSNE", data, "real_x","real_y","gen_x","gen_y", "tSNE-x", "tSNE-y","tSNE plot")
        //tSNE_PCA ("#PCA", data, "real_x","real_y","gen_x","gen_y", "PCA-x", "PCA-y","PCA plot")

        //--histogram--//

    };
    loadData_tSNE();

});
