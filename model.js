const mongoose = require ("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/app', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (err) {
    if (err) {
        return console.error(err);
    }
});

const MessageSchema = mongoose.Schema({
    body: { type: String, required: true },
    date: Date,
    channel: String
}); 

const MessagesModel= mongoose.model("Message", MessageSchema);

//async function createMessage(message, callback) {
//    MessagesModel.create(message, function (err){
//        if (err) {
//            console.error(err);

//            return callback(err);
//        }
//        callback();
//    });
//}

 function getAllMessages() {
    return  MessagesModel.find({}, function (err , messages ) {
        if (err) {
            return console.error(err);
        }
        return messages;
    });
}

module.exports = {
    
    //createMessage,
    getAllMessages,
};


