$("#buttonReview").off().on("click", function (event) {

    event.preventDefault();

    //get values from survey handlebars
    //store in a variable object and push to answersarray 
    var locationArr = location.pathname.split("/");
    var id = locationArr[2];
    var rev1 = $("#r1").val();
    var rev2 = $("#r2").val();
    var appComment =$("#app-comments").val();
    var restComment =$("#restaurant-comments").val();


    var experience = { app_rank: rev1, app_comments:appComment, restaurant_rank: rev2, restaurant_review:restComment, RestaurantId:id }
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