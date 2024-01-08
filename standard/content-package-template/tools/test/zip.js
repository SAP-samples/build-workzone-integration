var util = require("../util/util"),
	path = require("path");

util.zip.folder(path.join(__dirname, "..", "test.zip"), path.join(__dirname, ".."), "util");

