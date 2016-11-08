var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles = {
  'articles-one':{
      title : 'One' ,
      content : `<p>This is a demo article
                 </p>`
  },
  'artiles-two':{
      title : 'two' ,
      content : `<p>This is a demo article
                 </p>`
      
  },
  'articles-three':{
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

app.get('/:articleName', function (req, res) {
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
