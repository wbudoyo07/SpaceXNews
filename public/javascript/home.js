$(document).ready(function() {
    // scrape information 
    $(".scrape-btn").click(function(event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "/scrape"
        }).then(function(data) {
            window.location.replace("/");
        });
    });

    // delete all collections/datas
    $(".delete-btn").click(function(event) {
        event.preventDefault();
        $.ajax({
            type: "DELETE",
            url: "/api/articles/"
        }).then(function(data) {
            window.location.replace("/")
        });
    });

    $(".saved-btn").click(function(event) {
        event.preventDefault();
        let thisId = $(this).attr("data-id");
        $.ajax({
            type:"POST",
            url: "/api/articles/saved/"+ thisId
        }).then(function(data) {
            window.location.replace("/");
        });
    });

}) ;