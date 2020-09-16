var margin = {top: 20, right: 30, bottom: 40, left: 40},
    width = 340 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


/////////////////tSNE plot///////////////////

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
console.log("This is the tSNE data in methods js")
console.log(dataset_tSNE);
console.log(dataset_tSNE_fake);

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

///////////////////////next//////////////////////

hist_dummy_real=[];
hist_dummy_fake=[];
hist_dummy=[];
hist_numbers=[];
variables = ["var1","var2","var3","var4"];
count_real = [0.25,0.25,0.3,0.2];
count_fake=[0.2,0.15,0.45,0.2];

for(var i=0; i<variables.length; i++){
    var obj = {variable: variables[i], real: count_real[i]};
    var obj_fake = {variable: variables[i], fake: count_fake[i]};
    var obj_total = {variable: variables[i], real: count_real[i], fake:count_fake[i]};
    var numbers = {real: count_real[i], fake:count_fake[i]}
    hist_dummy_real.push(obj);
    hist_dummy_fake.push(obj_fake);
    hist_dummy.push(obj_total);
    hist_numbers.push(numbers)
}

var svg = d3.select("#barchart_mockup")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//var subgroups = hist_dummy.slice(1) //this removes the first "row"
//var subgroups = delete hist_dummy.variable
var subgroups = ["real","fake"]
console.log("subgroups")
console.log(subgroups)

// List of groups = species here = value of the first column called group -> I show them on the X axis
var groups = d3.map(hist_dummy, function(d){return(d.variable)}).keys()

//X axis
var x = d3.scaleBand()
  .domain(groups)
  .range([0, width])
  .padding([0.2])
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x).tickSize(0));

//Y axis
var y = d3.scaleLinear()
//    .domain([0, (d3.max(hist_dummy, function(d) { return +d.real})])
        .domain([0,0.8])
        .range([ height, 0 ]);

svg.append("g")
    .call(d3.axisLeft(y));

// Another scale for subgroup position?
var xSubgroup = d3.scaleBand()
                    .domain(subgroups)
                    .range([0, x.bandwidth()])
                    .padding([0.05]);

// color palette = one color per subgroup
var color = d3.scaleOrdinal()
              .domain(subgroups)
              .range(['#fa0000','#417ee0']);

// Show the bars
svg.append("g")
    .selectAll("g")
// Enter in data = loop group per group
    .data(hist_dummy)
    .enter()
    .append("g")
    .attr("transform", function(d) { return "translate(" + x(d.variable) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .attr("x", function(d) { return xSubgroup(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", xSubgroup.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d) { return color(d.key); })
    .attr("opacity", 0.7);

svg.append("circle").attr("cx",30).attr("cy",20).attr("r", 5).style("fill", "#fa0000").style("opacity", 0.7)
svg.append("circle").attr("cx",30).attr("cy",40).attr("r", 5).style("fill", "#417ee0").style("opacity", 0.7)
svg.append("text").attr("x", 40).attr("y", 25).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 40).attr("y", 45).text("synthetic data").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 50).attr("y", 0).text("Empricial distribution plot").style("font-size", "15px").attr("alignment-baseline","middle")


///////////////////////empirical scatter plot///////////////

emp_plot=[];
variables = ["var1","var2","var3","var4"];
count_real = [0.25,0.25,0.3,0.2];
count_fake=[0.2,0.15,0.45,0.2];

for(var i=0; i<variables.length; i++){
    var obj = {fake: count_fake[i], real: count_real[i], variables:variables[i]};
    emp_plot.push(obj);
}

console.log(emp_plot)

var svg = d3.select("#empirical_plot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
            .domain([0, 0.8])
            .range([ 0, width ]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add X axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 10)
    .text("empirical distribution - original data")
    .style("font-size", "10px");

// Add Y axis
var y = d3.scaleLinear()
            .domain([0, 0.8])
            .range([ height, 0]);

svg.append("g")
    .call(d3.axisLeft(y));

// Y axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 10)
    .attr("x", -margin.top)
    .text("empirical distribution - synthesised data")
    .style("font-size", "10px");

//hover function

var tooltip = d3.select("#empirical_plot")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "5px")

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
        .html(d.variables)
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
    .data(emp_plot)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.real); } )
    .attr("cy", function (d) { return y(d.fake); } )
    .attr("r", 5)
    .style("fill", "#472F91")
    .style("opacity", 0.7)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

