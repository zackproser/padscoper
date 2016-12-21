# PadScoper

![PadScoper Preview](/public/images/padscoper-splash.png)

## Overview 
[PadScoper](https://padscoper.herokuapp.com) is a node.js app leveraging the [Express framework](https://expressjs.com/) that allows users to look up properties within 20 miles of an address they supply when searching. 

A demo instance of this application is [running here](https://padscoper.herokuapp.com).

## Requirements
* nodejs
* connectivity to the public internet (so that API calls to Google services can work)
* no persistence layer (for brevity, this app mocks out a database access module)

## Getting Started 
1. $ git clone https://zackproser@bitbucket.org/zackproser/padscoper.git
2. $ cd padscoper
3. $ npm i 
4. $ ./runTests.sh
5. $ ./startApp.sh


## Test and Startup Scripts
For convenience, there are two utility bash scripts in the root of the project for running tests and starting the app. Note that the startApp.sh script will run the app in the background, so when you are finished be sure to 

```bash
$ ps -ef | grep node
501 40917     1   0  4:56PM ??         0:00.32 node ./bin/www
501 40941 40923   0  4:56PM ttys003    0:00.00 grep node
```
and then 

```bash
$ kill 40917
```

in order to ensure the app is shutdown when you are finished using it.

## Main Modules

### Database
Database is a mock database access module that contains the properties included in this exercise.It allows you to query for all properties and retrieve the result set as valid JSON. 

### Geocoder
Geocoder is the internal Geocoding module that will determine the distance between two latitude and longitude coordinate pairs. This is handy for using to filter result sets retrieved from the database or external network services

### REST Helper
This helper module takes care of some common service tasks such as ensuring that an inbound request is properly formed and contains all required information. It also exposes methods for building uniform API responses and returning API errors, so that project developers can focus on adding more business logic consumers can more easily script against the PadScoper API. 

## App Frontend 
PadScoper features a simple and clean UI so that users can easily submit searches. The main logic for the UI is contained in /public/javascripts/padscoper.js. 

This is also the file that instantiates the [Google Maps API Geocoder service](https://developers.google.com/maps/documentation/javascript/geocoding) with the project's API key. When a user submits a string address to run a search against, padscoper.js hands the address off to Google's Geocoder and uses the returned coordinates object to run an ajax search against the PadScraper backend. 