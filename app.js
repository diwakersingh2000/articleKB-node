var express = require('express');
var app = express();
var Article = require('./models/Article');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(express.static('./public'));

mongoose.connect('mongodb://localhost/nodekb');
var db = mongoose.connection;

db.on('error',function(err){
  console.log(err);
});

db.once('open',function(){
  console.log("connected to db");
});

// set view engine
app.set('view engine', 'ejs');

// home route
app.get('/',function(req,res){
  Article.find({},function(err,articles){
    if(err){
      console.log(err);
    }
    res.render('index',{articles:articles});
  });
});

// add article
app.get('/article/add',function(req,res){
  res.render('add_article');
});

// post article
app.post('/article/add',function(req,res){
  var article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  article.save(function(err){
    if(err){
      console.log(err);
      return;
    }
    res.redirect('/');
  });
});

// single article
app.get('/article/:id',function(req,res){
  Article.findById(req.params.id,function(err,article){
    if (err){
      console.log(err);
      return;
    }
    res.render('article',{article:article});
  });
});

// get edit article form
app.get('/article/edit/:id',function(req,res){
  Article.findById(req.params.id,function(err,article){
    if (err){
      console.log(err);
      return;
    }
    res.render('edit_article',{article:article});
  });
});

// edit article
app.post('/article/edit/:id',function(req,res){
  var article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  var query = {_id:req.params.id};

  Article.update(query, article,function(err){
    if(err){
      console.log(err);
      return;
    }
    res.redirect('/');
  });
});

// delete article
app.delete('/article/:id',function(req,res){
  var query ={_id:req.params.id};
  Article.remove(query,function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  })
})

// listen
app.listen(3000,function(){
  console.log("Listening on port 3000");
});
