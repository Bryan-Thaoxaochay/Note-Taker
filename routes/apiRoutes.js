// Importing JSON
let noteData = require('../Develop/db/db.json');
const fs = require('fs');

module.exports = function (app) {

    // Read JSON file and returns all saved notes to JSON
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    // New note return to client
    app.post("/api/notes", function (req, res) {
        
        // All notes saved to request body (Needs to be only the new one)
        noteData.push(req.body);

        // New note added to db.json
        fs.readFile('../Develop/db/db.json', 'utf8', function (error, data){
            if (error){
                console.error(error);
            };
        
            let newNote = data;
        
            fs.writeFile('../Develop/db/db.json', newNote, 'utf8', (error) => error ? 'error' : 'Note added');
        } )

        res.json(true);
    });

    app.delete("/api/notes/:id", function (req, res) {
        
        let noteBody = req.body;

        for (let i = 0; i < noteData.length; i++) {
            if (noteData[i].id == noteBody.id) {

                // Getting index of note
                let index = noteData.indexOf(noteData[i]);

                // Deleting that note
                let newNoteData = noteData.splice(index, 1);

                // Rewriting notes to db.json
                fs.readFile('../Develop/db/db.json', 'utf8', function (error, data){
                    if (error){
                        console.error(error);
                    };
                                
                    fs.writeFile('../Develop/db/db.json', newNoteData, 'utf8', (error) => error ? 'error' : 'Note deleted');
                }) // Read File
            } // If Statement
        } // For Loop
    }); // app.delete

}