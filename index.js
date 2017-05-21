const express = require('express')
const app = express()

app.use(express.static('public'))
app.listen(3000, () => console.log('Server running on port 3000'))

log("REDDIT GIFRECIPES NODE APP RUNNING!!!!!!!!!!!!!!!!!");

fs = require('fs')
fs.readFile('pyScraper/data/redditDataRAW.txt', 'utf8', function (err,data) {
  if (err) {
    return log(err);
  }
  log(data);
});


function log(message){
	var current_time = getCurrentDate();
	message += current_time;

	fs = require('fs')
	fs.appendFile('logs/indexlogs', message, function (err) {
  		if (err) throw err;
  		console.log('Saved!');
	});
}

function getCurrentDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	return today;
}