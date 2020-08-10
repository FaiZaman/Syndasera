var loadData = function(){
                $.ajax({
                  type: 'GET',
                  contentType: 'application/json; charset=utf-8',
                  url: '/present_data',
                  dataType: 'json',
                  success: function(data){
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
function visualisation(data) {
    console.log(data);
}
d3.select("body").transition().style("background-color", "#f6abb650")

d3.select("#content").append("div").attr("class", "container")
.append("p").text("Hello, welcome to the d3 playground. Everything should be possible in here <3.\
                    For the time being please use dummy data defined as an object in this file. \
                    Once we get the rails model with the data in it I might become a .js.erb so you\
                    can query the model from here :D.")
$(document).ready(function(){
  loadData()
});
