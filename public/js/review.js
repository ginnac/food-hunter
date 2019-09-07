$("#buttonReview").off().on("click", function (event) {

    event.preventDefault();

    //get values from survey handlebars
    //store in a variable object and push to answersarray 
    var locationArr = location.pathname.split("/");
    var id = locationArr[2];
    var rev1 = $("#r1").val();
    var rev2 = $("#r2").val();
    
    var experience = { app_review: rev1, app_restaurant: rev2 }
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        url: "/api/review/" + id,
        data: JSON.stringify(experience)
    })
        .then(function () {
            window.location.href = "/";
        });

});