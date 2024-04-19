var map = null;
var heatMaps = [];

// Default values
var latitude = 39.393486;
var longitude = -98.100769;
var zoomlevel = 5;

// Initializes map
function loadMapScenario(position) {
    // Attempts to set location based on user data
    try {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        zoomlevel = 7;
    }
    // If it fails, just user default values
    catch (error) { }

    // Initialize the map
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(latitude, longitude),
        zoom: zoomlevel
    });

    // Put wildfire data on the map
    updateMapData();
}

// Adds fire data to map
function updateMapData() {
    // Removes old data
    for (var i = 0; i < heatMaps.length; i++) {
        map.layers.remove(heatMaps[i]);
    }

    Microsoft.Maps.loadModule('Microsoft.Maps.HeatMap', function () {
        var mapDiv = map.getRootElement();
        var locations = [];

        // Base url for getting wildfire data from Node REST API
        var url = document.getElementById("timeSelector").value;

        var data = null;

        // Gets data from server
        (async () => {
            await fetch(url, { method: 'GET', mode: "cors", headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    response.text().then((text) => {
                        data = JSON.parse(text);

                        // Adds data points
                        for (i = 0; i < data.length; i++) {
                            var location = new Microsoft.Maps.Location(data[i]['latitude'], data[i]['longitude']);
                            locations.push(location);
                        }

                        // Configures heatmap settings
                        var heatMap = new Microsoft.Maps.HeatMapLayer(locations, {
                            intensity: 0.65,
                            radius: 10,
                            colorGradient: {
                                '0': 'Black',
                                '0.4': 'Purple',
                                '0.6': 'Red',
                                '0.8': 'Yellow',
                                '1': 'White'
                            },
                            aggregateLocationWeights: true
                        });

                        // Adds heatmap overlay to map
                        heatMaps.push(heatMap);
                        map.layers.insert(heatMap);
                    });
                })
                .catch((error) => { });
        })();
    });
    undefined;

    // Example High Risk popup window
    if (isHighRisk()) {
        sleep(500).then(() => { centeredPopup('alert.ejs', 'myWindow', '700', '300', 'yes'); });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Checks for high risk at coordinates (not done)
function isHighRisk() {
    return false;
}

// Gets user location, and then loads the map with the data
function getPos() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadMapScenario, loadMapScenario);
    }
}

// Code for popup windows
var popupWindow = null;
function centeredPopup(url, winName, w, h, scroll) {
    // Sets sizing parameters
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
    settings =
        'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',resizable'

    // Creates a window displaying the selected file with selected settings
    popupWindow = window.open(url, winName, settings)
}

// Code for selector

var output = document.getElementById("timeOutput");
var slider = document.getElementById("timeSelector");

output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    // Update map with data from that time period
    updateMapData();

    // Display the selected value
    output.innerHTML = this.value;
}