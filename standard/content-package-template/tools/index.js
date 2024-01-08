const homepagebuild = require("./homepage/build.js"),
  contentpackagebuild = require("./content-package/build.js"),
  contentpackagepull = require("./content-package/pull.js"),
  contentpackagevalidate = require("./content-package/validate.js"),
  cardbuild = require("./card/build.js"),
  workspacebuild = require("./workspace/build.js"),
  workspacetemplatebuild = require("./workspace-template/build.js"),
  workflowbuild = require("./workflow/build.js");

module.exports = {
  "homepage": {
    build: homepagebuild.build
  },
  "contentpackage": {
    build: contentpackagebuild.build,
    pull: contentpackagepull.pull,
    validate: contentpackagevalidate.validate
  },
  "card": {
    build: cardbuild.build
  },
  "workspace-template": {
    build: workspacetemplatebuild.build
  },
  "workspace": {
    build: workspacebuild.build
  },
  "workflow": {
    build: workflowbuild.build
  }
}