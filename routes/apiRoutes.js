// Importing JSON
let noteData = require('../Develop/db/db.json');
const fs = require('fs');

module.exports = function (app) {



    // Read JSON file and returns all saved notes to JSON
    app.get("/api/notes", function (req, res) {
        // Adding id to each object
        let noteDataID = noteData.forEach((item, i) => {item.id = i + 1;});
        res.json(noteDataID);
    });

    // New note return to client
    app.post("/api/notes", function (req, res) {
        
        let newNoteBody = req.body;

        for (let i = 0; i < noteData.length; i++) {

            // Looping through to find the new note
            if (noteData[i].id != newNoteBody.id) {

                // Pushing new note to noteData JSON
                let newNote = noteData.push(newNoteBody[i]);

                // Rewriting notes to db.json
                fs.readFile('../Develop/db/db.json', 'utf8', function (error, data){
                    if (error){
                        console.error(error);
                    };
                                
                    fs.writeFile('../Develop/db/db.json', newNote, 'utf8', (error) => error ? 'error' : 'Note deleted');
                }) // Read File
                
            } else {

                console.log("This note already exists.")

            } // If Statement
        } // For Loop

        res.json(true);
    });



    app.delete("/api/notes/:id", function (req, res) {
        
        let oldNoteBody = req.body;

        for (let i = 0; i < noteData.length; i++) {
            if (noteData[i].id == oldNoteBody.id) {

                // Getting index of note
                let index = noteData.indexOf(noteData[i]);

                // Deleting that note
                let deleteNote = noteData.splice(index, 1);

                // Rewriting notes to db.json
                fs.readFile('../Develop/db/db.json', 'utf8', function (error, data){
                    if (error){
                        console.error(error);
                    };
                                
                    fs.writeFile('../Develop/db/db.json', deleteNote, 'utf8', (error) => error ? 'error' : 'Note deleted');
                }) // Read File
            } // If Statement
        } // For Loop
    }); // app.delete

}