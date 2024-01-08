const JSZip = require("jszip");
const fs = require("fs-extra");
const path = require("path");
function addFileToZip(zip, fsPath, prefix) {
    let oFile = fs.readFileSync(fsPath);
    zip.file(prefix?prefix+path.basename(fsPath):path.basename(fsPath), oFile);
}

function addFolderToZip(zip, fsPath, aFilters, prefix) {
    if (!fsPath) {
        return;
    }
    if (!aFilters) {
        aFilters = [];
    }
    fs.readdirSync(fsPath).forEach(function (filename) {
        if (filename.indexOf(".") !== 0 && !aFilters.includes(filename.toLowerCase())) {
            let childPath = path.join(fsPath, filename);
            let stat = fs.statSync(childPath);
            if (stat) {
                if (stat.isFile()) {
                    addFileToZip(zip, childPath, prefix);
                } else {
                    addFolderToZip(zip.folder(prefix?prefix+filename:filename), childPath);
                }
            }
        }
    });
}
module.exports.build = async function (dir) {
  var util = require("../util/util.js"),
    rimraf = require("rimraf"),
    root = path.join(dir, util.relativeDir(dir)),
		packagejson = util.json.fromFile(path.join(root, "package.json")),
		name = packagejson.name,
    dist = path.join(root, "dist"),
    src = path.join(root, "src"),
    out = path.join(root, name + ".zip");


  util.log.fancy("Building Workspace Template Package");
  console.log(" - Clean files and folders");

  rimraf.sync(dist);
  fs.removeSync(out);

  console.log(" - Create dist folder and content");
  fs.copySync(src, dist);
  if (fs.existsSync(path.join(dist, "template"))) {
    //util.zip.folder(path.join(dist, "workspace-template.zip"), path.join(dist, "template"));//zip cannot be uploadded successfully
    
    var zip = new JSZip();
    addFolderToZip(zip, path.join(dist, "template"), ["workspace-template.zip"], "/template/");
    var zipBuffer = await zip.generateAsync({type: "nodebuffer"});
    fs.writeFileSync(path.join(dist, "workspace-template.zip"), zipBuffer);

    rimraf.sync(path.join(dist, "template"));
  }
  util.i18n.process(path.join(dist, "manifest.json"));

  console.log(" - Zip content to " + name + ".zip");
  util.zip.folder(out, dist);

  util.log.fancy("Building Workspace Template Package finished successful");
}