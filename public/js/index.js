// Get references to page elements
var $experienceEaters = $("#eaters");
var $experienceGroup = $("#group");
var $experienceEmail = $("#email");
var $experienceZip = $("#zipcode");
var $submitBtn = $("#groupSubmit");


// The API object contains methods for each kind of request we'll make
var API = {
  saveExperience: function(experience) {
    
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/groups",
      data: JSON.stringify(experience)
    });
  },
  getExperiences: function() {
    return $.ajax({
      url: "api/groups",
      type: "GET"
    });
  },
  deleteExperiences: function(id) {
    return $.ajax({
      url: "api/groups/" + id,
      type: "DELETE"
    });
  },

  displaySurvey: function() {
    return $.ajax({
      url: "/survey",
      type: "GET"
    });
},

}

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var submitGroup = function(event) {
  event.preventDefault();

  var newExperience = {
    number_eaters: $experienceEaters.val().trim(),
    group_name: $experienceGroup.val().trim(),
    email: $experienceEmail.val().trim(),
    zipcode: $experienceZip.val().trim(),
    
    
  };

  // if (!(newExperience.text && newExperience.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveExperience(newExperience).then(function() {
    $exampleText.val("");
    $exampleDescription.val("");
    API.displaySurvey(),
  });

 
};

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

// // Add event listeners to the submit and delete buttons
$submitBtn.on("click", submitGroup);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
