const mongoose = require("mongoose");

let latestId =0;
const ProductSchema = new mongoose.Schema({
    id:{
       type:Number
       },
    name:{
        type:String,
    },
    packsize: {
        type: String,
       },
    category: {
        type: String,
        },
    mrp: {
        type: String,
       
    },
    status: {
        type: String,
        
    },
    productImage:{
        type:String
    }
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
