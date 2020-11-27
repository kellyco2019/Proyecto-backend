const express = require ("express");
const bodyParser = require ("body-parser");
const cors = require ("cors");

const mongoose = require ("mongoose");
const { response } = require("express");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/chat', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => {
    console.log (`MONGOOSE ERROR: ${error}`);
    });

const MessageSchema = mongoose.Schema({
    channel: String,
    text: String,
    user: String, 
    timestamp: { 
        type: Date,
        default: new Date() 
    },
}); 

const MessageModel= mongoose.model("Message", MessageSchema);

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json()); 

//## Endpoints

//### GET channel messages (primer nodo)  

//- GET /api/channel/:channelId
 // - { messages }

app.get("/channel/:id", (req,res) => {
    const { id } = req.params; 

    MessageModel.find({channel : id})
    .then((messages) => {
    res.status(200).json({ messages });
    })
    .catch((error) => {
    res.status(500).json({ error });
});
});

//- POST /api/user/create

app.post("/channel/:id", (req,res) => {
    const { id } = req.params; 
    const { text , user } = req.body;
 
    if (text && user) {
        MessageModel.create({user , text , channel: id})
        .then((result) => {
        res.status(200).json({result});
    })
        .catch((error) => {
        res.status(500).json({error});
    });
    } else {
        res.status(400).json({error : "missing some parameters"});
    }
    res.send("ok post channel by id");
});

app.listen(port, () => {
console.log(`Listening on port ${port}`)
});