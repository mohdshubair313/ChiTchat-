const mongoose = require('mongoose');
const chat = require("./models/chat.js")

main().
then(() => {
    console.log("connection build successfully");
})
.catch((err) => console.log(err) );

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chiTchat');
}

let allchats = [
{
    from:"shubair",
    to:"zaman",
    msg:"Hi there I am shubair",
    createdAt: new Date()
},
{
    from:"priya",
    to:"shub",
    msg:"Hi there I am priya",
    createdAt: new Date()
},
{
    from:"zaman",
    to:"Aman",
    msg:"Hi there I am zam",
    createdAt: new Date()
},
{
    from:"sami",
    to:"zaman",
    msg:"Hi there I am sami",
    createdAt: new Date()
},
{
    from:"Aman",
    to:"shubair",
    msg:"Hi there I am shubair",
    createdAt: new Date()
},
];

chat.insertMany(allchats);
