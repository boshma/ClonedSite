## Deployed App
https://teamosiris.azurewebsites.net/

## Directory
* Site pages are in the views folder
  * They are effectively just .html files, but are .ejs to make them work better with Express
    * .ejs also adds a few other features that you can look into, but we aren't using any right now
  * index.ejs is the main site page with the map. Not specifying a page automatically goes to this one
  * education.ejs is the education page, it loads other pages as its content
    * Most of the other pages, such as intro, riskreduction, evacuation, and resources are pages made to be loaded into this one, and not used on their own
    * template.ejs is a simple template for this kind of page if we want to make more
  * signup.ejs is a popup for notification signups
  * alert.ejs is an example for a high risk popup
* Site resources, such as js, css, and checklist files are in the public folder
  * css files are in stylesheets
  * checklists are in resources
* Server code is in the routes folder
  * index.js is the main server file that runs the logic
  * sqlmanager.js is self-explanatory
  * randomdata.js populates the map database with random data (will be removed once we get ML running)
  * just ignore users.js, we could *probably* just remove it but I don't want to risk breaking shit

## Running Locally
1. Open the ProjectOsiris folder in terminal
2. Run 'npm start'
3. The app should run and be accessible at http://localhost:3000/