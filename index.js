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
  let inputDate = req.params.date;
  let isValidDate = Date.parse(inputDate); 
  let isValidUnixNumber = /^[0-9]+$/.test(inputDate)
  let isEmpty = inputDate == "" || inputDate == null;

  let unixOutput = 0;
  let utcOutput  = "";

  if (isValidDate) {
    unixOutput = new Date(inputDate);
    utcOutput  = unixOutput.toUTCString();
    return res.json({unix : unixOutput.valueOf(), utc : utcOutput});
  }
  else if (isNaN(isValidDate) && isValidUnixNumber) {
    unixOutput = new Date(parseInt(inputDate));
    utcOutput  = unixOutput.toUTCString();
    return res.json({unix : unixOutput.valueOf(), utc : utcOutput});
  }
  else if (isEmpty) {
    unixOutput = new Date();
    utcOutput  = unixOutput.toUTCString();
    return res.json({unix : unixOutput.valueOf(), utc : utcOutput});  
  }
  else {
    res.json({error: "Invalid Date"});
  }
  
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
