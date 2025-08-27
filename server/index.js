import express from 'express';
const app=express();
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import routeIndex from './routes/index.js';
import mongoose from 'mongoose';


const server=http.createServer(app);

/* middleware */
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', routeIndex);



server.listen(5000);
server.on('listening', onListening);
server.on('error', onError);

function onListening(){
    console.log("Server is Listening");
    let db=mongoose.connect('mongodb://127.0.0.1/stockDB' );
}

function onError(){
    console.log("error happened in server connection");
}

mongoose.connection.on('open', function(err){
    if(err){
        console.log('error happened in mongoose connection open', err);
    } else {
        console.log('mongoose connection set up successfully');
    }
})


mongoose.connection.on('error', function(err){
    console.log('error occurred in mongoose connection');
})
