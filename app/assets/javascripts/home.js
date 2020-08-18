"use strict";

$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip(); // PRISM description

    const columnNames = [
        'Household ID',
        'Visit Date',
        'Age',
        'Weight',
        'Temperature',
        'Abdominal Pain Duration',
        'Admitting Hospital',
        'Anorexia Duration',
        'Plasmodium Parasite Density',
        'Basis of Complicated Diagnosis',
        'Complicated Malaria',
        'Cough Duration',
        'Diagnosis at Hospitalisation',
        'Diarrhoea Duration',
        'Fatigue Duration',
        'Fever Duration',
        'Headache Duration',
        'Hospital Admission Date',
        'Hospital Discharge Date',
        'ITN Last Night',
        'Jaundice Duration',
        'Joint Pains Duration',
        'Malaria Diagnosis',
        'Malaria Diagnosis and Parasite Status',
        'Malaria Treatment',
        'Muscle Aches Duration',
        'Non Malaria Medication',
        'Other Diagnosis',
        'Other Medical Complaint',
        'Plasmodium Gametocytes Present',
        'Seizures Duration',
        'Severe Malaria Criteria',
        'Subjective Fever',
        'Submicroscopic Plasmodium Present',
        'Visit Type',
        'Vomiting Duration'
    ]

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
                                    ${checked}/><label class='list-group-item'for='${checkboxID}'>
                                    ${columnName}<button class="btn btn-secondary>hi</button></label>`)

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
            tableHeaders.push($(this).text());
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

});
