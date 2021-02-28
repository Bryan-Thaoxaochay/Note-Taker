// Importing JSON
let noteData = require('../Develop/db/db.json');

module.exports = function (app) {

    // Read JSON file and returns all saved notes to JSON
    // Function is activated once URL matches path
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    // Pushes new note to webpage
    app.post("/api/notes", function (req, res) {
        noteData.push(req.body);
        res.json(true);
    });

    app.delete("/api/notes/:id", function (req, res) {
        // Deletes a note via ID
    });

}