// REST API subscribe base url
var baseUrl = "subscribe/";

// Get user location
var latitude = 0;
var longitude = 0;

// Gets user location using geolocation API
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPos, failedPos);
}

// Sets the location values
function setPos(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

// If location not allowed/doesn't work, close the signup window
function failedPos(error) {
    window.close()
}

function submitEmail() {
    var url = baseUrl + "email/" + document.getElementById('email').value + "/" + latitude + "/" + longitude;

    // Attempts to add email to database
    (async () => {
        fetch(url, { method: 'GET', mode: "cors", headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                response.text().then((text) => {
                    data = JSON.parse(text);

                    // If the email is already in the database
                    if (data == "Failed") {
                        // show confirmation text/buttons [WIP]
                        document.getElementById('emailresponse').innerText = "failed";
                    }
                    // If it added successfully
                    else {
                        document.getElementById('emailresponse').innerText = "success";
                    }
                });
            })
            .catch((error) => { });
    })();
}

function submitNumber() {
    var url = baseUrl + "number/" + document.getElementById('number').value + "/" + latitude + "/" + longitude;

    // Attempts to add number to database
    (async () => {
        fetch(url, { method: 'GET', mode: "cors", headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                response.text().then((text) => {
                    data = JSON.parse(text);

                    // If the number is already in the database
                    if (data == "Failed") {
                        // show confirmation text/buttons [WIP]
                        document.getElementById('numberresponse').innerText = "failed";
                    }
                    // If it added successfully
                    else {
                        document.getElementById('numberresponse').innerText = "success";
                    }
                });
            });
    })();
}