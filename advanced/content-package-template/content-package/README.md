# SAP Work Zone - Content Package Project

This folder provides the necessary metadata for a content package and the build configuration to create a Content Package

### Project Structure

- `/` folder contains the general project files for for building the package and the metadata manifest.json
- `/i18n` folder contains the translation of texts properties from the manifest. Use UTF-8 encoding for translations.

### Adapt `package.json`

- Change the name of the package.json  
  from
  `"name"`: `"sap-content-package-sample"`  
  to `"name"`: `"company-department-packagename"`
- Change the author of the package.json  
  from `"author"`: `"SAP SE"`  
  to `"author"`: `"your-author-name"`

### Adapt `manifest.json`

- Manifest `sap.package/id` needs to be in your namespace, example `company.department.packagename`.  
  It should have at least 2 dots and be unique for your company. Do not use `sap` as a company

### Translations of texts

Translated texts of a conent package should be maintained in `/src/i18n` folder. Those will appear in a content package manager application to describe the content package.  
The .properties files should use suffix below and be UTF-8 encoded.
`_language_REGION`.  
**Example**
`i18n_en_US.properties`

## Adapt the manifest.json settings

The manifest.json file allows the following settings. Please maintain the values.

```javascript
{
    "sap.package": {
        // Unique id of the content package
        "id": "sap.workzone.content.package.sample",
        "packageVersion": {
            // Version in semantic versioning major.minor.patch
            "version": "1.0.0",
            // Defines on which version transition a company administrator is notified if the package
            // is updated by default. A company administrator can change this setting
            // (optional), possible values: none|major|major.minor|all, defaults: all
            "upgradeNotification": "none"
        },
	    // The release Notes of this package. This will be shown when a package has a version to upgrade. 
	    "releaseNotes": [
            // releaseNotes is an array, all the below items will be shown as different lines in the version detail.
            {
            // The title of the item
            "title": "Test new card name in 3.0.0"
            // The description of the item
            "description": "Description explaning what has been added",
            },
	    ],
        // Vendor information of the content package (mandatory)
        "vendor": {
            // The id of the vendor, if any (optional)
            "id": "",
            // Name of the vendor as it appears in the UI (mandatory)
            "name": "SAP",
            // The line of business (department, group) that is responsible for the content (optional)
            "lineOfBusiness": "SAP Work Zone",
            // The url to the vendors homepage (mandatory)
            "url": "https://www.sap.com",
            // The url to the vendors homepage (optional)
            "logo": "https://www.sap.com/logo.png"
        },
        // Icon image url or sap-icon reference to identify the content package.
        // using an image should consider coloring that fits to dark and light backgrounds
        "icon": "sap-icon://accept",
		// Main title of the package. keep this short(mandatory)
		// Keep this translatable
        "title": "{{PACKAGE_TITLE}}",
		// Subtitle of the package (optional)
		// Keep this translatable
        "subTitle": "{{PACKAGE_SUBTITLE}}",
        // Info of the package, a short description of the package's purpose (optional)
        // Keep this translatable
        "info": "{{PACKAGE_INFO}}",
        // Long description of the package, there is no need to add details of the contained artifacts,
        // this will be incuded from the artifact itself. Keep this translatable (mandatory)
        "description": "{{PACKAGE_DESCRIPTION}}",
        // Tags for search keywords, keep them translatable (optional)
        "tags": {
            "keywords": [
                "{{PACKAGE_KEYWORD1}}",
                "{{PACKAGE_KEYWORD2}}"
            ]
        },
        // The scope of the package delivery. Values: internal|external (mandatory)
        "scope": "external",
        //License information
        "license": {
            "text": ""
            "url": ""
        },
        // Homepage information that advertises this content package (optional)
        "homepage": {
            "text": ""
            "url": ""
        },
        // Support information (mandatory)
        "support": {
			"text": ""
            "url": ""
        },

        "contents": [
            // Array of artifacts based on content.json. // This section will be created during during build
        ],
        "documentation": {
            "url": ""
		},
        "consumption": [
            //List of strings that define the Work Zone Product for which this content package should be used
            //"SWZHR" is used for SAP Work Zone for HR product
            //If not provided or empty all SAP Work Zone products will be able to install this content package
        ],
        // Dependencies of this package
        "dependencies": {
            "applications": [{
                // application's technical name
                "name": ""
            }],
            "services": [{
                // services's technical name, for example SAPWorkZoneHR
                "name": ""
            }]
        },
        // Pre-check for a content package
        "prerequisites": {
            //If the content package contains apps/cards that requires a destination to the remote system, specify the destinations names here. If this destination is missing in the system, we will render a URL to specify the the help document. 
            "destinations": [
                {
                    "name": "123",
                    "document": "https://xxx.yyy.zzz"
                },
                {
                    "name": "456"
                }
            ]
        }
    }
}

```

## Maintain the content for the package

