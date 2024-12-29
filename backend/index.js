const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
// import express from 'express';
// import bodyParser from 'body-parser';

// import dotenv from 'dotenv';  

mongoose.connect("mongodb+srv://passOP:qwer@tyui@cluster0.h87r3.mongodb.net/passOP?retryWrites=true&w=majority&appName=Cluster0")

require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it is working



const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOP';



const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(cors({
    origin: ["https://backend-me-bhi-npm-i-karna-hai.vercel.app/"],
    methods: ["GET", "POST", "DELETE"],
    credentials : true
}))

 client.connect();


// Get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();

    res.json(findResult)
})

//Save a password
app.post('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true,result:findResult})
})

// Delete the password
app.delete('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true,result:findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})