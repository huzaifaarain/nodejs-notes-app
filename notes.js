const fs = require("fs")
const chalk = require("chalk")
var prettyjson = require('prettyjson')


class Note {

    notes
    fileDB = "notes.db.json"
    constructor() {
        this.loadNotes()
    }

    loadNotes() {
        try {
            const dataBuffer = fs.readFileSync(this.fileDB)
            const dataJSON = dataBuffer.toString()
            if (dataJSON.length > 0) {
                this.notes = JSON.parse(dataJSON)
            } else {
                this.notes = []
            }
        } catch (error) {
            console.log(chalk.red(error))
        }
    }

    listNotes() {
        console.log(chalk.yellow("Your notes"))
        console.log(prettyjson.render(this.notes));
        console.log(chalk.yellow("Notes list ended."))
    }

    saveNote() {
        try {
            fs.writeFileSync(this.fileDB, JSON.stringify(this.notes))
            return true;
        } catch (error) {
            console.log(chalk.red(error))
        }
    }

    addNote(title, body) {
        const isTitleExists = this.notes.filter((note) => note.title === title);
        if (isTitleExists.length > 0) {
            console.log(chalk.yellow("Note title already exist, try another one."))
            return;
        }
        this.notes.push({
            title, body
        })
        if (this.saveNote()) {
            console.log(chalk.green("Note has been added."))
        }
    }

    updateNote(title, body, whereTitle) {
        let noteIndex = this.notes.findIndex(note => note.title === whereTitle)
        let note = this.notes.find(note => note.title === whereTitle)
        if (note == undefined) {
            console.log(chalk.red(`${whereTitle} doesn't exists in our database.`))
            return;
        }
        const isTitleExists = this.notes.filter((note) => note.title === title);
        if (isTitleExists.length > 1) {
            console.log(chalk.yellow("Note title already exist, try another one."))
            return;
        }
        this.notes[noteIndex].title = title;
        this.notes[noteIndex].body = body;
        if (this.saveNote()) {
            console.log(chalk.green("Note has been updated."))
        }
    }

    deleteNote(title) {
        if (this.notes.find(note => note.title === title) == undefined) {
            console.log(chalk.red(`${title} doesn't exists in our database.`))
            return;
        }
        const notesToKeep = this.notes.filter((note) => note.title !== title)
        this.notes = notesToKeep;
        if (this.saveNote()) {
            console.log(chalk.green("Note has been deleted."))
        }

    }
}

module.exports = new Note()