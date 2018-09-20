const db = require ("../models");

module.exports = function (app) {

    app.get("/api/articles",  function(req, res) {
        db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.get("/api/articles/:id",  function(req, res) {
        db.Article.findOne({__id: req.params.id})
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post("/api/articles/:id",  function(req, res) {
        db.Note.create(req.body)
          .then(function(dbNote) {
              return db.Article.findOneAndUpdate({ _id: req.params.id}, { note: dbNote._id}, { new: true }); 
          })
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
              res.json(err);
          });
    });


// Save an article
app.post("/api/articles/saved/:id", function(req, res) {
    // find the article id  and update it saved to true so it will render to saved page
    db.Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true})

    .then(function(dbSavedArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

    app.delete("/api/articles/", function(req, res) {
        db.Article.deleteMany({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
        
      });
};