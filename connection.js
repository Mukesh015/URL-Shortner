const mongoose = require('mongoose')

async function connectToMngoDB(url){
    return mongoose.connect(url)
}
module.exports = {connectToMngoDB};