//clear local storage in case there is some values saved from playing games from previous sessions
localStorage.clear();

// Get references to page elements
var $experienceEaters = $("#eaters");
var $experienceGroup = $("#group");
var $experienceEmail = $("#email");
var $experienceZip = $("#zipcode");
var $submitBtn = $("#groupSubmit");
var theExperience;
var groupname;


// The API object contains methods for each kind of request we'll make
var API = {
  //saving index questions to our database through ur API route
  saveExperience: function (experience) {

    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/groups",
      data: JSON.stringify(experience)
    });
  },
  // in case we need to get API experiences (API objects)
  getExperiences: function () {
    return $.ajax({
      url: "api/groups",
      type: "GET"
    });
  },

  // in case we need to let the user delete his/her experiences from database
  deleteExperiences: function (groupName) {
    return $.ajax({
      url: "api/experiences/" + groupName,
      type: "DELETE"
    });
  },

  getOneExperience: function (groupName) {
    return $.ajax({
      url: "api/experiences/" + groupName,
      type: "GET"
    });
  },
},

  // new function below is called whenever we submit a new experience through the database
  // Save the new experience to the db and refresh the list
  submitGroup = function (event) {
    event.preventDefault();

    var newExperience = {
      number_eaters: $experienceEaters.val().trim(),
      group_name: $experienceGroup.val().trim(),
      email: $experienceEmail.val().trim(),
      zipcode: $experienceZip.val().trim(),
    };



    //validation, all fields have been entered ----
    if (!(newExperience.number_eaters && newExperience.group_name && newExperience.email && newExperience.zipcode)) {
      alert("You must filled all the fields");
      return;
    }

    groupname = newExperience.group_name;

    //validation, unique group name ---
    API.getOneExperience(groupname).then(function (data) {

      console.log("Group name is taken", data);
      theExperience = data;
      if (theExperience) {
        alert("Sorry that group name is taken, use a diferent one!");
      }
      else {
        //if my group name is NOT taken then we can save the experience
        API.saveExperience(newExperience).then(function () {
          $experienceEaters.val("");
          $experienceGroup.val("");
          $experienceEmail.val("");
          $experienceZip.val("");

          //work on id; 

          window.location.href = "/survey/" + groupname;


        });
      }
    });

  };


// // Add event listeners to the submit button
$submitBtn.on("click", submitGroup);



