const db = require ("../models");
// scrapping tools
const cheerio = require("cheerio");
const request = require("request");

module.exports = function (app) {

    // scrape the data  when we open a home page 
    app.get("/", function(req, res) {
        db.Article.find({}).then(function(dbArticle) {
            res.render("home", {
                titlePage: "Home",
                javascript: "app.js",
                css: "style.css",
                dbArticle: dbArticle
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




