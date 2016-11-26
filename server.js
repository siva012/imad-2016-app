var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'siva012',
    database: 'siva012',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


var articles = {
  'register':{
      title : 'Register' ,
      content : `<form class="ui form">
                      <div class="field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name">
                      </div>
                      <div class="field">
                        <label>Last Name</label>
                        <input type="text" name="last-name" placeholder="Last Name">
                      </div>
                      <div class="field">
                        <div class="ui checkbox">
                          <input type="checkbox" tabindex="0" class="hidden">
                          <label>I agree to the Terms and Conditions</label>
                        </div>
                      </div>
                      <button class="ui button" type="submit">Submit</button>
                </form>`
  },
  'signin':{
      title : 'Sign-in' ,
      content : `<p>This is a demo article
                 </p>`
      
  },
  'about':{
      title : 'About' ,
      content : `<div>
                    <h2 style="text-align: center; font-wight: bold; font-size: 250%;"><u>About Developer</u></h2>
                    <p>
                    This webapp was developed by Sivaram J, a student in Hindustan University.He is currently doing his 3rd year in Computer Science and Engineering.He is interested in programming and web development but spends most of his time playing Counter Strike:Global Offensive an online multiplayer game. He also watches a lot of animes and his favourites are One Piece , Dragon Ball series, Naruto. He aims on becomming a full stack developer and a professional gamer. 
                    </p>`
      
  }
    
};

function createTemplate(data){
    var title = data.title;
    var content = data.content;
    
    var htmlContent= `<html>
                        <head>
                            <title>${title}</title>
                            <link href="/ui/style.css" rel="stylesheet" />
                            <link href="/ui/semantic.css" rel="stylesheet" />
                            <script type="javascript" src="/ui/semantic.js">
                            </script>
                        </head>
                        <body>
                            ${content}
                        </body>
                    </html>`;
                return htmlContent;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db',function (req, res){
    pool.query('SELECT * FROM login',function (err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else
            res.send(JSON.stringyfy(result));
    });
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
