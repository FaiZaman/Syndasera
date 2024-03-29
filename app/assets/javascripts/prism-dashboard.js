$(document).ready(function(){
    var loadData = function(){
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        url: '/get_data_1000',
                        dataType: 'json',
                        beforeSend: function(){
                            $('#loader').show()
                            $('.graph-display').hide();
                        },
                        success: function(data){
                            $('#loader').hide()
                            $('.graph-display').show();
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
    console.log("1000 rows of the full data")
    console.log(data)
    // Three function that change the tooltip when user hover / move / leave a cell

        d3.selectAll('#dashboard div').remove()
        // console.log(data);
        var tooltip = d3.select('#dashboard')
                        .append("div")
                        .style("opacity", 0)
                        .attr("class", "tooltip")
                        .style("position", "absolute")
                        .style("background-color", "#f8f9fa")
                        .style("border", "solid")
                        .style("border-color", "#343a40")
                        .style("border-width", "1px")
                        .style("border-radius", "5px")
                        .style("padding", "2px 8px 2px 8px");

        var mouseover = function(d) {
            tooltip.style("opacity", 1);
            d3.select(this).style("opacity", 0.8);
        }

        var mousemove = function(d) {
            tooltip.html(d.length)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 30) + "px");
        }
        var mousemoveBar = function(d) {
            tooltip.html(d["count"])
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 30) + "px");
        }
        var mousemoveScatter = function(d) {
            tooltip.html(d.autocorrelation)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 30) + "px");
        }
        var mouseleave = function(d) {
            tooltip.style("opacity", 0)
            d3.select(this).style("opacity", 1);
        }
    	//--Faiz: adding week column and grouping by week--//

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

        //--END Faiz part I: adding week column and grouping by week. This is used by Noo--//

        //--Noo: adding week column and grouping by week--//

        // Simpler code to create week week groupings in a different data structure
        var weekGroupings = [];
        // For each unique week
        _.uniq(dates).forEach((d, i) => {
            var date = d;
            var weekYear = date.slice(0, 4) + '-' + new Date(date).getWeekNumber();
            var all_data = _.filter(data, (e) => {
                // Find all entries with that week as `visit_date`
                return e['visit_date'].slice(0, 4) + '-' + new Date(e['visit_date']).getWeekNumber() == weekYear;
            });
            weekGroupings[i] = {'week' : weekYear, 'data' : all_data};
        });

        // console.log("These are the visits clustered by week")
        // console.log(weekGroupings)

        // Counting frequency in an array
        function getCounts(arr){
            var a = [], b = 0, prev;
            arr.sort();
            arr.forEach((e, i) => {
                if(e !== prev){
                    b = 1;
                    a.push({variable: arr[i], count: b});
                } else {
                    _.find(a, e => e.variable == arr[i])['count'] += 1;
                }
                prev = e;
            });
            return a;
        }

        var allWeekCounts = [];
        var all_cols = Object.keys(data[0]);
        // Creating the nested data structure for columns
        all_cols.forEach(col => {
            allWeekCounts.push({column: col, data: []});
        });
        // Counting variable frequency by date and appending it to the nested data
        weekGroupings.forEach((datum, i) => {
            all_cols.forEach((column) => {
                var values = [];
                datum.data.forEach(e => values.push(e[column]));
                var counts = getCounts(values);
                _.find(allWeekCounts, e => e.column == column)['data'].push({week: datum.week, variables: counts});
            });
        });

        // allWeekCounts has duplicates of weeks with same info - not sure why.

         console.log("These are the counts by week")
         console.log(allWeekCounts)
         //console.log(allWeekCounts.filter(e=>e.column=="visit_type"))

