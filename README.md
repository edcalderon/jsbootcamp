#  simple-rest-server
This is a very simple rest API built on top of [expressjs](https://expressjs.com/) to store information in one collection. The data is stored in memory using [lokijs](http://lokijs.org) package.


# Runing the server
You will need nodejs and npm to be installed on your system.

## Install dependencies

    $ npm install

## Execute the server

    $ node index.js
   After this the server will be listening in the next url: 
   [http://localhost:5000](http://localhost:5000)

# URLS
The server provides an empty HTML file in the root of the site and a "parking" resource where you can **Create**, **Retrieve**, **Update** and **Delete** vehicles.

## Root (GET /)
[http://localhost:5000](http://localhost:5000)
For the root route, the server renders the index.html found in public directory.
This file works as an entry point for your homework, you can write your HTML in this file and link your libraries, js, and css.

## Get all vehicles (GET /parking)
[http://localhost:5000/parking](http://localhost:5000/parking)
This endpoint returns all the vehicles in the parking lot.

## Get one vehicle (GET /parking/:id)
[http://localhost:5000/parking/1](http://localhost:5000/parking/1)
This endpoint returns one vehicle by its Id.

## Create vehicle (POST /parking)
[http://localhost:5000/parking](http://localhost:5000/parking)
This endpoint stores a vehicle in the collection, remember that the DB is schema-less so you wherever valid JSON you sent it will be stored.

## Update vehicle (PUT /parking/:id)
[http://localhost:5000/parking/1](http://localhost:5000/parking/1)
This endpoint updates an existing vehicle.

## Remove vehicle (DELETE /parking/:id)
[http://localhost:5000/parking/1](http://localhost:5000/parking/1)
This endpoint removes a vehicle from the database.

# Postman
Inside the postman folder, you will find a postman collection that you could use as an example to test the server.



