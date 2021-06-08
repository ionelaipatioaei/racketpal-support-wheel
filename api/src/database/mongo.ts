import { MongoClient, Db } from "mongodb";

const HOST = process.env.MONGO_HOST;
const PORT = parseInt(process.env.MONGO_PORT as string);
const DB = process.env.MONGO_DB;
const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;
const CONN_URL = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/${DB}`;

let client: Db;

const test = () => MongoClient.connect(CONN_URL, { useUnifiedTopology: true }, (error, mongoClient) => {
  if (!error) {
    console.log(`MongoDB connected on ${HOST}:${PORT}, now using "${DB}" database.`);
    client = mongoClient.db(DB);

    const names = [
      "Ansh Perez", "Adrienne Villanueva", "Adeeb Tierney", "Rihanna Barker", "Rayhan Macgregor",
      "Inara Dupont", "Nabilah Barron", "Kaan Andrew", "Armaan Mcdonald", "Michelle Sawyer"
    ];

    const collection = client.collection("engineers");
    collection.countDocuments({}).then(count => {
      if (count == 0) {
        collection.insertMany(names.map(name => ({ name })), (error, result) => {
          if (!error && result) {
            console.log("Engineers added successfully!");
          } else {
            console.log(error);
          }
        });
      }
    }).catch(error => {
      console.log(error);
    });
  } else {
    console.log(error);
  }
});

export { client, test };