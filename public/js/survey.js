//groupname is part of the url path, using pathname
var locationArr = location.pathname.split("/");
var groupname = locationArr[2];
var numEater = 1;


//we need to display survey data times === number of eaters 
var $eaterNumber = $("#eater-number");
var numberEaters;
var $buttonSave = $("#buttonSave");
var answers = [];
var zipcode;


//getting number stored in local storage
numEater = localStorage.getItem("number");
if (numEater === null) {
  $("#eater-number").text("Eater #1");
  numEater = 1;
}

else {
  $("#eater-number").text("Eater #" + numEater);
}


//getting stored answers array
var retreiveAnswersArray = localStorage.getItem("answersArr");
if (retreiveAnswersArray === null) {
  answers = [];
}

else {
  answers = JSON.parse(retreiveAnswersArray);
  console.log(answers.length);
}


//console the group name
console.log(groupname);

var API = {
  //ajax call
  // to get the eater number from database - getEaterNumber
  getEaterNumber: function (groupName) {
    return $.ajax({
      url: "/api/experiences/" + groupName,
      type: "GET"
    });
  },
}

//function where i will call the getEaterNumber callback function and get the zip code
API.getEaterNumber(groupname).then(function (data) {
  numberEaters = localStorage.getItem("number-of-eater");
  if (numberEaters === null) {
    numberEaters = data.number_eaters; 
  }
  zipcode = data.zipcode;

  displaySurvey(numberEaters, numEater,zipcode);

});




//function to redeem survey page
function displaySurvey(numberEaters, numEater, zipcode) {


  if (numberEaters > 0) {

    //when clicking submit button, used off.on to prevent duplicates
    $buttonSave.off().on("click", function (event) {
      //clear local storage
      localStorage.clear();
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

    ////alerting user to enter all values
      if (q1 === "" || q2 === "" || q3 === "") {
        alert("Please select a choice for all the questions!");
      }

      //if there is valid choices selected then we push
      else {

        answers.push(userAnswers);
        console.log(answers);
        //storing array to localStorage;
        localStorage.setItem("answersArr", JSON.stringify(answers));

        //reduce number of eaters -1,

        numberEaters--;
        console.log(numberEaters);
        localStorage.setItem("number-of-eater", numberEaters);
        numberEaters = localStorage.getItem("number-of-eater");
        console.log(numberEaters);

        //clear values from the forms;
        $("#q1").val("");
        $("#q2").val("");
        $("#q3").val("");

        //make sure it doesnt happen when have are done taking the input from group members 
        if (numberEaters !== 0) {
          // console.log(numEater);
          numEater++;
          localStorage.setItem("number", numEater);
          numEater = localStorage.getItem("number");
          // console.log(numEater);
          $eaterNumber.text("Eater #" + numEater + "")
        }

      }

      //used to prevent reading empty values for new eater, still need this to happen when number of eaters  === 0 regardless if there is no answers...
      if (q1 !== "" && q2 !== "" && q3 !== "" || numberEaters === 0) {
        //call this function again;
        displaySurvey(numberEaters, numEater,zipcode);
      }
    });

  }

  
  
  //if all eaters have taken the survey already....lets do some logic to calculate the type of restaurant and the price level to issue response....
  else {
    localStorage.clear();

    //do logic to get the restaurant to be displayed....
    //objects to help me count how many votes we have per each restaurant
    var countsPrice = {};
    var countRestaurantType = {}

    //do a for loop through the array answers, inside the objects userAnswers; 
    for (var i = 0; i < answers.length; i++) {
      console.log(answers);
      var key = answers[i].answ3;
      var mood = answers[i].answ2;
      var restType = answers[i].answ1;

      //to get the restaurant price level------
      //push to countsPrice...
      countsPrice[key] = 1 + (countsPrice[key] || 0);

      //according to user's mood we will push value x1, x2, or x3 
      if (mood === "happy" || mood === "adventurous") {
        countRestaurantType[restType] = 2 + (countRestaurantType[restType] || 0);
      }
      else if (mood === "hangry") {
        countRestaurantType[restType] = 3 + (countRestaurantType[restType] || 0);
      }
      else if (mood === "sleepy") {
        countRestaurantType[restType] = 1 + (countRestaurantType[restType] || 0);
      }
    }

    //get the group budget result
    var priceArr = [];
    for (var groupBudget in countsPrice) {
      priceArr.push([groupBudget, countsPrice[groupBudget]]);
    }

    priceArr.sort(function (a, b) {
      return b[1] - a[1];
    });

    var priceWinner = priceArr[0][0];
    console.log("Group Budget is " + priceWinner)

    //adding validation in case there is a match of answers-------;  
    if (priceArr[0][0] === priceArr[0][1]) {
      priceWinnerIndex = Math.floor(Math.random() * priceArr.length + 1);
      priceWinner = priceWinner[priceWinnerIndex][0];
      console.log("random price " + priceWinner);
    }

    //in places library google API price rank is between 0-4; we will use that rank to classify price winner
    if (priceWinner==="5-10"){
    var  priceWinnerMin = 0
    var   priceWinnerMax = 1
     //local storing the budget
    localStorage.setItem("priceMin", priceWinnerMin);
    localStorage.setItem("priceMax", priceWinnerMax);
    }

    else if(priceWinner==="10-20"){
    var   priceWinnerMin = 1
    var   priceWinnerMax = 3
    //local storing the budget
    localStorage.setItem("priceMin", priceWinnerMin);
    localStorage.setItem("priceMax", priceWinnerMax);
    }

    else if(priceWinner==="30"){
    var  priceWinnerMin = 3
    var   priceWinnerMax = 4
    //local storing the budget
    localStorage.setItem("priceMin", priceWinnerMin);
    localStorage.setItem("priceMax", priceWinnerMax);
    }



    //restaurant logic.....get the restaurant logic
    var restaurantArr = [];
    for (var groupRestaurant in countRestaurantType) {
      restaurantArr.push([groupRestaurant, countRestaurantType[groupRestaurant]]);
    }

    restaurantArr.sort(function (a, b) {
      return b[1] - a[1];
    });

    var restaurantChosen = restaurantArr[0][0];

    //local storing the restaurantChosen
    localStorage.setItem("chosenRestaurant", restaurantChosen);

   
   
    //ajax to call an google geocode API ------// 
      // need to find a way to make the key private besides just allowing it to my url in my dev google console settings----// 
    var latitude;
    var longitude;

    console.log(zipcode);

    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCtmvtrNe0IyrgPWkvzyjNdlPoER99nKto&components=postal_code:" + zipcode + "&sensor=false",
      method: "POST",
      success: function (data) {
        console.log(data);
        latitude = data.results[0].geometry.location.lat;
        longitude = data.results[0].geometry.location.lng;
        console.log(
          "Lat = " + latitude + "- Long = " + longitude);
        //store latitude and logitude to localStorage
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        
        //display the next html - restautants
        window.location.href = "/restaurant/" + groupname;
        console.log("page loaded");
      
      }

    });

  }

}
