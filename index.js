const express = require('express');
const app = express();


app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('assets'));

app.get('/', function(req,res){
    return res.render('app.ejs');
});

app.listen('5050', function(req,res,err){
    if(err){
        console.log("Error in running server");
    }
    console.log("server running");
});

