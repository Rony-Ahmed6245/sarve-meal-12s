const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB code
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.eehyjj4.mongodb.net/?retryWrites=true&w=majority`;

async function run() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server
    // await client.connect();
    console.log('Connected to MongoDB');

    // Define routes after the MongoDB client is connected
    const checkoutCollection = client.db("mealsDB").collection("checkout");
    const mealsCollection = client.db("mealsDB").collection("meals");

    app.get("/v1/paymentCard", async (req, res) => {
      try {
        const result = await checkoutCollection.find().toArray();
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error('Error in /v1/paymentCard route:', error);
        res.status(500).send('Internal Server Error');
      }
    });


    app.post("/v1/meals", async (req, res) => {
      const meal = req.body;
      //   console.log(user);
      const result = await mealsCollection.insertOne(meal);
      console.log(result);
      res.send(result);
    });










    
    // Listen on the specified port
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    // console.log('Disconnected from MongoDB');
  }
}
app.get("/", (req, res) => {
    res.send("Crud is running...");
  });
// Start the application
run().catch(console.dir);
