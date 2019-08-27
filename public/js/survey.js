
var locationArr= location.pathname.split("/");
var groupname = locationArr[2];
    
//we need to display survey data times === number of eaters 
var $eaterNumber =$("#eater-number");
var numberEaters;

console.log(groupname);

var API = {
 //ajax to get the eater number from database - getEaterNumber
 getEaterNumber: function(groupName) {
    return $.ajax({
      url: "/api/experiences/" + groupName,
      type: "GET"
    });
  },
}

//function where i will call the getEaterNumber callback function and then I will 

API.getEaterNumber(groupname).then(function(data){

    console.log(data.number_eaters);
    numberEaters = data.number_eaters;

    //function to redeem survey page
    function displaySurvey(){

        if(numberEaters > 0){

        //when clicking submit button push 
        //store in a variable array 


            //reduce number of eaters -1, 
        
            //clear values from the forms

            //call this function again


        }

        else{

            //do logic to get the restaurant 
            //display the next html - restautants

    
        }

    }

    displaySurvey();

})













// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };