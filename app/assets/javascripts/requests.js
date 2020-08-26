"use strict";

$(document).ready(function(){

    $(".no-requests").hide();

    // render no requests made message if the request list is empty
    if ($(".requests-list").children().length == 0 ){
        $(".instructions").hide();
        $(".no-requests").show();
    }

});