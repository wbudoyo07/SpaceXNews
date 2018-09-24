$(document).ready(function() {

    $(".show-modal").click(function(event) {
        event.preventDefault();
        $.ajax({
            type:"GET",
            url: "api/articles/notes"
        })
    });

    $(".save-notes").click(function(event) {
        event.preventDefault();
        let thisId = $(this).attr("data-id");
        let notes = "#notes-text-"+thisId;
        notes = $(notes).val();
        console.log("this is text:"+notes);
        console.log("This id :"+thisId);

        $.ajax({
            type:"POST",
            url:"/api/articles/notes/"+thisId,
            data: {
                body: notes
            }
        }).then(function(data) {
            console.log(data);
            window.location.reload();
        });
    });

    // delete one articles
    $(".delete-articles").click(function(event) {
        event.preventDefault();
        let thisId = $(this).attr("data-id");
        $.ajax({
            type: "DELETE",
            url: "/api/articles/"+thisId
        }).then(function(data) {
            window.location.reload();
        });
    });
})