lines=[{x:0,y:0},{x:0.5,y:0.5},{x:0.7,y:0.7}]

svg.append("path")
    .datum(lines)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("d", d3.line()
        .x(function(d) { return x(d.x) })
        .y(function(d) { return y(d.y) })
    )

//////////////////autocorrelation////////////////

var numbers = [];
for (var i = 0; i <= 40; i++) {
    numbers.push(i);
}

var auto_real= [ 1.0,  0.83194072,  0.60752648,  0.40733211,  0.2393539 ,
        0.06308392, -0.03042551, -0.00156437,  0.11492175,  0.23156727,
        0.40431004,  0.587576  ,  0.74329417,  0.73899856,  0.60086223,
        0.42929339,  0.26445132,  0.08971791, -0.04624491, -0.10146541,
       -0.05592395,  0.02258253,  0.14953432,  0.32115828,  0.49650044,
        0.57808745,  0.56546254,  0.45923887,  0.31581384,  0.15070561,
       -0.00991299, -0.11399981, -0.14651289, -0.12881442, -0.04292734,
        0.0860217 ,  0.25763288,  0.37661576,  0.4222832 ,  0.39984781,
        0.30730804];

var auto_fake = [ 1.0,  0.85194072,  0.65752648,  0.40733211,  0.2293539 ,
        0.06308392, -0.03042551, -0.00156437,  0.13492175,  0.23156727,
        0.40431004,  0.557576  ,  0.78329417,  0.77899856,  0.60086223,
        0.42929339,  0.23445132,  0.08971791, -0.07624491, -0.10146541,
       -0.05592395,  0.02258253,  0.14953432,  0.37115828,  0.46650044,
        0.52808745,  0.56546254,  0.45923887,  0.33581384,  0.15070561,
       -0.00991299, -0.11399981, -0.12651289, -0.12881442, -0.04292734,
        0.1860217 ,  0.28763288,  0.39661576,  0.4822832 ,  0.39984781,
        0.30730804];

var auto_real_df=[];
var auto_fake_df=[];

for(var i=0; i<numbers.length; i++){
        var obj = {real_x: numbers[i], real_auto: auto_real[i]};
        var obj_fake = {fake_x: numbers[i], fake_auto: auto_fake[i]};
        auto_real_df.push(obj);
        auto_fake_df.push(obj_fake);
}

console.log(auto_real_df);
console.log(auto_fake_df);

// append the svg object to the body of the page
var svg = d3.select("#Autocorrelation_mockup")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
        .domain(d3.extent(auto_real_df, function(d) { return d.real_x; }))
        .range([ 0, width ]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add X axis label:
svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 10)
      .text("time-lag(weeks)")
      .style("font-size", "10px");

// Add Y axis
var y = d3.scaleLinear()
            .domain( [d3.min(auto_real_df, function(d) { return +d.real_auto }), d3.max(auto_real_df, function(d) { return +d.real_auto })])
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

// Add the line
svg.append("path")
    .datum(auto_real_df)
    .attr("fill", "none")
    .attr("stroke", "#fa0000")
    .attr("opacity", 0.7)
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { return x(d.real_x) })
        .y(function(d) { return y(d.real_auto) })
    )

// Add the points
svg
    .append("g")
    .selectAll("dot")
    .data(auto_real_df)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.real_x) } )
    .attr("cy", function(d) { return y(d.real_auto) } )
    .attr("r", 3)
    .attr("fill", "#fa0000")
    .attr("opacity", 0.7);

// Add the line
svg.append("path")
    .datum(auto_fake_df)
    .attr("fill", "none")
    .attr("stroke", "#417ee0")
    .attr("stroke-width", 1.5)
    .attr("opacity", 0.7)
    .attr("d", d3.line()
        .x(function(d) { return x(d.fake_x) })
        .y(function(d) { return y(d.fake_auto) })
    )

// Add the points
svg
    .append("g")
    .selectAll("dot")
    .data(auto_fake_df)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.fake_x) } )
    .attr("cy", function(d) { return y(d.fake_auto) } )
    .attr("r", 3)
    .attr("fill", "#417ee0")
    .attr("opacity", 0.7);

