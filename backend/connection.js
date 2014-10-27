exports.dbUrl = 'mongodb://localhost:27017/myproject';

var MongoClient = require('mongodb').MongoClient
, assert = require('assert')
, ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/myproject';

var searchDocument = function(db, collection, params, cb, callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Insert some documents
  //try to string
 collection.find({content: { $regex: params.word } , author: params.author}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.dir(docs);
    callback(docs);
    cb(null, docs);
  });     
};

var updateDocument = function(db, collection, article, cb, callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  collection.update({ _id:  ObjectID(article.id) }
    , { $set: { title : article.title,
                content : article.content,
                author : article.author,
                date : article.date
              } }, function(err, result) {
    assert.equal(err, null);
    callback(result);
    console.log(result);
    cb(null, result);
  });  
};

var removeDocument = function(db, collection, id, cb, callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Insert some documents
  //try to string
  console.log(id);
  collection.remove({ _id:  ObjectID(id) }, function(err, result) {
    assert.equal(err, null);
    callback(result);
    console.log(result);
    cb(null, result);
  });    
};

var findDocuments = function(db, collection, params, cb, callback) {
  // Get the documents collection
  var collection = db.collection(collection);
  // Insert some documents
  collection.find({author: params.author}).limit(parseInt(params.limit)).skip(parseInt(params.page)).toArray(function(err, docs) {
    assert.equal(err, null);
    console.dir(docs);
    callback(docs);
    cb(null, docs);
  });      
};

var insertDocuments = function(db, collection, article, cb, callback) {
    // Get the documents collection
  var collection = db.collection(collection);
  // Insert some documents
  collection.insert([
    article
  ], function(err, result) {
    assert.equal(err, null);
    console.log('first');
    callback(result);
    cb(null, result);
  });
};

exports.create = function(collection, article, cb){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    insertDocuments(db, collection, article, cb, function() {
      db.close();
    });
  });
};

exports.index = function(collection, params, cb){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    findDocuments(db, collection, params, cb, function(result) {
      db.close();
    });
  });
};

exports.delete = function(collection, id, cb){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    removeDocument(db, collection, id, cb, function() {
      db.close();
    });
  });
};

exports.update = function(collection, article, cb){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    updateDocument(db, collection, article, cb, function() {
      db.close();
    });
  });
};

exports.search = function(collection, params, cb){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    searchDocument(db, collection, params, cb, function() {
      db.close();
    });
  });
};