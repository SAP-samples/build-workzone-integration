var validate = require("../contentpackage/validate"),
	path = require("path");

var dir = process.argv[2].split("/");
dir = __dirname.split("/").concat(dir);
validate.validate("/" + path.join.apply(path, dir));