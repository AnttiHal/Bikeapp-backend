import Journey from './models/journey.mjs'
import Station from './models/station.mjs'
import { parse } from 'fast-csv'// parses CSV files
import * as fs from 'fs'
import * as path from 'path'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { fileURLToPath } from 'url';
config();

const main = async () => {
  const journeys = []
const stations = []
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
  // connect to database
  const mongoDB = process.env.MONGO_URI;
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  //read csv-file
  
  const journeyHeaders = [
    'departure', 
    'return', 
    'departure_station_id', 
    'departure_station_name',
    'return_station_id',
    'return_station_name',
    'covered_distance_m',
    'duration_sec',]

  const stationHeaders = [
    'id',
    'nimi',
    'osoite',
    'x',
    'y'
  ]

  //read journeys
  
  fs.createReadStream(path.join(__dirname, '2021-07.csv'))
  .pipe(parse({ 
    delimiter: ',', 
    headers: [ 
      'departure', 
      'return', 
      'departure_station_id', 
      'departure_station_name',
      'return_station_id',
      'return_station_name',
      'covered_distance_m',
      'duration_sec',
    ], 
    renameHeaders: true 
  }))
  .validate(data => data.covered_distance_m > 10 && data.duration_sec >10)
  .on('error', error => console.error(error))
  .on('data', (data) => {
  data['id'] = new mongoose.Types.ObjectId();
  journeys.push(data);
  })
  .on('end', () => {
  // insert journeys into db
  Journey.insertMany(journeys, (err, documents) => {
  if (err) {
  console.log(err);
  }
  });
  console.log(`${journeys.length} journeys have been successfully uploaded.`);
  return;
  });     
  
  // read stations
  /*fs.createReadStream(path.join(__dirname, 'stations.csv'))
  .pipe(csv.parse({ 
    delimiter: ';', 
    headers: [ 
      'id', 
      'name', 
      'address',
      'x', 
      'y',
    ], 
    renameHeaders: true 
  }))
  .on('error', error => console.error(error))
  .on('data', (data) => {
  data['id'] = new mongoose.Types.ObjectId();
  stations.push(data);
  })
  .on('end', () => {
  // insert journeys into db
  Station.insertMany(stations, (err, documents) => {
  if (err) {
  console.log(err);
  }
  });
  console.log(`${stations.length} stations have been successfully uploaded.`);
  return;
  });    */ 
}



main().catch((error) => {
  console.error(error);
  process.exit();
});


