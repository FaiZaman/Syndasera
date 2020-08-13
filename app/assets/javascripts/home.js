"use strict";

$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip(); // PRISM description

    const columnNames = [
        'Participant ID',
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
        $("td").show();
        $(".pagination-div").show();
    });

    // remove all columns from display
    $("#select-none").on('click', function(){

        var tableHeaders = getTableHeaders();
        $(".checkbox").prop('checked', false);

        if (tableHeaders.length > 0){
            $("th").remove();
            $("td").hide();
            $(".pagination-div").hide();
        }
    });

    $(".checkbox").on('click', function(){
        var checkboxID = $(this).attr('id');
        var realID = checkboxID.replace('-checkbox', '');

        var tableHeaders = getTableHeaders();   // from checkboxes
        var columns = [];

        // removes all headers and readds them based on checked checkboxes
        $("th").remove();

        tableHeaders.forEach((columnName) => {
            var columnID = columnName.replace(/\s/g, "_").toLowerCase();
            columns.push(columnID);
            $(".header-row").append("<th>" + columnName + "</th>");
        });

        if ($(this).is(":checked")){
            // is now checked so display it
            $("." + realID).show();
        }
        else {
            // is now not checked so hide it
            $("." + realID).hide();
        }
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
        for (var i = 1; i < columnNames.length + 1; i++){
            const id = columnNames[i - 1].replace(/\s/g , "-").toLowerCase() + "-checkbox";
            $(".list-group").append("<input type='checkbox' id='" + id
                                    + "' class='checkbox' checked /><label class='list-group-item'"
                                    + "for='" + id + "'>" + columnNames[i - 1] + "</label>")
        }
    }

    // gets the current table header names
    function getTableHeaders(){
        
        var tableHeaders = []
        $('input[type=checkbox]:checked').next().each(function(){
            tableHeaders.push($(this).text());
        });

        return tableHeaders;
    }
});
