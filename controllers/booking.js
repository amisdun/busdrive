const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const db = require("../db_connection/mongoose_db") 
require("../index")