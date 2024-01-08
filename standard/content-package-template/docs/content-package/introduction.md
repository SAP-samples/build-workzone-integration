# Content Package

A content package bundles different content artifacts for SAP Launchpad Service New Site Experience (Beta). 

The artifacts that can be contained in the content package are:
- [CDM content](../cdm/introduction.md)
  - [Roles](../cdm/introduction.md#role)
  - [Spaces](../cdm/introduction.md#space)
  - [WorkPage](../cdm/introduction.md#workpage)
  - [Business App](../cdm/introduction.md#businessapp)
    - [UI Integration Cards](../cards/introduction.md) as Visualizations of Business App

The artifact sources are located in the corresponding folders (cdm-samples, card-samples).

## Define a Content Package Descriptor (manifest.json)

The manifest.json file allows the following settings. Please maintain the values.

If you create own content package please change the id with an abbreviation of your company specific namespace.

```javascript
{
    "sap.package": {
        // Unique id of the content package
        "id": "my.comp.ns.cpkg", //RESTRICTION: Only 20 chars are allowed
        "__id": "my.company.ns.contentpackage.sample",
    		"i18n": "i18n/i18n.properties",
		
        "packageVersion": {
            // Version in semantic versioning major.minor.patch
            "version": "1.0.0",
            // Defines on which version transition a company administrator is notified if the package
            // is updated by default. A company administrator can change this setting
            // (optional), possible values: none|major|major.minor|all, defaults: all
            "upgradeNotification": "none"
        },
      	// The release notes of this package. This will be shown when a package has a version to upgrade. 
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
            "lineOfBusiness": "",
            // The url to the vendors homepage (mandatory)
            "url": "https://www.mycompany.com",
            // The url to the vendors homepage (optional)
            "logo": "https://www.mycompany.com/logo.png"
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
			//List of strings that define the product for which this content package should be used
			//"SWZHR" is used for SAP SuccessFactors Work Zone product
			//If not provided or empty, all products will be able to install this content package
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
        }
    }
}

```


## Defining Content (content.json)
The definition of the content of a content package is maintained in the `content.json` file located in the folder `content-package-customer-sample/content-package`

In a json map the content is listed. It has the following structure.
```` js
{
  "artifact1-name": {
    "type": "card",                   // the type of the artifact, card|role|space|workpage
    "src": {                          // source configuration of the content
      "appId":"ns.businessapp1",      // (Optional) If added, this card will become the visualization of this businessApp. If not, an automatic buisiness App will be added to this card
      "vizId":"ns.businessapp.viz1",  // (Optional) If added, this will be visualization id. If not, it will use card_id.viz as the visualization id
      "from": "../folder",            // the folder where the sources are located
      "path": "./"                    // (optional) the path to execute the build within the above folder
      "build": "command"              // (optional) the build command to be executed e.g. npm i && npm run-script build
      "package": "name.zip"               // (optional) the name of the zip file for this artifact, e.g my.company.ns.static.list.card.zip
      "manifest": "manifest location" // (cards only) the location of the manifest within the 'from' folder above, e.g src/manifest.json
      "content": "file.json"          // (only role|space|workpage) the location of a file containing the CDM data for the artifact
    }
  }
}
````

### Business App & UI Integraton Cards as Visualization
Role definitions can be easily integrated as they do not require an optimized build step.
<details>
  <summary>Sample Code for adding a BusinessApp</summary>
  
  ```` json
    "sample-businessapp1": {
      "type": "businessapp",
      "src": {
        "from": "../cdm-samples/src",
        "content": "businessapp1.json"
      }
    },
  `````
</details>

UI Integration Cards are development artifacts. They need a build step to create optimized results. Also their resources need to be integrated and added to the content package as a card-package zip file.
Add the appId and vizId to set the UI Integration Card as the visualization of the defined businessApp. If not specified, build tool will automatically generate a default business App for the card.

<details>
  <summary>Sample Code for adding a Card</summary>
  
  ```` json
    "static-list-card-sample": {
      "type": "card",
      "src": {
        "appId":"ns.businessapp1",      // (Optional) If added, this card will become the visualization of this businessApp. If not, an automatic buisiness App will be added to this card
        "vizId":"ns.businessapp.viz1",  // (Optional) If added, this will be visualization id. If not, it will use card_id.viz as the visualization id
        "from": "../card-samples/list-card-samples/static-list-card-sample",
        "path": "./",
        "build": "npm i && npm run-script build",
        "package": "my.company.ns.static.list.card.zip",
        "manifest": "src/manifest.json"
      }
  `````
</details>

### Roles/Spaces/Workpage Artifacts
Role definitions can be easily integrated as they do not require an optimized build step as cards.
<details>
  <summary>Sample Code for adding a Card</summary>
  
  ```` json
  "sample-role1": {
    "type": "role",
    "src": {
      "from": "../cdm-samples/src",
      "content": "role1.json"
    }
  },
  "sample-space1": {
    "type": "space",
    "src": {
      "from": "../cdm-samples/src",
      "content": "space1.json"
    }
  },
  "sample-workpage1": {
    "type": "workpage",
    "src": {
      "from": "../cdm-samples/src",
      "content": "workpage1.json"
    }
  }
  `````
</details>


## Creation of the Content Package


Run the following commands in the `content-package` folder:

```cmd
npm install
npm run build-local
```
## Resulting Content Package

A `package.zip` file will be created in the root folder. The content of the zip can be found in the `package`folder created during the build. This has the following structure. The artifact names are taken from the `content.json`

```javascript
  package.zip
  manifest.json         //package manifest 
                        //contains the cdmEntities
	i18n                  //containing i18n.properties for package manifest texts. UTF-8 encoded
	artifacts
		bubble-chart-card-sample
			manifest.json //artifact manifest
			i18n          //containing i18n.properties for artifact1's manifest texts. UTF-8 encoded
			data.zip      //artifact1 package
		data-object-card-sample
			manifest.json //artifact manifest
			i18n          //containing i18n.properties for artifact1's manifest texts. UTF-8 encoded
			data.zip      //artifact1 package
		static-list-card-sample
			manifest.json //artifact manifest
			i18n          //containing i18n.properties for artifact1's manifest texts. UTF-8 encoded
			data.zip      //artifact1 package
    ...
```

## Content Package sample content
If you run the content package based on the settings in the `content.json` file
- 1 Role -> my.company.ns.contentpackage.role1
- 1 Space -> my.company.ns.contentpackage.space1
- 1 Workpage -> my.company.ns.contentpackage.workpage1 containing 3 cards (visualizations).

For your convenience there is also a second workpage and role already prepared to be used.

[Additional cdm sources](../../cdm-samples/src)
- 1 Role -> my.company.ns.contentpackage.role2
- 1 Workpage -> my.company.ns.contentpackage.workpage2 containing additional 4 cards (visualizations)





