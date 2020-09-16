$(document).ready(function(){

    var loadData_num = function(){
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        url: '/get_num_data_5000',
                        dataType: 'json',
                        success: function(dataNum){
                            visualisation_num(dataNum);
                        },
                        failure: function(result){
                            error();
                        }
                    });
    };

    var loadData_cat = function(){
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        url: '/get_cat_data',
                        dataType: 'json',
                        success: function(dataCat){
                            visualisation_cat(dataCat);
                        },
                        failure: function(result){
                            error();
                        }
                    });
    };

    var loadData_tSNE = function(){
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        url: '/get_tSNE_data',
                        dataType: 'json',
                        success: function(dataTSNE){
                            visualisation_tSNE(dataTSNE);
                        },
                        failure: function(result){
                            error();
                        }
                    });
    };

    var loadData_PCA = function(){
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        url: '/get_PCA_data',
                        dataType: 'json',
                        success: function(dataPCA){
                            visualisation_PCA(dataPCA);
                        },
                        failure: function(result){
                            error();
                        }
                    });
    };

    var loadData_mse1 = function(){
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        url: '/get_MSE1_data',
                        dataType: 'json',
                        success: function(datamse1){
                            visualisation_mse1(datamse1);
                        },
                        failure: function(result){
                            error();
                        }
                    });
    };

    var loadData_mse3 = function(){
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        url: '/get_MSE3_data',
                        dataType: 'json',
                        success: function(datamse3){
                            visualisation_mse3(datamse3);
                        },
                        failure: function(result){
                            error();
                        }
                    });
    };

    var loadData_tPred = function(){
        $.ajax({
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            url: '/get_tPred_data',
            dataType: 'json',
            success: function(datatPred){
                visualisation_tPred(datatPred);
            },
            failure: function(result){
                error();
            }
        });
    };

    var loadData_autovisit = function(){
        $.ajax({
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            url: '/get_auto_visit_data',
            dataType: 'json',
            success: function(dataAutoVisit){
                visualisation_autoVisit(dataAutoVisit);
            },
            failure: function(result){
                error();
            }
        });
    };

    var loadData_automalaria = function(){
        $.ajax({
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            url: '/get_auto_malaria_data',
            dataType: 'json',
            success: function(dataAutoMalaria){
                visualisation_autoMalaria(dataAutoMalaria);
            },
            failure: function(result){
                error();
            }
        });
    };

    function error() {
        console.log("Something went wrong!");
    };

    var margin = {top: 60, right: 30, bottom: 60, left: 50};
    var width = 345 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;

    // defining functions for making graphs

    function tSNE_PCA (dom, array, xReal, yReal, xGen, yGen, xaxisName, yaxisName){

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
                    .domain([d3.min([(d3.min(array, function(d) { return +d[xReal]})),(d3.min(array, function(d) { return +d[xGen]}))]), d3.max([(d3.max(array, function(d) { return +d[xReal]})),(d3.max(array, function(d) { return +d[xGen]}))])])
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
                    .domain([d3.min([(d3.min(array, function(d) { return +d[yReal]})),(d3.min(array, function(d) { return +d[yGen]}))]), d3.max([(d3.max(array, function(d) { return +d[yReal]})),(d3.max(array, function(d) { return +d[yGen]}))])])
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
              .style("opacity", 0.5);

        svg.append('g')
              .selectAll("dot")
              .data(array)
              .enter()
              .append("circle")
              .attr("cx", function (d) { return x(d[xGen]); } )
              .attr("cy", function (d) { return y(d[yGen]); } )
              .attr("r", 2)
              .style("fill", "#417ee0")
              .style("opacity", 0.5);

        //legend
        svg.append("circle").attr("cx",20).attr("cy",-22).attr("r", 3.5).style("fill", "#fa0000").style("opacity", 0.5)
        svg.append("circle").attr("cx",20).attr("cy",-7).attr("r", 3.5).style("fill", "#417ee0").style("opacity", 0.5)
        svg.append("text").attr("x", 30).attr("y", -20).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 30).attr("y", -5).text("generated data").style("font-size", "10px").attr("alignment-baseline","middle");
        //  svg.append("text").attr("x", 100).attr("y", -30).text(name).style("font-size", "15px").attr("alignment-baseline","middle")

    };

    function scatterplot (dom, array, real, gen, variables, xaxisName, yaxisName){

        var svg = d3.select(dom)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x = d3.scaleLinear()
                    .domain([0, d3.max([(d3.max(array, function(d) { return +d[real]})),(d3.max(array, function(d) { return +d[gen]}))])])
                    .range([0, height]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + margin.top - 15)
            .text(xaxisName)
            .style("font-size", "10px");

        // Add Y axis
        var y = d3.scaleLinear()
                .domain([0, d3.max([(d3.max(array, function(d) { return +d[real]})),(d3.max(array, function(d) { return +d[gen]}))])])
                .range([height , 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left+10)
            .attr("x", -margin.top)
            .text(yaxisName)
            .style("font-size", "10px");

        //hover function
        var tooltip = d3.select(dom)
                        .append("div")
                        .style("opacity", 0)
                        .attr("class", "tooltip")
                        .style("position", "absolute")
                        .style("background-color", "white")
                        .style("border", "solid")
                        .style("border-width", "1px")
                        .style("border-radius", "5px")
                        .style("padding", "5px");

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
        tooltip
        .style("opacity", 1)
        d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
        }

        var mousemove = function(d) {
        tooltip
        .html(d[variables])
        .style("left", (d3.event.pageX + 10)+"px")
        .style("top", (d3.event.pageY + 10)+"px")
        }
        var mouseleave = function(d) {
        tooltip
        .style("opacity", 0)
        d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
        }

        // Add dots
        svg.append('g')
        .selectAll("dot")
        .data(array)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[real]); } )
        .attr("cy", function (d) { return y(d[gen]); } )
        .attr("r", 5)
        .style("fill", "#472F91")
        .style("opacity", 0.7)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

        lines=[{x:0,y:0},{x:d3.max([(d3.max(array, function(d) { return +d[real]})),(d3.max(array, function(d) { return +d[gen]}))]),y:d3.max([(d3.max(array, function(d) { return +d[real]})),(d3.max(array, function(d) { return +d[gen]}))])}]

        svg.append("path")
            .datum(lines)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("d", d3.line()
            .x(function(d) { return x(d.x) })
            .y(function(d) { return y(d.y) })
            );

    };

    function histogram (dom, array, real, gen, xaxisName, tick){

        var svg = d3.select(dom)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //X axis
        var x = d3.scaleLinear()
                    .domain([d3.min([(d3.min(array, function(d) { return +d[real]})),(d3.min(array, function(d) { return +d[gen]}))]), d3.max([(d3.max(array, function(d) { return +d[real]})),(d3.max(array, function(d) { return +d[gen]}))])])
                    .range([0, width]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + margin.top - 15)
            .text(xaxisName)
            .style("font-size", "10px");

        var histogramOri = d3.histogram()
            .value(function(array) { return array[real]; })
            .domain(x.domain())
            .thresholds(x.ticks([((d3.max(array, function(d) { return +d[gen]}))-(d3.min(array, function(d) { return +d[gen]})))]/tick));

        var histogramGen = d3.histogram()
            .value(function(array) { return array[gen]; })
            .domain(x.domain())
            .thresholds(x.ticks([((d3.max(array, function(d) { return +d[gen]}))-(d3.min(array, function(d) { return +d[gen]})))]/tick));

        var binsOri=histogramOri(array)
        var binsGen=histogramGen(array)

        var y = d3.scaleLinear()
                    .range([height, 0]);
                    y.domain([0, d3.max([(d3.max(binsOri, function(d) { return d.length; })),(d3.max(binsGen, function(d) { return d.length; }))])]);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("g")
            .selectAll("rect")
            .data(binsOri)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#fa0000")
            .style("opacity", 0.5)

        svg.append("g")
            .selectAll("rect")
            .data(binsGen)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#417ee0")
            .style("opacity", 0.5)

        svg.append("circle").attr("cx",20).attr("cy",-25).attr("r", 3.5).style("fill", "#fa0000").style("opacity", 0.5)
        svg.append("circle").attr("cx",20).attr("cy",-10).attr("r", 3.5).style("fill", "#417ee0").style("opacity", 0.5)
        svg.append("text").attr("x", 30).attr("y", -23).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 30).attr("y", -8).text("generated data").style("font-size", "10px").attr("alignment-baseline","middle");

    };

    function autocorrelation (dom, array, real, gen, index){

        var svg = d3.select(dom)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x = d3.scaleLinear()
        //        .domain(d3.extent(array, function(d) { return array[index]; }))
                .domain([0,40])
                .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add X axis label:
        svg.append("text")
              .attr("text-anchor", "end")
              .attr("x", width)
              .attr("y", height + margin.top -15)
              .text("time-lag(weeks)")
              .style("font-size", "10px");

        // Add Y axis
        var y = d3.scaleLinear()
                    .domain([d3.min([(d3.min(array, function(d) { return +d[real]})),(d3.min(array, function(d) { return +d[gen]}))]), d3.max([(d3.max(array, function(d) { return +d[real]})),(d3.max(array, function(d) { return +d[gen]}))])])
                    .range([ height, 0 ]);

        svg.append("g")
            .call(d3.axisLeft(y));

        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 10)
            .attr("x", -margin.top)
            .text("Autocorrelation")
            .style("font-size", "10px");

        // Add the line ori
        svg.append("path")
            .datum(array)
            .attr("fill", "none")
            .attr("stroke", "#fa0000")
            .attr("opacity", 0.5)
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d[index]) })
                .y(function(d) { return y(d[real]) })
            )

        // Add the points ori
        svg
            .append("g")
            .selectAll("dot")
            .data(array)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(d[index]) } )
            .attr("cy", function(d) { return y(d[real]) } )
            .attr("r", 3)
            .attr("fill", "#fa0000")
            .attr("opacity", 0.5);

        // Add the line gen
        svg.append("path")
            .datum(array)
            .attr("fill", "none")
            .attr("stroke", "#417ee0")
            .attr("stroke-width", 1.5)
            .attr("opacity", 0.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d[index]) })
                .y(function(d) { return y(d[gen]) })
            )

        // Add the points gen
        svg
            .append("g")
            .selectAll("dot")
            .data(array)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(d[index]) } )
            .attr("cy", function(d) { return y(d[gen]) } )
            .attr("r", 3)
            .attr("fill", "#417ee0")
            .attr("opacity", 0.5);

        //legend
        svg.append("circle").attr("cx",20).attr("cy",-22).attr("r", 3.5).style("fill", "#fa0000").style("opacity", 0.5)
        svg.append("circle").attr("cx",20).attr("cy",-7).attr("r", 3.5).style("fill", "#417ee0").style("opacity", 0.5)
        svg.append("text").attr("x", 30).attr("y", -20).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 30).attr("y", -5).text("generated data").style("font-size", "10px").attr("alignment-baseline","middle");
    };

    // plotting

    // 1.1 Numerical distribution

    function visualisation_num(dataNum){

        console.log("num data")
        console.log(dataNum)
        histogram ("#hist_weight", dataNum, "weight_ori" , "weight_gen", "Weight", 3)
        histogram ("#hist_temp", dataNum, "temp_ori" , "temp_gen", "Temperature in degrees celsius", 1)
        histogram ("#hist_age", dataNum, "age_ori" , "age_gen", "Age in years", 3)
        histogram ("#hist_height", dataNum, "height_ori" , "height_gen", "Height in cm", 5)
    };

    // 1.2 Categorical distribution

    function visualisation_cat(dataCat){

        console.log("cat data")
        console.log(dataCat)
        scatterplot ("#cat", dataCat, "ori","gen","column","Probability Distribution Original Data", "Probability Distribution Generated Data")

    };

    // 2.1 tSNE and PCA

    function visualisation_tSNE(dataTSNE) {

        console.log("this is working")
        console.log(dataTSNE)

        tSNE_PCA ("#tSNE", dataTSNE, "real_x","real_y","gen_x","gen_y", "x-tSNE", "y-tSNE")

    };

    function visualisation_PCA(dataPCA){

        console.log("this PCA is working")
        console.log(dataPCA)

        tSNE_PCA ("#PCA", dataPCA, "real_x","real_y","gen_x","gen_y", "x-PCA", "y-PCA")

    };

    // 2.3 Autocorrelation

    function visualisation_autoVisit (dataAutoVisit){

        console.log("auto visit week")
        console.log(dataAutoVisit)
        autocorrelation("#AutoVisitWeek",dataAutoVisit,"original","generated","index")

    };

    function visualisation_autoMalaria (dataAutoMalaria){

        console.log("auto malaria")
        console.log(dataAutoMalaria)
        autocorrelation("#AutoMalaria",dataAutoMalaria,"original","generated","index")

    };

    // 3.1 Prediction model

    function visualisation_mse1(datamse1){

        scatterplot ("#Fig_1_LR",datamse1.filter(e=>e.model=="LR"),"mse_1_ori","mse_1_gen","variable","log(MSE_1) Original Data","log(MSE_1) Generated Data")
        scatterplot ("#Fig_1_KNR1",datamse1.filter(e=>e.model=="KNR1"),"mse_1_ori","mse_1_gen","variable","log(MSE_1) Original Data","log(MSE_1) Generated Data")
        scatterplot ("#Fig_1_DTR",datamse1.filter(e=>e.model=="DTR"),"mse_1_ori","mse_1_gen","variable","log(MSE_1) Original Data","log(MSE_1) Generated Data")
    };

    function visualisation_mse3(datamse3){

        console.log("mse3 data")
        console.log(datamse3)

        scatterplot ("#Fig_2", datamse3, "ori","gen","model","MSE_3 Original Data", "MSE_3 Generated Data")

    };

    // 3.2 time Prediction model

    function visualisation_tPred(datatPred){

        console.log("tPred data")
        console.log(datatPred)

        scatterplot ("#tPred_loss", datatPred, "test_loss_ori","test_loss_gen","column","Test Loss - Original Data", "Test Loss - Generated Data")
        scatterplot ("#tPred_metric", datatPred, "test_metric_ori","test_metric_gen","column","Test Metric - Original Data", "Test Metric - Generated Data")

    };

    loadData_num();
    loadData_cat();
    loadData_tSNE();
    loadData_PCA();
    loadData_PCA();
    loadData_mse1();
    loadData_mse3();
    loadData_tPred();
    loadData_autovisit();
    loadData_automalaria();
});
