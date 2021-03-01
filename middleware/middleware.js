// Importing JSON
let noteData = require('../Develop/db/db.json');

const fs = require('fs');

fs.readFile('../Develop/db/db.json', 'utf8', function (error, data){
    if (error){
        console.error(error);
    };

    let newNote = 

    fs.writeFile('../Develop/db/db.json', newNote, 'utf8', (error) => error ? 'error' : 'File wrote');
} )