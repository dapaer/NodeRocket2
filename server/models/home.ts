import schemaHelper from "../sys/util/schemaHelper";

var mongoose = require("mongoose");
var Schema = mongoose.Schema,ObjectId = Schema.ObjectId

const homeSchema =schemaHelper.initSchema({
    name:  String,
    content:   String,
    num:Number,
    create_time: { type: Date, default: Date.now }
});

export default schemaHelper.model('Home', homeSchema); 