// Handmade legend
svg.append("circle").attr("cx",200).attr("cy",20).attr("r", 5).style("fill", "#fa0000").style("opacity", 0.7)
svg.append("circle").attr("cx",200).attr("cy",40).attr("r", 5).style("fill", "#417ee0").style("opacity", 0.7)
svg.append("text").attr("x", 215).attr("y", 25).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 215).attr("y", 45).text("synthetic data").style("font-size", "10px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 50).attr("y", 0).text("Autocorrelation plot").style("font-size", "15px").attr("alignment-baseline","middle")

//////////////////predictive model///////////////////

//var names = ["Age","Height","BMI","Cancer Type","Ethnicity","Visit Date","Admitting Hospital","Tumour Size","Specialist Code","Hospital Duration","Temperature","Drug","Gender"];
var names = ["var13","var3","var4","var12","var7","var9","var2","var11","var10","var6","var1"]
var x_axis = [0.1,0.2,0.3,0.3,0.4,0.5,0.5,0.6,0.7,0.8,0.9,0.95,1.0];
var y_axis = [0.1,0.35,0.3,0.5,0.65,0.6,0.45,0.4,0.45,0.7,0.9,0.9,0.8];
accuracy_dummy=[];

for(var i=0; i<x_axis.length; i++){
    var obj = {real: x_axis[i], fake: y_axis[i], variable:names[i]};
    accuracy_dummy.push(obj);
}
console.log(accuracy_dummy);

// append the svg object to the body of the page
var svg = d3.select("#predictive_mockup")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Add X axis
var x = d3.scaleLinear()
            .domain([0, 1])
            .range([ 0, width ]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add X axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 10)
    .text("accuracy score - original data")
    .style("font-size", "10px");

// Add Y axis
var y = d3.scaleLinear()
            .domain([0, 1])
            .range([ height, 0]);

svg.append("g")
    .call(d3.axisLeft(y));

// Y axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 10)
    .attr("x", -margin.top)
    .text("accuracy score - synthesised data")
    .style("font-size", "10px");

//hover function

var tooltip = d3.select("#predictive_mockup")
                  .append("div")
                  .style("opacity", 0)
                  .attr("class", "tooltip")
                  .style("position", "absolute")
                  .style("background-color", "white")
                  .style("border", "solid")
                  .style("border-width", "1px")
                  .style("border-radius", "5px")
                  .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
// d3.mouse(this) returns x,y in relation to the svg, not in relation to the page
// so when you transform the div it ends up in the corner
// So you need to use either event.pageY or d3.event.pageY
// I'd use the d3 one just for cohesivness but don't think it matters tbh
    tooltip
        .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
}

var mousemove = function(d) {
    tooltip
        .html(d.variable)
        .style("top", (d3.event.pageY + 10)+"px")
        .style("left",(d3.event.pageX + 10)+"px")
      // .style("top", (event.pageY)+"px")
      // .style("left",(event.pageX)+"px")
}

var mouseleave = function(d) {
    tooltip
        .transition()
        .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
}

// Add dots
svg.append('g')
    .selectAll("dot")
    .data(accuracy_dummy)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.real); } )
    .attr("cy", function (d) { return y(d.fake); } )
    .attr("r", 5)
    .style("fill", "#472F91") //#69b3a2
    .style("opacity", 0.7)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

lines=[{x:0,y:0},{x:0.5,y:0.5},{x:1,y:1}]

svg.append("path")
    .datum(lines)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("d", d3.line()
        .x(function(d) { return x(d.x) })
        .y(function(d) { return y(d.y) })
    )

///// histogram /////

realhist=[1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,7,7,7,8,8,8,8,8,8,8,8]
fakehist=[1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8]

var svg = d3.select("#predictive_mockup")
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


/////my code for side by side bar chart??////

