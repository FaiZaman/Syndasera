"use strict";

$(document).ready(function(){

    $(".date").hide();
    $('[data-toggle="tooltip"]').tooltip(); // PRISM description

    const columnData = {
        'Household ID': "categorical",
        'Visit Date': "date",
        'Age': "number",
        'Weight': "number",
        'Temperature': "number",
        'Abdominal Pain Duration': "number",
        'Admitting Hospital': "categorical",
        'Anorexia Duration': "number",
        'Plasmodium Parasite Density': "number",
        'Basis Of Complicated Diagnosis': "categorical",
        'Complicated Malaria': "binary",
        'Cough Duration': "number",
        'Diagnosis At Hospitalisation': "categorical",
        'Diarrhoea Duration': "number",
        'Fatigue Duration': "number",
        'Fever Duration': "number",
        'Headache Duration': "number",
        'Hospital Admission Date': "date",
        'Hospital Discharge Date': "date",
        'ITN Last Night': "binary",
        'Jaundice Duration': "number",
        'Joint Pains Duration': "number",
        'Malaria Diagnosis': "binary",
        'Malaria Diagnosis and Parasite Status': "categorical",
        'Malaria Treatment': "categorical",
        'Muscle Aches Duration': "number",
        'Non Malaria Medication': "categorical",
        'Other Diagnosis': "categorical",
        'Other Medical Complaint': "categorical",
        'Plasmodium Gametocytes Present': "binary",
        'Seizures Duration': "number",
        'Severe Malaria Criteria': "categorical",
        'Subjective Fever': "binary",
        'Submicroscopic Plasmodium Present': "unique-type",
        'Visit Type': "categorical",
        'Vomiting Duration': "number"
    };

    const columnNames = Object.keys(columnData);
    generateColumnList(columnNames);

    // select all checked columns to display
    $("#select-all").on('click', function(){

        var tableHeaders = getTableHeaders();
		$(".checkbox").prop('checked', true);

        if (tableHeaders.length < columnNames.length){
            for (var i = 0; i < columnNames.length; i++){
                $(".header-row").append("<th>" + columnNames[i] + "</th>")
            }
		}

		// sets all as true
		var columnCheckedCookie = JSON.parse(sessionStorage.getItem('columnCheckedCookie'));
		Object.keys(columnCheckedCookie).forEach(v => columnCheckedCookie[v] = true);
		sessionStorage.setItem('columnCheckedCookie', JSON.stringify(columnCheckedCookie));
		$(".col").show();

    });

    // remove all columns from display
    $("#select-none").on('click', function(){

        var tableHeaders = getTableHeaders();
        $(".checkbox").prop('checked', false);

        if (tableHeaders.length > 0){
            $("th").not(':first').remove();
            $(".col").hide();
		}

		// sets all as false
		var columnCheckedCookie = JSON.parse(sessionStorage.getItem('columnCheckedCookie'));
		Object.keys(columnCheckedCookie).forEach(v => columnCheckedCookie[v] = false);
		sessionStorage.setItem('columnCheckedCookie', JSON.stringify(columnCheckedCookie));

    });

    $(".checkbox").on('click', function(){
        var checkboxID = $(this).attr('id');
		var realID = checkboxID.replace('-checkbox', '');
		var columnCheckedCookie = JSON.parse(sessionStorage.getItem('columnCheckedCookie'));

		removeHeaders();

        if ($(this).is(":checked")){
            // is now checked so display it
			$("." + realID).show();
			columnCheckedCookie[realID] = true;
        }
        else {
            // is now not checked so hide it
			$("." + realID).hide();
			columnCheckedCookie[realID] = false;
		}

		sessionStorage.setItem('columnCheckedCookie', JSON.stringify(columnCheckedCookie));

    });

    // display filtering options for the specific column clicked
    $(".filter-button").on('click', function(){

        const id = this.id.replace("-filter", "").replace(/-/g, ' ').toLowerCase().capitalize()
                            .replace('Itn', 'ITN').replace('Id', 'ID');
        $(".filter-div").hide();

        const formClass = columnData[id];
        $("." + formClass + "-id").empty().append(id);
        $("." + formClass).show();
    });

    // query data based on filtering parameters
    $(".go-filter-button").on('click', function(){

        var name = $(this).attr('name') + "-id";
        var columnName = $("." + name).text().toLowerCase().replace(/\s/g , "_");
        var filters = $('.' + this.id).serializeArray();
        filterData(columnName, filters);

    });

    function filterData(columnName, filters){
        $.ajax({
            type: "POST",
            url: "/filter_data",
            data: {
                column: columnName,
                filter: filters
            },
            dataType: "json",
            success: function(data) {
              console.log(data);
              visualisation(data);
            },
            failure: function(response){
                console.log("Something went wrong!");
            }
          });
    }

    // render column list as html
    function generateColumnList(columnNames){

		var columnChecks = {};
        var columnCheckedCookie = JSON.parse(sessionStorage.getItem('columnCheckedCookie'));

        for (var i = 0; i < columnNames.length; i++){

			const columnName = columnNames[i]
			const id = columnName.replace(/\s/g , "-").toLowerCase();
			const checkboxID = id + "-checkbox";

			var checked = "checked";

			if (columnCheckedCookie != null){
				if (!columnCheckedCookie[id]){
					checked = "";
				}
				if (checked){
					$("." + id).show();
				}
				else {
					$("." + id).hide();
				}
			}

            $(".list-group").append(`<input type='checkbox' id='${checkboxID}' class='checkbox'
                                    ${checked}/><label class='list-group-item' for='${checkboxID}'>
                                    ${columnName}<button class="btn btn-dark filter-button" 
                                    id=${id}-filter style="float:right;">Filter</button></label>`)

			columnChecks[id] = $("#" + checkboxID).is(':checked');

		}
        
        if (columnCheckedCookie == null){
            sessionStorage.setItem('columnCheckedCookie', JSON.stringify(columnChecks));
        }
		removeHeaders();
    }

    // gets the current table header names
    function getTableHeaders(){
        
        var tableHeaders = ['Participant ID']
        $('input[type=checkbox]:checked').next().each(function(){
            tableHeaders.push($(this).text().replace('Filter', ''));
        });

        return tableHeaders;
	}
	
	// removes all headers and readds them based on checked checkboxes
	function removeHeaders(tableHeaders){

		var tableHeaders = getTableHeaders();   // from checkboxes

		$("th").remove();
		tableHeaders.forEach((columnName) => {
			$(".header-row").append(`<th>${columnName}</th>`);
		});
	}

    String.prototype.capitalize = function(){
        return this.replace( /(^|\s)([a-z])/g , function(m, p1, p2){
            return p1+p2.toUpperCase(); 
        });
    };

    function visualisation(data){

        // ==========================================================================
        // rebeca's visualisations
        //--HISTOGRAM divs--//

        d3.select("#content")
        .append("div")
        .attr("id","haemoglobin_histogram")

        d3.select("#content")
        .append("div")
        .attr("id","temparature_histogram")

        d3.select("#content")
        .append("div")
        .attr("id","muscle_aches_duration_histogram")

        d3.select("#content")
        .append("div")
        .attr("id","fatigue_duration_histogram")

        d3.select("#content")
        .append("div")
        .attr("id","fever_duration_histogram")

        d3.select("#content")
        .append("div")
        .attr("id","joint_pains_duration_histogram")

        d3.select("#content")
        .append("div")
        .attr("id","plasmodium_parasite_density_histogram")

        //-- BAR CHART DIVS --//

        d3.select("#content")
        .append("div")
            .attr("id","visit_type_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","admitting_hospital_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","asexual_plasmodium_parasite_present_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","plasmodium_gametocytes_present_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","submicroscopic_plasmodium_present_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","malaria_diagnosis_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","malaria_diagnosis_and_parasite_status_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","malaria_treatment_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","complicated_malaria_cathistogram")

        d3.select("#content")
        .append("div")
            .attr("id","febrile_cathistogram")

        //--AUTOCORRELATION DIVS--//

        d3.select("#content")
        .append("div")
            .attr("id","autocorrelation")

        d3.select("#content")
        .append("div")
            .attr("id","autocorrelation2")



        /////////-------HISTOGRAM-------/////////


        function removenulls(column){
            withoutNulls = data.filter(function(obj) {
                return obj[column] != null;
            })
        }

        function removezerosnulls(column){
            withoutZerosNulls = data.filter(function(obj) {
                return obj[column] !== 0;
            })
            withoutZerosNulls = withoutZerosNulls.filter(function(obj){
                return obj[column] != null;
            })
        }

        var margin = {top: 60, right: 30, bottom: 60, left: 50}
        var width = 345 - margin.left - margin.right
        var height = 300 - margin.top - margin.bottom;

        function drawHistogram (dom, array, column, name){

        var svg = d3.select(dom)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // X axis

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
            .range([height, 0]);
            y.domain([0, d3.max(bins, function(array) { return array.length; })]);
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

        //legends
        svg.append("text").attr("x", 0).attr("y", -20).text(name).style("font-size", "12px").attr("alignment-baseline","middle")
        }

        //removes Nulls to draw histogram that would otherwise replace null with 0.
        var withoutNulls=[]
        removenulls("haemoglobin")
        drawHistogram ("#haemoglobin_histogram", withoutNulls, "haemoglobin", "Haemoglobin mg/mL")

        var withoutNulls=[]
        removenulls("temperature")
        drawHistogram ("#temparature_histogram", withoutNulls, "temperature", "Temperature (Celsius)")

        //removing zeros and nulls before plotting.
        //If don't want this, replace withoutZerosNulls with function withoutNulls for just removing nulls (because nulls are replaced with zero) or replace with data
        //the reason for doing this is because zeros are very prevelant so can't see the more "interesting data"
        var withoutZerosNulls=[]
        removezerosnulls("muscle_aches_duration")
        drawHistogram ("#muscle_aches_duration_histogram", withoutZerosNulls, "muscle_aches_duration", "Muscle aches duration")

        var withoutZerosNulls=[]
        removezerosnulls("fatigue_duration")
        drawHistogram ("#fatigue_duration_histogram", withoutZerosNulls, "fatigue_duration", "Fatigue duration")

        var withoutZerosNulls=[]
        removezerosnulls("fever_duration")
        drawHistogram ("#fever_duration_histogram", withoutZerosNulls, "fever_duration", "Fever duration")

        var withoutZerosNulls=[]
        removezerosnulls("joint_pains_duration")
        drawHistogram ("#joint_pains_duration_histogram", withoutZerosNulls, "joint_pains_duration", "Joint pains duration")

        //i think there is no plasmodium_parasite_density that are different to 0 or null in data500 hence why it's empty
        var withoutZerosNulls=[]
        removenulls("plasmodium_parasite_density")
        //drawHistogram ("#plasmodium_parasite_density_histogram", withoutZerosNulls, "plasmodium_parasite_density", "Plasmodium Parasite Density")

        /////////-------COUNT BAR CHART "CATEGORICAL HISTOGRAM"-------/////////

        function getcountarrayboo(dataset, column){
        for (var i = 0; i < dataset.length; i++) {
        if (spec_count_array.some(el => el.category === dataset[i][column])){
        for (var j = 0; j < spec_count_array.length; j++) {
            if(spec_count_array[j].category === dataset[i][column]){
            spec_count_array[j].count +=1
            }
        }
        } else {
        var add = {
                category: dataset[i][column],
                count: 1
            }
            spec_count_array.push(add);
        }
        }
        }

        function removenullscount(column){
            withoutNulls = spec_count_array.filter(function(obj) {
                return obj[column] != null;
            })
        }

        function drawCatHistogram (dom, array, columnx, columny, name){

        var svg = d3.select(dom)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + 80)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

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
        //    .attr("opacity", 0.6)
        //    .attr("stroke", "black");

        //labels
        svg.append("text").attr("x", 0).attr("y", -20).text(name).style("font-size", "12px").attr("alignment-baseline","middle")
        }

        //the data prep before drawCatHistogram is temporary until the code for the total count table is resolved.
        //might not be possible before friday though.
        var spec_count_array = []
        getcountarrayboo(data, "visit_type")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#visit_type_cathistogram", withoutNulls, "category", "count", "Hospital visit type")

        //note: i think there are no hospital admissions in the data500 hence why it's empty.
        var spec_count_array = []
        getcountarrayboo(data, "admitting_hospital")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#admitting_hospital_cathistogram", withoutNulls, "category", "count", "Admitting hospital")

        var spec_count_array = []
        getcountarrayboo(data, "asexual_plasmodium_parasite_present")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#asexual_plasmodium_parasite_present_cathistogram", withoutNulls, "category", "count", "Asexual plasmodium test")

        var spec_count_array = []
        getcountarrayboo(data, "plasmodium_gametocytes_present")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#plasmodium_gametocytes_present_cathistogram", withoutNulls, "category", "count", "Plasmodium gametocytes present?")

        var spec_count_array = []
        getcountarrayboo(data, "submicroscopic_plasmodium_present")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#submicroscopic_plasmodium_present_cathistogram", withoutNulls, "category", "count", "Submicroscopic plasmodium test")

        var spec_count_array = []
        getcountarrayboo(data, "malaria_diagnosis")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#malaria_diagnosis_cathistogram", withoutNulls, "category", "count","Positive malaria diagnosis?")

        var spec_count_array = []
        getcountarrayboo(data, "malaria_diagnosis_and_parasite_status")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#malaria_diagnosis_and_parasite_status_cathistogram", withoutNulls, "category", "count","Malaria diagnosis and parasite status")

        var spec_count_array = []
        getcountarrayboo(data, "malaria_treatment")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#malaria_treatment_cathistogram", withoutNulls, "category", "count","Malaria treatment")

        var spec_count_array = []
        getcountarrayboo(data, "complicated_malaria")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#complicated_malaria_cathistogram", withoutNulls, "category", "count","Complicated malaria?")

        var spec_count_array = []
        getcountarrayboo(data, "febrile")
        var withoutNulls=[]
        removenullscount("category")
        drawCatHistogram ("#febrile_cathistogram", withoutNulls, "category", "count","Febrile?")
    }
});