//         // function flatten(obj) {
//         //     var flattenedObj = {};
//         //     Object.keys(obj).forEach(function(key){
//         //     if (typeof obj[key] === 'object') {
//         //         $.extend(flattenedObj, flatten(obj[key]));
//         //     } else {
//         //         flattenedObj[key] = obj[key];
//         //     }
//         //     });
//         //     return flattenedObj;
//         // }
//         //console.log(flatten(arr1))
//
//         // flat_array=[];
//         // function superflat(array){
//         //     for (var i = 0; i < array.length; i++) {
//         //         var obj = array[i]
//         //         var flattenedObj = {};
//         //         Object.keys(obj).forEach(function(key){
//         //             if (typeof obj[key] === 'object') {
//         //                 $.extend(flattenedObj, flatten(obj[key]));
//         //             } else {
//         //                 flattenedObj[key] = obj[key];
//         //             }
//         //         });
//         //         flat_array.push(flattenedObj);
//         //     }
//         // };
//
//         // superflat(arr1);
//         //console.log(flat_array)
//
//         // mega_flat_array=[];
//         // function megaflatten(obj) {
//         //     Object.keys(obj).forEach(function(key){
//         //     var flattenedObj = {};
//         //     if (typeof obj[key] === 'object') {
//         //         $.extend(flattenedObj, flatten(obj[key]));
//         //     } else {
//         //         flattenedObj[key] = obj[key];
//         //     }
//         //     mega_flat_array.push(flattenedObj); //same result
//         //     });
//         // //mega_flat_array.push(flattenedObj);
//         // }
//
//         //megaflatten(arr1)
//         //console.log("mega flat")
//         //console.log(mega_flat_array)
//
//         // function flattenObject(ob) {
//         //   var toReturn = {};
//         //   var flatObject;
//         //   for (var i in ob) {
//         //     if (!ob.hasOwnProperty(i)) {
//         //       continue;
//         //     }
//         //     if ((typeof ob[i]) === 'object') {
//         //       flatObject = flattenObject(ob[i]);
//         //       for (var x in flatObject) {
//         //         if (!flatObject.hasOwnProperty(x)) {
//         //           continue;
//         //         }
//         //         toReturn[x] = flatObject[x];
//         //       }
//         //     } else {
//         //       toReturn[i] = ob[i];
//         //     }
//         //   }
//         //   return toReturn;
//         // };
//         //
//         // console.log(flattenObject(arr1))
//
//
//
// //         function flattenArrayObjects(arr) {
// //             return arr.map(obj => flatten(obj));
// //         }
// //
// //         function flatten(obj, output = {}) {
// //             return Object.entries(obj).reduce((res,[k,v]) => {
// //                 if (typeof v === "object") {
// //                     res = flatten(v, res);
// //                 } else {
// //                     res[k] = v;
// //                 }
// //             return res;
// //             }, output);
// //         }
// //
// // console.log(flattenArrayObjects(arr1));
//
//         function flatten2(branch, flattenedObj) {
//             Object.keys(branch).forEach((key) => {
//                 if (typeof branch[key] === "object") {
//                     Object.assign({}, flattenedObj, flatten2(branch[key], flattenedObj));
//                 } else {
//                     if (key in flattenedObj) {
//                         // new row detected, get existing keys to work with
//                         let keysArray = Object.keys(flattenedObj);
//                         // we are going to loop backwards and delete duplicate keys
//                         let end = Object.keys(flattenedObj).length;
//                         let stopAt = Object.keys(flattenedObj).indexOf(key);
//                         //delete object keys from back of object to the newly found one
//                     for (let z = end; z > stopAt; z--) {
//                         delete flattenedObj[keysArray[z - 1]];
//                     }
//                     flattenedObj[key] = branch[key];
//                     } else {
//                         flattenedObj[key] = branch[key];
//                     }
//                 }
//             });
//             //convert to string to remove duplicates later. probably should not have duplicates in first place
//             arrayWeek.push(JSON.stringify(flattenedObj));
//             return flattenedObj;
//         }
//
//         var subset = allWeekCounts.filter(e=>e.column=="visit_type");
//         var arrayWeek = [];
//         flatten2(subset, {});
//
//         arrayWeek = arrayWeek.filter(function(item, pos) {
//             return arrayWeek.indexOf(item) == pos;
//         });
//
//         arrayWeek = arrayWeek.map((arrayWeek) => JSON.parse(arrayWeek));
//
//         console.log("method 1")
//         console.log(subset)
//         console.log(arrayWeek)
//
        //
        // function makeFlat(arr) { //assume you're always passing in an array
        //
        //     let objects = [];
        //     arr.forEach(item =>
        //         {
        //         let currentObject = {};
        //         const keys = Object.keys(item);
        //         keys.forEach(key =>
        //             {
        //             const obj = item[key];
        //             if(Array.isArray(obj))
        //                 {
        //                 let parts = makeFlat(obj);
        //                 if(objects.length > 0)
        //                     {
        //                     if(parts.length > objects.length)
        //                         {
        //                         parts.forEach(part =>
        //                             {
        //                                 objects.forEach(ob =>
        //                                     {
        //                                         Object.keys(ob).forEach(k =>
        //                                             {
        //                                                 if(Object.keys(part).indexOf(k) == -1)
        //                                                     {
        //                                                     part[k] = ob[k];
        //                                                     }
        //                                             });
        //                                     });
        //                             });
        //                         objects = parts;
        //                         }
        //                     else
        //                         {
        //                         objects.forEach(ob =>
        //                             {
        //                             parts.forEach(part =>
        //                                 {
        //                                 Object.keys(part).forEach(k =>
        //                                     {
        //                                     if(Object.keys(ob).indexOf(k) == -1)
        //                                         {
        //                                         ob[k] = part[k];
        //                                         }
        //                                     });
        //                                 });
        //                             });
        //                         }
        //                     }
        //                 else
        //                     {
        //                     objects = parts;
        //                     }
        //                 }
        //                 else
        //                     {
        //                     if(Object.keys(currentObject).length == 0)
        //                         {
        //                         objects.push(currentObject);
        //                         }
        //                     currentObject[key] = item[key];
        //
        //                     objects.forEach(ob =>
        //                         {
        //                         if(Object.keys(ob).indexOf(key) == -1)
        //                             {
        //                             ob[key] = currentObject[key]
        //                             }
        //                         });
        //                     }
        //             });
        //         });
        //     return objects;
        // }
        //
        // var subset = allWeekCounts.filter(e=>e.column=="visit_type");
        // let flattened = makeFlat(subset);
        // flattened.sort(function(a, b){
        //     var y1 = 1 * a["week"].split("-")[0],
        //     y2 = 1* b["week"].split("-")[0],
        //     m1 = 1 * a["week"].split("-")[1],
        //     m2 = 1 * b["week"].split("-")[1];
        //     if (y1 != y2) return d3.ascending(y1, y2);
        //     else return d3.ascending(m1, m2);
        // });
        //
        // console.log("method 2")
        // // flattened.forEach(item => console.log(JSON.stringify(item)));
        // console.log(flattened)

