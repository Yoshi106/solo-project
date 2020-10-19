const express = require("express");


const app = express();

app.use(express.static("./"));

app.get('/hello', (_, res) =>{
    res.send("Hello")
});

app.listen(5000, () => {
    console.log("litening @ 5000");
})