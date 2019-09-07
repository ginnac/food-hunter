
 //id of restaurant will have to be coming from our resturant table
 $("#results").hide();
 $("#reset-game").hide();
 $("#email-button").show();

 //when clicking on results id, then send email and show resolution
 $("#results").on("click", function(event){
    //send email to user

    //discover results..
    event.preventDefault();
    $("#results").show();
    $("#email-button").hide();
    $("#reset-game").hide();

 });


 //when clicking on reset game
 $("#reset-game").on("click", function(event){
   event.preventDefault();
   //go back to front page
   window.location.href = "/";
 });


var latitude;
var longitude;
var priceMin;
var priceMax;
var chosenRestaurant;
var allResponses = [];
var chosenResponses = [];

latitude = localStorage.getItem("latitude");
longitude = localStorage.getItem("longitude");
priceMax = localStorage.getItem("priceMax");
priceMin = localStorage.getItem("priceMin");
priceMax = localStorage.getItem("priceMax");
chosenRestaurant = localStorage.getItem("chosenRestaurant");

//retrieve local stored latitude and longitude and use it to call text search google api;
function loadScript(src,callback){
  
   var script = document.createElement("script");
   script.type = "text/javascript";
   if(callback)script.onload=callback;
   document.getElementsByTagName("head")[0].appendChild(script);
   script.src = src;
 }
 
//team please create your own key with google maps API; message me if you need help with that!! :)
 loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDM07rWKSpGs6eZ788blx8FNXQI9SoxsZE&libraries=places&callback=initialize', 
 function(){log('google-loader has been loaded, but not the maps-API ');});
 
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
   radius:16090,
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
         radius: 16090,
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
              console.log(results[i]);
              //need to do math random to get random response
          }
      }
  }

  function createMarker(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
          map:map,
          position:place.geometry.location
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


 //------------------------------------------------------------------------------------------------------------------------------------//

 // work with allResponses array to get the 3 responses


 //push data to our restaurant table to create our own API //

function log(str){
 document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('['+new Date().getTime()+']\n'+str+'\n\n'));
}

//clear localStorage and take back to front page.....