//unnest allWeekCounts array.

        const isArray = (arr) => {
            return Array.isArray(arr);
        };

        const isObject = (obj) => {
            return typeof obj === "object" && obj !== null;
        };

        const flatten = (tree, row, result) => {
            try {
                if (isArray(tree)) {
                    tree.forEach((branch, index) => {
                        flatten(branch, row, result);
                    });
                } else if (isObject(tree)) {
                    Object.keys(tree).forEach((key) => {
                        //we don't want to add objects or arrays to the row -
                        if (!isArray(tree[key]) && !isObject(tree[key])) {
                            if (key in row) {
                                // new row detected, get existing keys to work with
                                let keysArray = Object.keys(row);
                                // we are going to loop backwards and delete duplicate keys
                                let end = Object.keys(row).length;
                                let stopAt = Object.keys(row).indexOf(key);
                                //delete object keys from back of object to the newly found one
                                for (let z = end; z > stopAt; z--) {
                                    delete row[keysArray[z - 1]];
                                }
                                row[key] = tree[key];
                            } else {
                                row[key] = tree[key];
                            }
                        } else {
                            flatten(tree[key], row, result);
                            throw "skip";
                        }
                    });
                //all other rows in results will be overridden if we don't stringify
                result.push(JSON.stringify(row));
                }
            } catch (e) {
                    //console.log(e)
            }
            finally {
                return result.map((row) => JSON.parse(row));
            }
        };

        // var resulthello = flatten(subset, {}, [])
        // console.log(resulthello)

         //-- divs--//
        var divs_to_add = [
            [
                "haemoglobin_histogram",
                "temparature_histogram",
                "muscle_aches_duration_histogram"
            ],
            [
                "fatigue_duration_histogram",
                "fever_duration_histogram",
                "joint_pains_duration_histogram"
            ],
            [
                "febrile_cathistogram",
                "visit_type_cathistogram",
                "asexual_plasmodium_parasite_present_cathistogram"
            ],
            [
                "plasmodium_gametocytes_present_cathistogram",
                "submicroscopic_plasmodium_present_cathistogram",
                "malaria_diagnosis_cathistogram"
            ],
            [
                "malaria_diagnosis_and_parasite_status_cathistogram",
                "malaria_treatment_cathistogram",
                "complicated_malaria_cathistogram"
            ],
            // [
            //     "plasmodium_parasite_density_histogram",
            //     "autocorrelation",
            //     "autocorrelation2"
            // ],
            [
                "week_visit_type"
            ],
            [
                "week_malaria_diagnosis"
            ],
            [
                "week_plasmodium_present"
            ],
            [
                "week_ab_pain"
            ]
        ];

        divs_to_add.forEach((e, i)=> {
            d3.select("#dashboard")
                .append("div")
                .attr("id", `row-for-dashboard${i}`)
                .attr("class", "row default-graphs");
            e.forEach((f) => {
                d3.select(`#row-for-dashboard${i}`)
                    .append("div")
                    .attr("id",f)
                    .attr("class", "col-md-4");
            });
        });
        $(".default-graphs").hide();

        var margin = {top: 60, right: 30, bottom: 60, left: 50};
        var width = 345 - margin.left - margin.right;
        var height = 300 - margin.top - margin.bottom;

        ////////----- week collapsed bar chart----//////

        function removenulls(column){
            withoutNulls = subset.filter(function(obj) {
                return obj[column] != null;
            });
        }

        function drawWeekBarChart (dom, array, name, slice){

            // sort by week
            array.sort(function(a, b){
                var y1 = 1 * a["week"].split("-")[0],
                y2 = 1* b["week"].split("-")[0],
                m1 = 1 * a["week"].split("-")[1],
                m2 = 1 * b["week"].split("-")[1];
                if (y1 != y2) return d3.ascending(y1, y2);
                else return d3.ascending(m1, m2);
            });

            var array = array.slice(0, slice);

            var margin = {top: 60, right: 30, bottom: 60, left: 50};
            var width = 1100 - margin.left - margin.right;
            var height = 300 - margin.top - margin.bottom;

            var svg = d3.select(dom)
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom);

            var color = d3.scaleOrdinal(d3.schemeCategory10);

            var x = d3.scaleBand()
                    .rangeRound([0, width])
                    .padding(0.1),
                y = d3.scaleLinear()
                    .rangeRound([height, 0]);

            var g = svg.append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var ymaxdomain = d3.max(array, function(d) {
                return d.count;
            });

            x.domain(array.map(function(d) {
                return d.week
            }));

            y.domain([0, ymaxdomain]);

            var x1 = d3.scaleBand()
                .rangeRound([0, x.bandwidth()])
                .padding(0.05)
                .domain(array.map(function(d) {
                    return d.variable;
                }));

            color.domain(array.map(function(d) {
                return d.variable;
            }));

            var groups = g.selectAll(null)
              .data(array)
              .enter()
              .append("g")
              .attr("transform", function(d) {
                return "translate(" + x(d.week) + ",0)";
            })

            var bars = groups.selectAll(null)
                            .data(function(d) {
                                return [d]
                            })
              .enter()
              .append("rect")
              .attr("x", function(d, i) {
                return x1(d.variable)
              })
              .attr("y", function(d) {
                return y(d.count);
              })
              .attr("width", x1.bandwidth())
              .attr("height", function(d) {
                return height - y(d.count);
              })
              .attr("fill", function(d) {
                return color(d.variable)
              })
              .on("mouseover", mouseover)
              .on("mousemove", mousemoveBar)
              .on("mouseleave", mouseleave);

            g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))
              .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");

            g.append("g")
              .attr("class", "axis")
              .call(d3.axisLeft(y).ticks(null, "s"))
              .append("text")
              .attr("x", 2)
              .attr("y", y(y.ticks().pop()) + 0.5)
              .attr("dy", "0.32em")
              .attr("fill", "#000")
              .attr("font-weight", "bold")
              .attr("text-anchor", "start")

            g.append("text").attr("x", 0).attr("y", -40).text(name).style("font-size", "12px").attr("alignment-baseline","middle");

            var legNames = d3.map(array, function(d){return(d.variable)}).keys()

            var legend = g.selectAll(".legend")
                            .data(legNames.slice().reverse())
                            .enter().append("g")
                            .attr("class", "legend")
                            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                    .attr("x", width - 9)
                    .attr("y", -42)
                    .attr("width", 9)
                    .attr("height", 9)
                    .style("fill", color);

            legend.append("text")
                    .attr("x", width - 17)
                    .attr("y", -38)
                    .attr("dy", ".35em")
                    .style("font-size", "12px")
                    .style("text-anchor", "end")
                    .text(function(d) { return d; });

        };

        var subset = allWeekCounts.filter(e=>e.column=="visit_type");
        var arrayWeek = flatten(subset, {}, []);
        drawWeekBarChart ("#week_visit_type", arrayWeek, "Counts per week for each visit type", 225)

        var subset = allWeekCounts.filter(e=>e.column=="malaria_diagnosis");
        var arrayWeek = flatten(subset, {}, []);
        drawWeekBarChart ("#week_malaria_diagnosis", arrayWeek, "Counts per week for positive or negative malaria diagnosis", 195)

        var subset = allWeekCounts.filter(e=>e.column=="abdominal_pain");
        var arrayWeek = flatten(subset, {}, []);
        drawWeekBarChart ("#week_ab_pain", arrayWeek, "Counts per week for presence or absence of abdominal pain", 225)

        var subset = allWeekCounts.filter(e=>e.column=="submicroscopic_plasmodium_present");
        var arrayWeek = flatten(subset, {}, []);
        drawWeekBarChart ("#week_plasmodium_present", arrayWeek, "Counts per week for presence or absence of submicroscopic plasmodium detected by LAMP test", 280)

        /////////-------HISTOGRAM-------/////////


        function removenulls(column){
            withoutNulls = data.filter(function(obj) {
    	        return obj[column] != null;
            });
        }

        function removezerosnulls(column){
            withoutZerosNulls = data.filter(function(obj) {
    	        return obj[column] !== 0;
            });
            withoutZerosNulls = withoutZerosNulls.filter(function(obj){
                return obj[column] != null;
            });
        }

        function drawHistogram (dom, array, column, name){

            var text = d3.select(dom)
                        .append("div")
                        .style("font-weight", "bold")
                        .text(`Original ${name}`);

            var svg = d3.select(dom)
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // X axis
            // var domain = [d3.min(array, function(d) { return +d[column]}) -1, d3.max(array, function(d) { return +d[column]})+1]
            // var step = Math.round(domain[1])/Math.round(domain[0])
        // domain[1] = domain[1]+step
            var x = d3.scaleLinear()
                        .domain([d3.min(array, function(d) { return +d[column]}) -1, d3.max(array, function(d) { return +d[column]})+1])
                        .range([0, width]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + margin.top - 15)
                .text(name)
                .style("font-size", "10px");

            var histogram = d3.histogram()
                .value(function(array) { return array[column]; })
                .domain(x.domain())
                .thresholds(x.ticks([((d3.max(array, function(d) { return +d[column]}))-(d3.min(array, function(d) { return +d[column]})))*2]));


            var bins = histogram(array);
            // Y axis
            var y = d3.scaleLinear()
                        .domain([0, d3.max(bins, function(array) { return array.length; })])
                        .range([height, 0]);

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
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);

            //legends
            svg.append("text").attr("x", 0).attr("y", -20).text(name).style("font-size", "12px").attr("alignment-baseline","middle");
        }

        //removes Nulls to draw histogram that would otherwise replace null with 0.
        var withoutNulls=[];
        removenulls("haemoglobin");
        drawHistogram ("#haemoglobin_histogram", withoutNulls, "haemoglobin", "Haemoglobin mg/mL");

        var withoutNulls=[];
        removenulls("temperature");
        drawHistogram ("#temparature_histogram", withoutNulls, "temperature", "Temperature (Celsius)");

        //removing zeros and nulls before plotting.
        //If don't want this, replace withoutZerosNulls with function withoutNulls for just removing nulls (because nulls are replaced with zero) or replace with data
        //the reason for doing this is because zeros are very prevelant so can't see the more "interesting data"
        var withoutZerosNulls=[];
        removezerosnulls("muscle_aches_duration");
        drawHistogram ("#muscle_aches_duration_histogram", withoutZerosNulls, "muscle_aches_duration", "Muscle aches duration");

        var withoutZerosNulls=[];
        removezerosnulls("fatigue_duration");
        drawHistogram ("#fatigue_duration_histogram", withoutZerosNulls, "fatigue_duration", "Fatigue duration");

        var withoutZerosNulls=[];
        removezerosnulls("fever_duration");
        drawHistogram ("#fever_duration_histogram", withoutZerosNulls, "fever_duration", "Fever duration");

        var withoutZerosNulls=[];
        removezerosnulls("joint_pains_duration");
        drawHistogram ("#joint_pains_duration_histogram", withoutZerosNulls, "joint_pains_duration", "Joint pains duration");

        //i think there is no plasmodium_parasite_density that are different to 0 or null in data500 hence why it's empty
        var withoutZerosNulls=[];
        removenulls("plasmodium_parasite_density");
        drawHistogram ("#plasmodium_parasite_density_histogram", withoutZerosNulls, "plasmodium_parasite_density", "Plasmodium Parasite Density");

        /////////------- BAR CHART "CATEGORICAL HISTOGRAM"-------/////////

        function getcountarrayboo(column){
            for (var i = 0; i < data.length; i++) {
                if (spec_count_array.some(el => el.category === data[i][column])){
                    for (var j = 0; j < spec_count_array.length; j++) {
                        if(spec_count_array[j].category === data[i][column]){
                            spec_count_array[j].count +=1
                        }
                    }
                } else {
                    var add = {
          			    category: data[i][column],
          			    count: 1
          		    };
          		    spec_count_array.push(add);
                }
            }
        }

        function removenullscount(column){
            withoutNulls = spec_count_array.filter(function(obj) {
    	           return obj[column] != null;
            });
        }

        function drawCatHistogram (dom, array, columnx, columny, name){

            var text = d3.select(dom)
                        .append("div")
                        .style("font-weight", "bold")
                        .text(`Original ${name}`);
            var svg = d3.select(dom)
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom + 80)
                        .append("g")
                        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

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
            // svg.append("text")
            //       .attr("text-anchor", "end")
            //       .attr("x", width)
            //       .attr("y", height + margin.top + 5)
            //       .text("variables")
            //       .style("font-size", "10px");

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
                .attr("fill", "#B9DBDF")
                .on("mouseover", mouseover)
                .on("mousemove", mousemoveBar)
                .on("mouseleave", mouseleave);
            //    .attr("opacity", 0.6)
            //    .attr("stroke", "black");

            //labels
            svg.append("text").attr("x", 0).attr("y", -20).text(name).style("font-size", "12px").attr("alignment-baseline","middle");
        }

        //the data prep before drawCatHistogram is temporary until the code for the total count table is resolved.
        //might not be possible before friday though.
        var spec_count_array = [];
        getcountarrayboo("visit_type");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#visit_type_cathistogram", withoutNulls, "category", "count", "Hospital visit type");

        //note: i think there are no hospital admissions in the data500 hence why it's empty.
        var spec_count_array = [];
        getcountarrayboo("admitting_hospital");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#admitting_hospital_cathistogram", withoutNulls, "category", "count", "Admitting hospital");

        var spec_count_array = [];
        getcountarrayboo("asexual_plasmodium_parasite_present");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#asexual_plasmodium_parasite_present_cathistogram", withoutNulls, "category", "count", "Asexual plasmodium test");

        var spec_count_array = [];
        getcountarrayboo("plasmodium_gametocytes_present");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#plasmodium_gametocytes_present_cathistogram", withoutNulls, "category", "count", "Plasmodium gametocytes present?");

        var spec_count_array = [];
        getcountarrayboo("submicroscopic_plasmodium_present");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#submicroscopic_plasmodium_present_cathistogram", withoutNulls, "category", "count", "Submicroscopic plasmodium test");

        var spec_count_array = [];
        getcountarrayboo("malaria_diagnosis");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#malaria_diagnosis_cathistogram", withoutNulls, "category", "count","Positive malaria diagnosis?");

        var spec_count_array = [];
        getcountarrayboo("malaria_diagnosis_and_parasite_status");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#malaria_diagnosis_and_parasite_status_cathistogram", withoutNulls, "category", "count","Malaria diagnosis and parasite status");

        var spec_count_array = [];
        getcountarrayboo("malaria_treatment");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#malaria_treatment_cathistogram", withoutNulls, "category", "count","Malaria treatment");

        var spec_count_array = [];
        getcountarrayboo("complicated_malaria");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#complicated_malaria_cathistogram", withoutNulls, "category", "count","Complicated malaria?");

        var spec_count_array = [];
        getcountarrayboo("febrile");
        var withoutNulls=[];
        removenullscount("category");
        drawCatHistogram ("#febrile_cathistogram", withoutNulls, "category", "count","Febrile?");

        //to be replaced with filtering of allcount which i believe has no nulls.
        //drawCatHistogram ("#asexual_plasmodium_parasite_present_cathistogram", allcount.filter(e=>e.colname=="asexual_plasmodium_parasite_present"), "variable", "count")
        //console.log(allcount.filter(e=>e.colname=="asexual_plasmodium_parasite_present"))

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
                            0.30730804];
        var auto_malaria= [1.0        , 0.83565062, 0.8130502 , 0.76383794, 0.71543807,
                           0.65666914, 0.60501138, 0.57992067, 0.50679016, 0.48354859,
                           0.46075843, 0.41800086, 0.40867032, 0.40286374, 0.4099042 ,
                           0.392492  , 0.42444531, 0.46037841, 0.45126127, 0.49003506,
                           0.50018759, 0.51762959, 0.51669688, 0.52082638, 0.54145072,
                           0.52657665, 0.54105676, 0.54035763, 0.50444073, 0.49208989,
                           0.46402236, 0.44833461, 0.38715839, 0.36331611, 0.33538383,
                           0.29451318, 0.26272362, 0.24484509, 0.2088821 , 0.16698784,
                           0.18895723];
        auto_visits_df=[];
        auto_malaria_df=[];
        for (var i=0; i<numbers.length; i++){
            var obj = {week_lag: numbers[i], autocorrelation: auto_visits[i]};
            var obj2 = {week_lag: numbers[i], autocorrelation: auto_malaria[i]};
            auto_visits_df.push(obj);
            auto_malaria_df.push(obj2);
        }

        function autocorr (dom, array, name) {

            var svg = d3.select(dom)
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
                );
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
                .on("mouseover", mouseover)
                .on("mousemove", mousemoveScatter)
                .on("mouseleave", mouseleave);
        //        .attr("opacity", 0.7);

            // Handmade legend
            svg.append("text").attr("x", 0).attr("y", -20).text(name).style("font-size", "12px").attr("alignment-baseline","middle");
        }
        autocorr("#autocorrelation", auto_visits_df, "Autocorrelation plot of number of visits per week");
        autocorr("#autocorrelation2", auto_malaria_df, "Autocorrelation plot of number of positive Malaria diagnosis per week");
    }

    // d3.select("#content").append("div").attr("class", "container")
    // .append("p").text("Hello, welcome to the d3 playground. Everything should be possible in here <3.\
    //                     For the time being please use dummy data defined as an object in this file. \
    //                     Once we get the rails model with the data in it I might become a .js.erb so you\
    //                     can query the model from here :D.")

    /////////-------WEEk COLLAPSE BAR CHART-------/////////



    // var svg = d3.select("Weekcollapse1")
    //             .append("svg")
    //               .attr("width", width + margin.left + margin.right)
    //               .attr("height", height + margin.top + margin.bottom)
    //             .append("g")
    //               .attr("transform",
    //                     "translate(" + margin.left + "," + margin.top + ")");

      // debugger
    loadData();
});


//for bar charts etc to remove null values, replace .data(data) with:
// .data(data, function(inptArray) {
//   return inptArray.filter(function(obj) {
//    return obj.y != null;
//   })
// });
