
var locationArr = location.pathname.split("/");
var groupname = locationArr[2];

//we need to display survey data times === number of eaters 
var $eaterNumber = $("#eater-number");
var numberEaters;
var $buttonSave = $("#buttonSave");

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
  numberEaters = data.number_eaters;

  displaySurvey(numberEaters);

});




 //function to redeem survey page
 function displaySurvey(numberEaters) {

  console.log("hola");

  if (numberEaters > 0) {

    //when clicking submit button, used off and on to prevent duplicates
    $buttonSave.off().on("click", function (event) {
    //$("body").on("click", $buttonSave, function () {
      event.preventDefault();

      console.log(numberEaters);

      //get values from survey handlebars
      //store in a variable object and push to answersarray 
      var userAnswers = {
        answ1: $("#q1").val(),
        answ2: $("#q2").val(),
        answ3: $("#q3").val(),
      }

      var q1 = $("#q1").val();
      var q2 = $("#q2").val();
      var q3 = $("#q3").val();

      //alerting user to enter all values
      if (q1 === "" || q2 === "" || q3 === "") {
        alert("Please select a choice for all the questions!");
      }

      //if there is valid choices selected then we push
      else{

        answers.push(userAnswers);
        console.log(answers);
        //reduce number of eaters -1,
        numberEaters--;
        console.log(numberEaters);
        //clear values from the forms;
        $("#q1").val("");
        $("#q2").val("");
        $("#q3").val("");

      }
      
      //used to prevent reading empty values for new eater, still need this to happen when number of eaters  === 0 regardless if answers === ""
      if (q1 !== "" && q2 !== "" && q3 !== "" || numberEaters === 0) {
        //call this function again;
        displaySurvey(numberEaters);

      }


    });

  }

  else {

    //do logic to get the restaurant 
     
    //display the next html - restautants

    window.location.href = "/";

    console.log("done");


  }

}













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