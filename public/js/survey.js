
var locationArr = location.pathname.split("/");
var groupname = locationArr[2];

//we need to display survey data times === number of eaters 
var $eaterNumber = $("#eater-number");
var numberEaters;
var $buttonSave = $("buttonSave");

var answers = [];


console.log(groupname);

var API = {
  //ajax to get the eater number from database - getEaterNumber
  getEaterNumber: function (groupName) {
    return $.ajax({
      url: "/api/experiences/" + groupName,
      type: "GET"
    });
  },
}

//function where i will call the getEaterNumber callback function and then I will 

API.getEaterNumber(groupname).then(function (data) {

  console.log(data.number_eaters);
  numberEaters = data.number_eaters;

  //function to redeem survey page
  function displaySurvey() {

    if (numberEaters > 0) {

      //when clicking submit button 
      $buttonSave.on("click", function (event) {
        event.preventDefault();

        //get values from survey handlebars
        //store in a variable object and push to answersarray 
        var userAnswers = {
          answ1: $("#q1").val(),
          answ2: $("#q2").val(),
          answ3: $("#q3").val(),
        }

        answers.push(userAnswers);

        //reduce number of eaters -1,
        numberEaters--;

        //clear values from the forms;

        $("#q1").val("");
        $("#q2").val("");
        $("#q3").val("");


      });


    //call this function again;
    displaySurvey();



    }

    else {

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