//
//   var svg = d3.select("#barchart_mockup")
//         .append("svg")
//           .attr("width", width + margin.left + margin.right)
//           .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//           .attr("transform",
//                 "translate(" + margin.left + "," + margin.top + ")");
//
// //var subgroups = hist_dummy.slice(1) //this removes the first "row"
// //var subgroups = delete hist_dummy.variable
// var subgroups = ["real","fake"]
// console.log("subgroups")
// console.log(subgroups)
//
//   // List of groups = species here = value of the first column called group -> I show them on the X axis
//   var groups = d3.map(hist_dummy, function(d){return(d.variable)}).keys()
//
// //X axis
//   var x = d3.scaleBand()
//       .domain(groups)
//       .range([0, width])
//       .padding([0.2])
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x).tickSize(0));
//
// //Y axis
// var y = d3.scaleLinear()
// //    .domain([0, (d3.max(hist_dummy, function(d) { return +d.real})])
//     .domain([0,50])
//     .range([ height, 0 ]);
//   svg.append("g")
//     .call(d3.axisLeft(y));
//
// // Another scale for subgroup position?
//   var xSubgroup = d3.scaleBand()
//     .domain(subgroups)
//     .range([0, x.bandwidth()])
//     .padding([0.05])
//
//     // color palette = one color per subgroup
//     var color = d3.scaleOrdinal()
//       .domain(subgroups)
//       .range(['#fa0000','#417ee0'])
//
//
//
//       // Show the bars
// svg.append("g")
//   .selectAll("g")
//   // Enter in data = loop group per group
//   .data(hist_dummy)
//   .enter()
//   .append("g")
//     .attr("transform", function(d) { return "translate(" + x(d.variable) + ",0)"; })
//   .selectAll("rect")
//   .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
//   .enter().append("rect")
//     .attr("x", function(d) { return xSubgroup(d.key); })
//     .attr("y", function(d) { return y(d.value); })
//     .attr("width", xSubgroup.bandwidth())
//     .attr("height", function(d) { return height - y(d.value); })
//     .attr("fill", function(d) { return color(d.key); })
//     .attr("opacity", 0.7);
//
//     svg.append("circle").attr("cx",30).attr("cy",20).attr("r", 5).style("fill", "#fa0000").style("opacity", 0.7)
//     svg.append("circle").attr("cx",30).attr("cy",40).attr("r", 5).style("fill", "#417ee0").style("opacity", 0.7)
//     svg.append("text").attr("x", 40).attr("y", 25).text("Yes").style("font-size", "10px").attr("alignment-baseline","middle")
//     svg.append("text").attr("x", 40).attr("y", 45).text("No").style("font-size", "10px").attr("alignment-baseline","middle")
//     svg.append("text").attr("x", 50).attr("y", 0).text("Positive malaria diagnosis?").style("font-size", "15px").attr("alignment-baseline","middle")

/////////old stacked bar chart for empirical distributions ////////////////

// var svg = d3.select("#barchart_mockup2")
//       .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//         .attr("transform",
//               "translate(" + margin.left + "," + margin.top + ")");
//
// //X axis
// var x = d3.scaleBand()
//           .range([ 0, width ])
//           .domain(hist_dummy_real.map(function(d) { return d.variable; }))
//           .padding(0.2);
// svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x))
//       .selectAll("text")
//       .attr("transform", "translate(-10,0)rotate(-45)")
//       .style("text-anchor", "end");
//
//
// // Add X axis label:
//
// svg.append("text")
//       .attr("text-anchor", "end")
//       .attr("x", width)
//       .attr("y", height + margin.top + 10)
//       .text("variables")
//       .style("font-size", "10px");
//
// //Y axis
// var y = d3.scaleLinear()
//   .domain([0, 0.6])
//   .range([ height, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y));
// // Y axis label:
// svg.append("text")
//   .attr("text-anchor", "end")
//   .attr("transform", "rotate(-90)")
//   .attr("y", -margin.left + 20)
//   .attr("x", -margin.top)
//   .text("empirical distribution")
//   .style("font-size", "10px");
//
// // Bars
// svg.selectAll("mybar")
//   .data(hist_dummy_real)
//   .enter()
//   .append("rect")
//     .attr("x", function(d) { return x(d.variable); })
//     .attr("y", function(d) { return y(d.real); })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return height - y(d.real); })
//     .attr("fill", "#fa0000")
//     .attr("opacity", 0.6)
//     .attr("stroke", "black");
//
// svg.selectAll("mybar")
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
//     svg.append("text").attr("x", 60).attr("y", 0).text("Empirical distribution").style("font-size", "15px").attr("alignment-baseline","middle")
//     svg.append("circle").attr("cx",20).attr("cy",10).attr("r", 5).style("fill", "#fa0000").style("opacity", 0.7)
//     svg.append("circle").attr("cx",20).attr("cy",30).attr("r", 5).style("fill", "#417ee0").style("opacity", 0.7)
//     svg.append("text").attr("x", 35).attr("y", 15).text("original data").style("font-size", "10px").attr("alignment-baseline","middle")
//     svg.append("text").attr("x", 35).attr("y", 35).text("synthetic data").style("font-size", "10px").attr("alignment-baseline","middle")
