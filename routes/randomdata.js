var sqlmanager = require('./sqlmanager.js');

//sqlmanager.executeQuery("DELETE FROM fires;");

// Base query before data added
var query = "INSERT INTO fires (latitude, longitude, risk, time) VALUES (0, 0, 0, 0)";

var leftX =  -124.73364306703067;
var rightX = -117.01387927936528;
var topY = 48.91594067188171;
var bottomY = 45.54383071539715;

var rows = 40;
var cols = 80;

var incX = (rightX - leftX) / cols;
var incY = (topY - bottomY) / rows;

//console.log(incX);
//console.log(incY);

// Makes a bunch of points across times 0-100 (arbitrary test values)
for (var t = 0; t < 100; t++) {
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            var latitude = topY - (incY * y);
            var longitude = leftX + (incX * x);
            //console.log(longitude + ", " + latitude);
            fileOut = fileOut + "\n" + longitude + "," + latitude
            var risk = Math.random();
    
            // Append to the query
            query = query + ", (" + latitude + ", " + longitude + ", " + risk + ", " + t + ")";
        }
    }
}

query = query + ";";

// Remove default value
query = query.replace("(0, 0, 0, 0), ", "");

// Run the query to add all the data to the database
sqlmanager.executeQuery(query);

/*var fileOut = "";

for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
        var latitude = topY - (incY * y);
        var longitude = leftX + (incX * x);
        fileOut = fileOut + "\n" + longitude + "," + latitude
    }
}

console.log(fileOut.substring(1));*/