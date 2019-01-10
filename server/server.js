
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());


app.get('/', (req,res) => {
	res.sendFile("static/index.html");
});

app.post('/api/records', (req,res) => {

    const newRecord = req.body;
	const collection = db.collection('speed_records');
	let theID = null;
	collection.insertOne(newRecord).then(result =>
		{
			// console.log(newRecord);
			let mysort = { time: 1 };	
			theID = newRecord._id;
			console.log(theID);
			return records = collection.find().sort(mysort).toArray();
		})
	   .then( (records) => {
		   let index = 0;
		   let length = records.length;
		   for( index; index < length; index++) {
			   if ( records[index]._id.equals(newRecord._id)) { 
			     break;
			   }	   
		   }
		   let response = JSON.stringify({ _id: newRecord._id, time: newRecord.time, position: index + 1, length: length });
		   res.json(response);
		})
	   .catch( error => {
			   console.log(error);
			   res.status(500).json({message: `Internal Server Error: ${error}`});
		});
}); 
 

let db;

MongoClient.connect('mongodb://localhost', function(err, client) {
					  assert.equal(null, err);
					  console.log("Connected successfully to DataBase Server");
					  db = client.db('test');
					  app.listen(8080, () => {
		              console.log("Server started on port 8080");
					  });
			}
	);