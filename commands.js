const yargs = require("yargs");
const Note = require("./notes");
yargs.version("1.0.0");

yargs.command({
    command: "list",
    describe: "List available notes.",
    handler: () => {
        Note.listNotes();
    }
})

// Add Command
yargs.command({
    command: "add",
    describe: "Add a new note.",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler: () => {
        Note.addNote(yargs.argv.title, yargs.argv.body)
    }
})

yargs.command({
    command: "update",
    describe: "Update a note.",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: "string"
        },
        whereTitle: {
            describe: "Where Title",
            demandOption: true,
            type: "string"
        }
    },
    handler: () => {
        Note.updateNote(yargs.argv.title, yargs.argv.body, yargs.argv.whereTitle)
    }
})

// Delete Command
yargs.command({
    command: "delete",
    describe: "Delete a note.",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler: () => {
        Note.deleteNote(yargs.argv.title)
    }
})

yargs.parse()