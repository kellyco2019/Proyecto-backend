const express = require ("express");
const bodyParser = require ("body-parser");
const cors = require ("cors");

const model = require("./model"); 

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

//## Endpoints

//### GET channel messages (primer nodo)  

//- GET /api/channel/:channelId
 // - { messages }

app.get("/api/channel/", (req,res) => {
    messages.getAllMessages();
    res.json({});
});


//- POST /api/user/create

//### POST message to a channel (segundo nodo)
//- POST /api/channel/:channelId
// - send JSON
//   - { user, body }

//app.post("/api/channel/:channelId", (req,res) => {
//    res.json({});
//});

//### Login

//- GET /api/login/

//### create user (tambien se puede) (formulario de registro)




app.listen(3000, () => 
console.log("Listening on port 3000")
) 