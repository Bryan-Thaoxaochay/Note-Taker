// Importing JSON
let noteData = require('../db/db.json');
const fs = require('fs');
const path = require("path");

module.exports = function (app) {

    // Read JSON file and returns all saved notes to JSON
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    }); // app.get

    // New note return to client
    app.post("/api/notes", function (req, res) {
        
        let note = req.body;
        noteData.push(note);

        // Rewriting notes to db.json
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', function (error, data){
            if (error){
                console.error(error);
            };
            
            // Sending updated noteData back to db.json
            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData), 'utf8', (error) => error ? 'error' : 'Note added');
        }) // Read File

        res.json(noteData);

    }); // app.post



//     app.delete("/api/notes/:id", function (req, res) {

        // // Adding id to each object
        // noteData.forEach((item, i) => {item.id = i + 1;});
        
//         let oldNoteBody = req.params.id;

//         for (let i = 0; i < noteData.length; i++) {
//             if (noteData[i].id == oldNoteBody.id) {

//                 // Getting index of note
//                 let index = noteData.indexOf(noteData[i]);

//                 // Deleting that note
//                 noteData.splice(index, 1);

//                 // Rewriting notes to db.json
//                 fs.readFile('../Develop/db/db.json', 'utf8', function (error, data){
//                     if (error){
//                         console.error(error);
//                     };
                    
//                     // Sending updated noteData back to db.json
//                     fs.writeFile('../Develop/db/db.json', noteData, 'utf8', (error) => error ? 'error' : 'Note deleted');
//                 }) // Read File

//                 // Sending updated noteData back to body
//                 res.json(noteData);

//             } // If Statement
//         } // For Loop

//     }); // app.delete

}