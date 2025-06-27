import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get('/socks', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).toArray();
        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});



// Middleware to parse JSON bodies
app.use(express.json());


app.post('/socks/search', async (req, res) => {
    try {
        // TODO: Add code that can search MongoDB based on a color value
        // from the Search text box.
        const { searchTerm } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const regex = new RegExp(searchTerm, 'i')
        const socks = await collection.find({"sockDetails.color": regex}).toArray()
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    }
});

app.delete('/socks/:id', async (req, res) => {
    try {
        // TODO: Add code that delete a sock when its delete button is clicked.
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const { id } = req.params;
        const result = await collection.deleteOne({"_id": new ObjectId(id)});
        console.log("id:", id);
        console.log("results:", result);
        if (result.deletedCount === 1) {
            res.status(200).send('Sock deleted successfully');
        } else {
            res.status(404).send('Sock not found');
        }
        
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

app.post('/socks', async (req, res) => {
    try {
        // TODO: Add code that adds a sock when a new sock is posted using the
        // Add Sock form.
        const sock = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(sock);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
    }
});

app.get('/socks/:page/:limit', async (req, res) => {
    try {
        let { page, limit } = req.params;
        limit = +limit; // The + converts limit from a string to integer.
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).skip((page - 1) * limit).limit(limit).toArray();
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching socks');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});