The `content.json` links the repositories of the individual artifacts that should be contained in the Content Package.

The key of each entry in the map reflects one artifact.

### Using git repositories for the artifacts

It is recommended to use seperate git repositories to maintain the contents of a package. It will allow easier maintenance of the content for sub-sequent versions.
The build-all script will first pull the files from the git repositories. mentioned under the

- `git` defines the repository
- `branch` defines the branch of the repository (like master). You could also give a label (like latest) within this setting.  
  The default branch is "master".

Ensure to that you have a valid access to the git repository.

```javascript
{
	//the name of the artifacts folder in the package
	"artifact1"
	{
		// type of the artifact currently supported: card, workflow, workspace-template, workspace, homepage
		"type": "card",
		"src": {
			//git repository to pull the content
			"git": "git@github:orgnaization/project.git",
			//branch or label of the repository
			"branch": "master",
			//the path within the repository to execute the build
			"path": "./",
			//the build scripts to create the artifact package, you can leave it blank to use the default build
			"build": "npm i && npm run-script build",
            //Optional: the location of the artifact's package after the build
			"package": "company-department-card-name.zip",
			//Optional: the location of the manifest to extract the sap.artifact settings for the Content Package
			"manifest": "src/manifest.json"

		}
	}
	...
}
```

### Using local folders for the artifacts

You can also point to local folders in your environment.
It is highly recommended to use git repositories for the artifacts that you deliver in a content package.
For support and due to legal requirement it is necessary to store sources versioned. This is not necessary for testing of course.
Instead of the above git and branch entry you can use the `from` entry to use local sources for your artifacts.

```javascript
{
	//the name of the artifacts folder in the package
	"artifact1"
	{
		// type of the artifact currently supported: card, workflow, workspace-template, workspace, homepage
		"type": "card",
		"src": {
			//path to the source folder
			"from": "../card",
			//the path within the from folder to execute the build
			"path": "./",
			//the build scripts to create the artifact package
			"build": "npm i && npm run-script build",
			//Optional: the location of the artifact's package after the build,
            "package": "sap-workzone-cpkg-card-sample.zip",
			//Optional: the location of the manifest to extract the sap.artifact settings for the Content Package
			"manifest": "src/manifest.json"
		}
	}
	...
}
```

## Maintain the version of the Content Package

Content Packages use sematic versioning (major.minor.patch) according to the following rules

- patches include only bug fixes
- minor version can include compatible enhancements
- major version can include incompatible enhancements

**Increase the version**

- Change the version of the package.json

  - For patches  
    `"version"`: `"1.0.0"` -> `"version"`: `"1.0.1"`
  - For minor version changes  
    `"version"`: `"1.0.0"` -> `"version"`: `"1.1.0"`
  - For major version changes  
    `"version"`: `"1.0.0"` -> `"version"`: `"2.0.0"`

- Change the version  
  `manifest.json sap.package/artifactVersion/version`

- Set the upgradeNotification to a convenient value for example `sap.package/artifactVersion/upgradeNotification : "major"`

### How to create repositories for different artifact types?

Similar to this project template.

Use the following project templates to create your artifact repositories:

- [sap-workzone-cpkg-card-sample](https://github.com/SAP-samples/build-workzone-integration/tree/main/advanced/content-package-template/card)
- [sap-workzone-cpkg-workflow-sample](https://github.com/SAP-samples/build-workzone-integration/tree/main/advanced/content-package-template/workflow)
- [sap-workzone-cpkg-workspace-template-sample](https://github.com/SAP-samples/build-workzone-integration/tree/main/advanced/content-package-template/workspace-template)
- [sap-workzone-cpkg-workspace-sample](https://github.com/SAP-samples/build-workzone-integration/tree/main/advanced/content-package-template/workspace)
- [sap-workzone-cpkg-homepage-sample](https://github.com/SAP-samples/build-workzone-integration/tree/main/advanced/content-package-template/homepage)

## Creation of the Content Package

Run the following commands

```cmd
npm install
npm run build-all
```

You can run the different build steps individually

```cmd
# pull from projects referred from content.json
npm run pull

# build projects content.json
npm run build
```

## Result

A `package.zip` file will be created in the root folder. The content of the zip can be found in the `package`folder created during the build. This has the following structure. The artifact names are taken from the `content.json`

```javascript
package.zip
   	manifest.json         //package manifest
	i18n                  //containing i18n.properties for package manifest texts. UTF-8 encoded
	artifacts
		card-sample
			manifest.json //artifact manifest
			i18n          //containing i18n.properties for artifact1's manifest texts. UTF-8 encoded
			data.zip      //artifact1 package
		workflow-sample
			manifest.json //artifact manifest
			i18n          //containing i18n.properties for artifact2's manifest texts. UTF-8 encoded
			data.zip      //artifact2 package
			...
```

## Uploading a Content Package to SAP Work Zone


