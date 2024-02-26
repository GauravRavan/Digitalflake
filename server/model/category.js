const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categoryId:String,
    categoryName:String,
    categoryDescription:String,
    categoryStatus:String
})

const CategoryModel = mongoose.model("category", CategorySchema)

module.exports = CategoryModel;