const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
hbs.registerPartials(__dirname+"/views/partials");
app.set('view-engine', "hbs");
app.use(express.static(__dirname+"/public"));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err) {
            console.log(err);
        }
    })
    next();
});
// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// });

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});
app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Home page",
    })

});
app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About page",
    });

});

app.listen(3000);