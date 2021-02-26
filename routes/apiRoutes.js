// Importing JSON
let noteData = require('../Develop/db/db.json');

module.exports = function (app) {

    // Read JSON file and returns saved notes to JSON
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    // Pushes new note to webpage
    app.post("/api/notes", function (req, res) {
        noteData.push(req.body);
        res.json(true);
    });


    app.post("")

}