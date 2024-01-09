# SAP Work Zone - UI Integration Card Project

## Using this template
Create a new git project and copy the content of this folder into the repository.


### Project Structure
- ````/```` folder contains the general project files for for building the artifact
- ````/src```` folder contains the card source and test files
- ````/src/i18n```` folder contains the card translation text properties files. Use UTF-8 encoding for translations.
- ````/src/test```` folders with manual or qunit tests of the card. This folder will not be bundled during build and not delivered to consumers of the card.

### Adapt ````package.json````
- Change the name of the package json. This **name is used to create a bundle (zip) for the card artifact**.  
	from ````name````: ````sap-workzone-cpkg-card-sample````  
	to ````name````: ````company-department-card-name````

### Adapt ````ui5.yaml````
- Change the name of the ui5.yaml name  
from  ````name````: ````sap-workzone-cpkg-card-sample````  
to ````name````: ````company-department-card-name````
- Change the copyright statement to fit your company needs.
  ````
  copyright: |-
   SAP Work Zone 
    * (c) Copyright 2009-${currentYear} SAP SE or an SAP affiliate company.
  ````

### Adapt ````src/manifest.json````
- Manifest ````sap.app/id```` needs to be in your namespace, example ````company.department.card.name````
- Manifest ````sap.app/applicationVersion/version```` needs to be increased if necessary

## Prepare for testing and building a Card

Install the dependencies
`````
npm i
`````

## Create a (minified) Card Bundle for delivery
`````
npm run-script build
`````
During the build step a dist folder is created in the project containing the resources that are packaged into a zip file.

Result is a ````company-department-card-name.zip```` file in the root folder

### Upload the Card bundle to SAP Work Zone
As a company administrator in SAP Work Zone, you can upload the card ````company-department-card-name.zip```` file and test it in a workspace.

## Local testing
Start a local server for testing. Server uses the ````/src```` folder as root.

`````
npm start
`````

This command will launch a manual test page of your card.  

````http://localhost:{port}/test/manual/index.html````

### Change UI5 version if needed
````
/src/test/manual/index.html
````
Within the index.html file, change the UI5 version if needed. This depends on the features you consume from the UI Integration Cards implementation.
````
  <script
     id="sap-ui-bootstrap"
	 src="https://openui5nightly.hana.ondemand.com/resources/sap-ui-integration.js" ... >
````

## Creation of a Card
Follow the documentation of UI Integration Cards
in the [Card Explorer](https://sapui5.hana.ondemand.com/test-resources/sap/ui/integration/demokit/cardExplorer/webapp/index.html#/explore/list)

You can also use SAP Business Application Studio that has additional [developer tools for UI Integration Card](https://help.sap.com/viewer/7d3b9c7211ca4d7a9630b524205ee836/Cloud/en-US/160f56a5d45a4392a78daf0cec35aad9.html) development.

### Translations of texts
Translated texts of a card should be maintained in ````/src/i18n```` folder.  
The .properties files should use suffix below and be UTF-8 encoded.
````_language_REGION````.  
**Example**
````i18n_en_US.properties````



## Usage of this project's card for a Content Package
SAP Work Zone will be able to install Content Packages that can contain UI Integration Cards.
To create a Content Package you should use following template provided by SAP Work Zone:

https://github.com/SAP-samples/build-workzone-integration/tree/main/content-package-template/content-package

While creating a Content Package, the build step of the content package will call  

````npm install````  
````npm run-script build````  

of this project to create the corresponding zip bundle and include it into the content package.
