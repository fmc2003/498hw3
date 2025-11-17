const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
const Throttle = require('throttle');

const app = express();
const PORT = 3221;
const BANDWIDTH = 100000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const filePath = path.join(__dirname, '102925-2.pdf');

app.get("/", (req,res) =>{
    //res.send("Hello World");
    res.render('home');
});

app.get("/smallFile", (req,res) =>{
    const stats = fs.statSync(filePath);
    const filesize=stats.size;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', filesize);
    res.setHeader('Content-Disposition', 'attachment; filename="102925-2.pdf"')
    //basic send file
    res.sendFile(filePath);
});

app.get("/bigFile", (req,res) =>{
    const stats = fs.statSync(filePath);
    const filesize=stats.size;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', filesize);
    res.setHeader('Content-Disposition', 'attachment; filename="102925-2.pdf"')
    const fileStream = fs.createReadStream(filePath);
    //limit bandwidth
    const throttle = new Throttle(BANDWIDTH);
    //basic send file
    fileStream.pipe(throttle).pipe(res);
    
});
app.listen(PORT, ()=>{
    console.log(`Server running ${PORT}`);
});
