const mongoose = require('mongoose')

exports.getErrorMessage = (err) => {
    if (err instanceof mongoose.MongooseError) {
        return Object.values(err.errors)[0]
    } else if (err instanceof Error) {
        return err.message
    } else if (err instanceof mongoose.TypeError) {
        return err.message
    }
    
}