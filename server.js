var express = require('express');
var app = express();

var mongo = require('mongodb');
var fs = require('fs');
var db = mongo.Db,
MongoClient = mongo.MongoClient,
Server = mongo.Server,
ReplSetServers = mongo.ReplSetServers,
ObjectID = mongo.ObjectID,
Binary = mongo.Binary,
GridStore = mongo.GridStore,
Grid = mongo.Grid,
Code = mongo.Code,
assert = require('assert');
var globalArray = [];
var i;

var db = new db('test6', new Server('localhost',27017));
var server = app.listen(3000, function() {
	//get file name
	for (i=0;i<10;i++) {
		var fileName = "0" + i.toString() + ".mp4";
		if (i < 10) {
			fileName = "0" + fileName;
		}
		fileName = './raw/' + fileName;
		console.log(fileName);
		db.open(function(err, db) {
		
			var fileID = new ObjectID();	
			var gridStore = new GridStore(db, fileID, 'w');
			var fileSize = fs.statSync(fileName).size;
			var data = fs.readFileSync(fileName);
			gridStore.open(function(err, gridStore) {
				
				gridStore.writeFile(fileName, function(err, doc) {

					GridStore.read(db, fileID, function(err, fileData) {
					
						console.log("written");
						console.log("fileID", fileID);
						db.close();

					});

				});

			});

		});
	}

});
