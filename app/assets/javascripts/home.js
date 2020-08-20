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
        'Submicroscopic Plasmodium Present': "binary",
        'Visit Type': "binary",
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
        $(".number-id").empty().append(id);
        $(".date-id").empty().append(id);

        const formClass = columnData[id];
        $("." + formClass).show();
    });

    function getSubset(columns){
        $.ajax({
            type: "POST",
            url: "/get_subset",
            data: {
                cols: columns
            },
            dataType: "json",
            success: function(response) {
              console.log(response);
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
});
