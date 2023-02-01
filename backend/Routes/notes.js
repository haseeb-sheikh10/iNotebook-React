const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');


router.get('/fetchNotes', fetchUser,
    async (req, res) => {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
);



router.post('/addNote', fetchUser,
    body('title').isLength({ min: 5 }),
    body('description').isLength({ min: 8 }),
    async (req, res) => {

        const { title, description, tag } = req.body;

        //if there is error, return bad rquest and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id
            })
            const savedNote = await note.save();
            res.send(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }

    }
);

router.put('/updateNote/:id', fetchUser,

    async (req, res) => {

        const { title, description, tag } = req.body;

        const newNote = {}
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note = await Notes.findById(req.params.id)
        if(!note)
        {
            return res.status(404).send("Not Found")
        }
        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},  {new:true})
        res.json({note})

    }
);


router.delete('/deleteNote/:id', fetchUser,

    async (req, res) => {

        let note = await Notes.findById(req.params.id)
        if(!note)
        {
            return res.status(404).send("Not Found")
        }
        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success": "Note has been deleted", note: note})
    }
);

module.exports = router;