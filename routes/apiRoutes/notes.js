const router = require("express").Router();
const fs = require("fs");
let db = require("../../db/db.json");
const { v1: uuid } = require("uuid");


router.get("/notes", (req, res) => {
	const readDB = fs.readFileSync("db/db.json", {
		encoding: "utf8",
		flag: "r",
	});
	res.json(JSON.parse(readDB));
});

router.post("/notes", (req, res) => {
	const { title, text } = req.body;
	const id = uuid();
	db.push({ title, text, id });
	fs.writeFileSync("db/db.json", JSON.stringify(db));
	res.json(db);
});

router.delete("/notes/:id", (req, res) => {
	db = db.filter((note) => note.id !== req.params.id);
	fs.writeFileSync("db/db.json", JSON.stringify(db));
	res.json(db);
});

module.exports = router;