$(document).ready(function(){
    
    // render column list as html
    const column_names = [
        'Participant ID',
        'Household ID',
        'HospVisitDate',
        'Age',
        'Weight (kg)',
        'Temperature (C)',
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
        'Hopsital Discharge Date',
        'ITN Last Night',
        'Jaundice Duration',
        'Joint Pains Duration',
        'Malaria Diagnosis',
        'Parasite Status',
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

    for (var i = 1; i < column_names.length + 1; i++){
        $(".list-group").append("<input type='checkbox' id='CheckBox" 
                                + i + "' class='checkbox' checked /><label class='list-group-item' for='CheckBox"
                                + i + "'>" + column_names[i - 1] + "</label>")
    }

    $('[data-toggle="tooltip"]').tooltip(); // PRISM description

    // select all and none for column checkboxes
    $("#select-all").on('click', function(){
        $(".checkbox").prop('checked', true)
    });

    $("#select-none").on('click', function(){
        $(".checkbox").prop('checked', false)
    });

});