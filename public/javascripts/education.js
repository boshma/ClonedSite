// List of education pages to be cycled through
var pages = ["intro.ejs", "riskreduction.ejs", "evacuation.ejs", "resources.ejs"];

// Runs when a page is selected from the dropdown menu
function change() {
    var page = document.getElementById('menu').value;
    // Displays the page
    document.getElementById('content').src = page;
}

function changeByShape(page) {
    // Displays the page
    document.getElementById('content').src = page;

    document.getElementById('menu').value = page;
}

function scrollToArticle(sectionId) {
    var targetSection = document.getElementById(sectionId);

    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function previous() {
    var path = document.getElementById('content').src;
    var curr = path.substring(path.lastIndexOf("/") + 1);
    var index = pages.indexOf(curr);

    // Only runs if there is a previous page, otherwise it does nothing
    if (index - 1 >= 0) {
        // Displays the page
        document.getElementById('content').src = pages[index - 1];

        // Updates the dropdown
        document.getElementById('menu').value = pages[index - 1];
    }
}

function next() {
    var path = document.getElementById('content').src;
    var curr = path.substring(path.lastIndexOf("/") + 1);
    var index = pages.indexOf(curr);

    // Only runs if there is a next page, otherwise it does nothing
    if (index + 1 < pages.length) {
        // Displays the page
        document.getElementById('content').src = pages[index + 1];

        // Updates the dropdown
        document.getElementById('menu').value = pages[index + 1];
    }
}

function adjustIframeHeight() {
    var iframe = document.getElementById('content');
    if (iframe) {
        var newHeight = iframe.contentWindow.document.body.scrollHeight + 100
        iframe.style.height = newHeight + 'px';
    }
}

function changeImage(image) {
    var img = document.getElementById('iso_img');

    img.src = image
}

const sect = document.getElementById('polygon');
sect.addEventListener('mouseover', changeImage);