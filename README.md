#  Bike App (react/node/mongo/express/GraphQL)

App is deployed in https://silent-night-7313.fly.dev/
## To run project locally

Clone project to your local machine. In the project directory, to start backend run:
### `npm install`
### `npm start`
Open another terminal window and start frontend:
### `cd bikeapp-frontend`
### `npm install`
### `npm start`
You also need a MongoDB cluster for running this app. You should create .env file and add following line:

`MONGO_URI=<your-database-cluster-address-here>`

## Uploading data
To upload needed data to database you need these datasets uploaded in root directory:

### Journeys 

* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

### Stations

* <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>

### To upload journeys 
Open file upload.js. Comment out lines 76-105. Change csv-filename on line 44 to match the file you want to upload. Run command `node upload.js`. You should do this three times (one for every journey dataset).

### To upload stations 
Open file upload.js. Comment out lines 42-75. Change csv-filename on line 77 to match the file you want to upload. Run command `node upload.js`.

## Technologies in use

React

NodeJS

GraphQL

Express

Apollo Server

MongoDB

GitHub Actions for deployment to production.

### Known issues
Reload in production version doesn't work properly. In dev it works normally. 