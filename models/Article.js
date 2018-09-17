const mongoose = require ("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new user Schema object
const ArticleSchema = new Schema({
    title: {
        type:String,
        require:true
    },
    link: {
        type: String,
        require: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// export the article model
module.exports = Article;