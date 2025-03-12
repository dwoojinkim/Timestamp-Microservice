// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {
  var inputDate = req.params.date;
  var date = new Date(Number(inputDate));

  var isValidDate = Date.parse(inputDate);

  console.log(isValidDate);
  if (isValidDate){
    date = new Date(Number(isValidDate));
  } else if (!isNaN(date.getTime())) {
    date = new Date(Number(inputDate));
  } else {
    date = new Date();
    inputDate = Math.floor(date.getTime() / 1000);
  }

  if(!isNaN(date.getTime()) || !isNaN(isValidDate.getTime())) {
    var utcDate = date.toUTCString();
    res.json({unix: inputDate, utc: utcDate});
  } else {
    res.json({error: "Invalid Date"});
  }
  
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
