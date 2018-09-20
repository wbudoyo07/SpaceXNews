const db = require ("../models");
// scrapping tools
const cheerio = require("cheerio");
const request = require("request");

module.exports = function (app) {

    // The home page
    app.get("/", function(req, res) {
        // render all the scrape datas
        db.Article.find({saved:false}).then(function(database) {
            res.render("home", {
                titlePage: "Home",
                javascript: "app.js",
                css: "style.css",
                dbArticle: database
            });
        });
    });

    // The saved page only render the saved articles
    app.get("/saved", function(req, res) {
        db.Article.find({saved:true})
        .populate("note")
        .then(function(database) {
            res.render("saved-articles", {
                titlePage: "Saved-Articles",
                dbArticle :database
            });
        });
    });

    app.get("/scrape", function(req,res) {
        request("https://www.spacex.com/news",function(error,response, html) {
    
            const $ =  cheerio.load(html);
        
            $("h2.title").each(function(i, element) {
                let result = {};
        
                result.title = $(this).text();
                result.link = $(this).children().attr("href");
                
                console.log("not in data base" +result);
                // push the result object to Article collection
                db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err);
                });
            });
            res.send("scrape DONE");
            });
            
    });
};




