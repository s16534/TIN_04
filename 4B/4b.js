const express = require('express');
const app = express();
const hostname = "127.0.0.1";
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false } );
app.use(express.static('public'));

app.get('/hello',(req,res) => {
    res.send('Hello world!')
});

app.get('/form', (req, res) => {
	res.render('form');					  
});

app.post('/formdata', (req, res) => {
    res.render('formdata',{
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      age:req.body.age,
    });
});

app.post('/jsondata', (req, res) => {
    res.render('formdata',{
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      age:req.body.age,
    });
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`Server running at http://${hostname}:${port}/hello`);
  console.log(`Server running at http://${hostname}:${port}/form`);
  console.log(`Server running at http://${hostname}:${port}/formdata`);
  console.log(`Server running at http://${hostname}:${port}/jsondata`);
})