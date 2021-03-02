// Importing JSON
let noteData = require('../Develop/db/db.json');
const fs = require('fs');

module.exports = function (app) {
    
    // Adding id to each object
    noteData.forEach((item) => {item.id = Math.floor(Math.random()*1000) + 1;});

    // Read JSON file and returns all saved notes to JSON
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    }); // app.get

    // New note return to client
    app.post("/api/notes", function (req, res) {
        
        let newNoteBody = req.body;

        // Does the body automatically save into a JSON?
        // If it does, how can I separate the new note from the old notes in the body?

        newNoteBody.forEach((item) => {item.id = Math.floor(Math.random()*1000) + 1;});

        for (let i = 0; i < noteData.length; i++) {

            // Looping through to find the new note
            if (noteData[i].id != newNoteBody.id) {

                // Pushing new note to noteData JSON
                noteData.push(newNoteBody);

                // Rewriting notes to db.json
                fs.readFile('../Develop/db/db.json', 'utf8', function (error, data){
                    if (error){
                        console.error(error);
                    };
                                
                    fs.writeFile('../Develop/db/db.json', noteData, 'utf8', (error) => error ? 'error' : 'Note deleted');
                }) // Read File

                // Returning noteData to client
                res.json(noteData);
                
            } else {

                console.log("This note already exists.")

            } // If Statement
        } // For Loop

    }); // app.post



    app.delete("/api/notes/:id", function (req, res) {
        
        let oldNoteBody = req.body;

        for (let i = 0; i < noteData.length; i++) {
            if (noteData[i].id == oldNoteBody.id) {

                // Getting index of note
                let index = noteData.indexOf(noteData[i]);

                // Deleting that note
                noteData.splice(index, 1);

                // Rewriting notes to db.json
                fs.readFile('../Develop/db/db.json', 'utf8', function (error, data){
                    if (error){
                        console.error(error);
                    };
                    
                    // Sending updated noteData back to db.json
                    fs.writeFile('../Develop/db/db.json', noteData, 'utf8', (error) => error ? 'error' : 'Note deleted');
                }) // Read File
            } // If Statement
        } // For Loop

    }); // app.delete

}