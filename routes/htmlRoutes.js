const db = require ("../models");

module.exports = function (app) {

    app.get("/", function(req, res) {
        res.render("home", {
            titlePage: "Home",
            javascript: "app.js",
            css: "style.css"
        });
    });
};