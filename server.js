//import
import express from 'express';
import {user,home,interests} from './db.js';
import routermain from './router/routermain.js'
import { logreq,error } from './middleware/middleware.js';
import fs from 'fs';
import { title } from 'process';


//setup
const PORT = 3000;
const app = express();


//viewengine creation
app.engine("cat", function (filePath,options, callback ){
fs.readFile(filePath, function(err, content){
    if(err) return callback(err);


    //rendering variables to store
    const rendered = content
    .toString()
    .replaceAll("#title#",options.title)
    .replace('#content#',options.content);

    return callback(null, rendered);
})
});


//viewengine setup
app.set('views','./view')   //view to be plural in the first one
app.set('view engine', 'cat')
app.use(express.static('./styles'));   //used for searching and connecting static files(e.g styles.css or any file connected to index.cat)


//middleware
app.use(logreq)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rotues
app.get('/home', function(req,res){
   res.render('index', {title: 'falah', content: "you cant see me"}) 
})
app.use("/",routermain);


//global error handling
app.use(error)


//listenr
app.listen(PORT, () => {
    console.log("server runs");
})