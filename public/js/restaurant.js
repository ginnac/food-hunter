
//when clicking on reset game
$("#reset-game").on("click", function (event) {
event.preventDefault();
  window.location.href = "/"; })


var latitude;
var longitude;
var priceMin;
var priceMax;
var chosenRestaurant;
var allResponses = [];
var chosenResponses = [];

var groupChosenRestaurant;
var groupChosenRestaurantIndex;
var zipcode;
var currentEmail;
var restaurantId;

zipcode = localStorage.getItem("zipcode");
latitude = localStorage.getItem("latitude");
longitude = localStorage.getItem("longitude");
priceMax = localStorage.getItem("priceMax");
priceMin = localStorage.getItem("priceMin");
priceMax = localStorage.getItem("priceMax");
chosenRestaurant = localStorage.getItem("chosenRestaurant");
currentEmail = localStorage.getItem("currentEmail");

//retrieve local stored latitude and longitude and use it to call text search google api;
function loadScript(src, callback) {

    var script = document.createElement("script");
    script.type = "text/javascript";
    if (callback) script.onload = callback;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = src;
}

//team please create your own key with google maps API; message me if you need help with that!! :)



 loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAtCZISv6xfi48x9WbfjCY-yIolj9lo6tk&libraries=places&callback=initialize', 

 function(){log('google-loader has been loaded');});

 
 var map;
 var infowindow;

 var request;
 var service;
 var markers=[];

  function initialize(){  
  var center = new google.maps.LatLng(latitude, longitude);
  map = new google.maps.Map(document.getElementById("map_canvas"),{
      center:center,
      zoom:13,
  });



//****change the query value for responses I get *****//    
 request = {
   location:center,
   //radius values is in meters
   radius:10045,
   query: chosenRestaurant,
   //price level values from 0 to 4
   maxPriceLevel: priceMax,
   minPriceLevel: priceMin,
   openNow: true,
  };

  infowindow = new google.maps.InfoWindow();

 ///  service = new google.maps.places.PlacesService(map);
 ///  service.nearbySearch(request, callback);

 service = new google.maps.places.PlacesService(map);
 service.textSearch(request, callback);

  //function to search anywhere in the map...
  //first parameter is element to tab on
  //second element is the event happening....
  google.maps.event.addListener(map, "rightclick" , function(event){
     map.setCenter(event.latLng);
     clearResults(markers);

     var request = {
         location:event.latLng,
         radius: 10045,
         query: chosenRestaurant,
         openNow: true,
         maxPriceLevel: priceMax,
         minPriceLevel: priceMin,

        // types:["restaurant"],
     };
     /// service.nearbySearch(request,callback);
     service.textSearch(request, callback);
  });

  }

  function callback(results,status){
      if(status == google.maps.places.PlacesServiceStatus.OK){
          for (var i = 0; i<results.length;i++){
              markers.push(createMarker(results[i]));
              allResponses.push(results[i]);
              console.log(allResponses);              
          }

          writeToDom(allResponses);


      }
  }


  function createMarker(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
          map:map,
          position:place.geometry.location,
          //
          place: {
            placeId: place.place_id,
            location: place.geometry.location,
            name:place.name
          }
      });

      google.maps.event.addListener(marker, "click", function(){
         infowindow.setContent(place.name);
         infowindow.open(map,this);

      });
     return marker;
  }

  function clearResults(markers){
      for (var m in markers){
          markers[m].setMap(null)
      }
      markers =[]
  }

  //function to write the results to dom: 

  function writeToDom(allResponses){

    //ajax:
    API.getPhotoArray(chosenRestaurant).then(function (data) {
        
        console.log (data.urls_array);
        var scrUrl = data.urls_array;

        //allresponses = [];

        //need to do math random to get random responses (3 responses the most, and then 
        groupChosenRestaurantIndex=Math.floor(Math.random() * allResponses.length);

      if(groupChosenRestaurantIndex < 0){
        groupChosenRestaurantIndex === 0
      }
        console.log(groupChosenRestaurantIndex);
        groupChosenRestaurant = allResponses[groupChosenRestaurantIndex];
        console.log(groupChosenRestaurant);
        $("#res-name").text(groupChosenRestaurant.name);
        $("#res-data").text(groupChosenRestaurant.formatted_address);
       // $("#res-type").text(chosenRestaurant);
        $("#res-photo").attr("src", scrUrl);

        console.log(groupChosenRestaurant);


        var restaurantObj ={
            name: groupChosenRestaurant.name,
            kind_food: chosenRestaurant,
            address: groupChosenRestaurant.formatted_address,
            zip_code: zipcode,
            photo: scrUrl,
        };
        
        API.saveRestaurant(restaurantObj).then(function (data){
          console.log (data);
          restaurantId = data.id;
          
            $.post("/api/email/" + restaurantId + "/" + currentEmail)
            .then(function (data) {
               
            });
          
         
        });
    })
    }


    


  var API = {
    getPhotoArray: function (chosenRestaurant) {
        return $.ajax({
          url: "/api/photos/" + chosenRestaurant,
          type: "GET"
        });
      },
      saveRestaurant: function (restaurantQuery) {
        return $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: "/api/restaurants",
          data: JSON.stringify(restaurantQuery)
        });
      }
  }


  
  $("#reviewsButton").on("click", function(event){
    event.preventDefault();
    var zipCode = $("#zipcode").val().trim();
    var restaurantType = $("#cs-1").val().trim();
    $.get("/api/reviews/" + zipCode + "/" + restaurantType)
        .then(function (data) {
         
          if(data.length === 0){
            
            alert("There is no restaurant that matches the Zipcode and Restaurant type entered, however our database is growing everyday. Play the Food Hunter Game and Let the world know how you like it, reply to the email review after!")
          
          }

          else{
            console.log(data);

            for(var i=0;i<data.length;i++){
              //create div for the image and for the rating; 
              //create div
              var newDiv = $("<div>");
              newDiv.attr("id","reviewsId");
              newDiv.attr("class","col-xs-12 col-lg-10")
              //create p, and add text in rating 
              var newP = $("<p>");
              var secNewP = $("<p>");
              var thirNewP =$("<p>");
              var fortNewP =$("<p>");
              var fifNewP=$("<p>");
              var sixNewP=$("<p>");
              var sevNewP=$("<p>");

              var eighNewP = $("<p>");
              newP.text("Restaurant Name: " + data[i].name);
              secNewP.text("Address: " + data[i].address);
              thirNewP.text("Cuisine: " + data[i].kind_food);
              
               //for now we are getting the first review, as part of improvents we will look inside data[i].reviews to get all reviews appended 
              fortNewP.text("Restaurant Rank: " + data[i].Reviews[0].restaurant_rank);
              fifNewP.text("Restaurant Comments: " + data[i].Reviews[0].restaurant_review);
              sixNewP.text("App and Experience Rank: " + data[i].Reviews[0].app_rank);
              sevNewP.text("App and Experience Comments: " + data[i].Reviews[0].app_comments);
             
              //create image element and add atrribute SRC to it, still and moving attribute, and append it to div
              var pic = $("<img>");
              pic.attr("src", data[i].photo);
              pic.attr("id", "review-photo");
              //append p and append image
              newDiv.prepend(sevNewP);
              newDiv.prepend(sixNewP);
              newDiv.prepend(fifNewP);
              newDiv.prepend(fortNewP);
              newDiv.prepend(thirNewP);
              newDiv.prepend(secNewP);
              newDiv.prepend(newP);
              newDiv.prepend(pic);
              //prepend div to the DIV ID#pic-of-animals in the dom
              $("#reviews-records").prepend(newDiv);
            }
          }
        });
      });

 //------------------------------------------------------------------------------------------------------------------------------------//

// work with allResponses array to get the 3 responses


//push data to our restaurant table to create our own API //

function log(str) {
    document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('[' + new Date().getTime() + ']\n' + str + '\n\n'));
}

//clear localStorage and take back to front page.....
