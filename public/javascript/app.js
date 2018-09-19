$(document).ready(function() {
    $(".scrape-btn").click(function(event) {
        event.preventDefault();
        console.log("it's working");
        $.ajax({
            type: "GET",
            url: "/scrape"
        }).then(function(data) {
            console.log(data);
            window.location.replace("/");
        });
    });

    $(".delete-btn").click(function(event) {
        event.preventDefault();
        $.ajax({
            type: "DELETE",
            url: "/api/articles/"
        }).then(function(data) {
            window.location.replace("/")
        });
    });
}) ;