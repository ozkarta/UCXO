var express = require('express');
var router = express.Router();
var sql=require('mssql');
var unicodeObject=require('../objects/unicodeTransformer.JS');

var dbConnector=function(sql){
	this.sql=sql;
	this.connectionJson={
		user:'node.js',
		password:'12qwert12',
		server:'78.139.172.254',
		database:'Ucxo',
		options: {
        	encrypt: true // Use this if you're on Windows Azure 
    	}
	};


	dbConnector.prototype.getTranslation=function(search,callback){

				var connection = new this.sql.Connection(this.connectionJson, function(err) {
			    // ... error checks 
			    //console.log(err.toString());
			    // Query 
			    
			    var request = new sql.Request(connection); // or: var request = connection.request(); 
			    request.query('select TOP 5 * from libraryTable where original like N\''+search+'%\' order by original asc',function(err, recordset){
			        	//console.dir(recordset);
			        	callback(recordset);
			    	});
			    
			 
				});
		}
}
var unicodeTransformer=new unicodeObject.unicodeTransformer();
unicodeTransformer.init();
//unicodeTransformer.translateToLatin('ოზკარტა');
//unicodeTransformer.translateToGeo('ozkarta');

var db=new dbConnector(sql);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/search',function(req,res,next){

	//console.dir(req.query.Q);
	;
	console.log('responsed :)))');
	
	db.getTranslation(unicodeTransformer.translateToGeo(req.query.Q),function(recordset){
		transformRecordSet(recordset,function(transformedRecordSet){
			res.writeHead(200, {"Content-Type": "text/plain"});
			console.log(JSON.stringify(transformedRecordSet));
			res.end(JSON.stringify(transformedRecordSet));
		})
	});
	

});

var transformRecordSet=function(recordset,callback){
	var transformedRecordSet;

	console.dir(recordset);
	console.log('length is  ....');
	console.log(recordset.length);
	for(var i=0;i<recordset.length;i++){
		console.log(i);
		recordset[i].original=unicodeTransformer.translateToLatin(recordset[i].original);
		recordset[i].translated=unicodeTransformer.translateToLatin(recordset[i].translated);
	}
	console.dir(recordset);
	callback(recordset)
}



module.exports = router;
