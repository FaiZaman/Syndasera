$(document).ready(function(){
    
    $('[data-toggle="tooltip"]').tooltip(); // PRISM description

    // select all and none for column checkboxes
    $("#select-all").on('click', function(){
        $(".checkbox").prop('checked', true)
    });

    $("#select-none").on('click', function(){
        $(".checkbox").prop('checked', false)
    });

});