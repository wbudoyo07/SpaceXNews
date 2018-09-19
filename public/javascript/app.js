$(document).ready(function() {
    $(".scrape-btn").click(function(event) {
        event.preventDefault();
        console.log("it's working");
        $.ajax({
            type: "GET",
            url: "/scrape"
        }).then(function(data) {
            console.log(data);
            window.location.reload();
        });
    });
}) ;