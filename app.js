const express = require('express');
const chalk = require('chalk'); // for debugging, changes colour
const path = require('path');
var app = new express();    //creating new instance of express, can use express only if new instance is created. (oop)
const booksrouter = express.Router();
const author_r= express.Router();
app.use(express.static(path.join(__dirname,'/public'))); // local styling without using cdn, says node to acess public folder . __dirname is current directory.
app.use('/books',booksrouter);
app.use('/authors',author_r);
app.set('views','./src/newview');
app.set('view engine','ejs');
booksrouter.route('/')
    .get((req,res) =>{
        res.render('books',{title:'library',
        list:['book1','book2','book3'],
        nav:[
            {link:'/books',title:'Books'},
            {link:'/authors',title:'Authors'},
            {link:'/contacts',title:'Contacts'},
            {link:'/aboutus',title:'About Us'}
        ],
    books:[{name:'book1',
            author:'author1'},
            {name:'book2',
             author:'author2'},
            {name:'book3',
            author:'author3'}]});
    });
booksrouter.route('/single')
    .get((req,res) =>{
        res.send('Hello single Books');
    });
author_r.route('/')
    .get((req,res) =>{
        res.send('Author');
    });
author_r.route('/single')
    .get((req,res) =>{
        res.send('single Author')
    });
app.get('/',function(req,res){
    res.render('index',{title:'library',
                        list:['book1','book2','book3'],
                        nav:[
                            {link:'/books',title:'Books'},
                            {link:'/authors',title:'Authors'},
                            {link:'/contacts',title:'Contacts'},
                            {link:'/aboutus',title:'About Us'}
                        ]}
                    );
});
                                                        //app.get('/',function(req,res){
                                                            //res.sendFile(path.join(__dirname,'views/index.html')); 
                                                            //res.sendFile //displays a external file and res.send displays a message.
                                                            //}); // path.join joins directories.


app.listen(3000,function(){         // function is optional, just to indicate server is running
    console.log('Listening on port: '+chalk.yellow('3000'));
});