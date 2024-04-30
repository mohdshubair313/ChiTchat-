const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const chat = require("./models/chat.js")
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

let chat1 = new chat({
    from:"shubair",
    to:"zaman",
    msg:"Hi there I am shubair",
    createdAt: new Date()
})

chat1.save().then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

app.get("/",(req,res) => {
    res.render("slash.ejs");
});

// chats route to show all the chats in this route
app.get("/chats",async (req,res) => {
    let chats = await chat.find();
    res.render("index.ejs",{chats});
});

// Create the new route which is for to get the page to create the new post  
app.get("/chats/new", (req,res) => {
    res.render("newRoute.ejs");
});

//Create a route which is insert the data in the database of monogDb which you entered and redirects you in chats /route
app.post("/chats",(req,res) => {
    let {from,to,msg} = req.body;
    let newChat = new chat ({
        from:from,
        to:to,
        msg:msg,
        createdAt: new Date(),
    });
    newChat.save()
    .then((res) => {
        console.log("succesfully saved");
    })
    .catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
});

// Creating a route to edit the chat by the user or (sender)...
app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chatRecord = await chat.findById(id);
    res.render("edit.ejs",{chat:chatRecord});
});


//create a new route which is update the chat msg and redirect to the chats route....
app.put("/chats/:id",async (req,res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let UpdatedMsg = await chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true,new:true},
    );
    res.redirect("/chats");
})

//Create a route to delete the user chat 
app.delete("/chats/:id",async (req,res) => {
    let {id} = req.params;
    let deletedchat = await chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
});


app.listen(8080,(req,res) => {
    console.log("app is working...");
});

main().
then(() => {
    console.log("connection build successfully");
})
.catch((err) => console.log(err) );

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chiTchat');
}

