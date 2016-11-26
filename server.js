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
      title : 'One' ,
      content : `<p>This is a demo article
                 </p>`
  },
  'article-two':{
      title : 'two' ,
      content : `<p>This is a demo article
                 </p>`
      
  },
  'article-three':{
      title : 'three' ,
      content : `<p>This is a demo article
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
