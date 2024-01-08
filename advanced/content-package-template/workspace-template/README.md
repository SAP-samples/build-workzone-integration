# SAP Work Zone - Workspace Template Project

## Using this template
Create a new git project and copy the content of this folder into the repository.


### Project Structure
- ````/```` folder contains the general project files for for building the artifact
- ````/src```` folder contains the workspace-template manifest.json, the template zip and translations
- ````/src/i18n```` folder contains the workspace-template translations text properties. Use UTF-8 encoding for translations.
- ````/src/workspace-template.zip```` downloaded workspace template from a SAP Work Zone


### Adapt ````package.json````
- Change the name of the package json. **This name is used to create a bundle (zip) for the workspace template artifact**.  
	from ````name````: ````sap-workzone-cpkg-workspace-template-sample````  
	to ````name````: ````company-department-workspace-template-name````

### Adapt ````src/manifest.json````
- Manifest ````sap.artifact/id```` needs to be in your namespace, example ````company.department.workspace.template.name````
- Manifest ````sap.artifact/artifactVersion/version```` needs to be increased if necessary

### Translations of texts
Translated texts of a workspace template should be maintained in ````/src/i18n```` folder. Those will appear in a content package manager application to describe the workspace-template.  
The .properties files should use suffix below and be UTF-8 encoded.
````_language_REGION````.  
**Example**
````i18n_en_US.properties````

## Create and export a Workspace Template from SAP Work Zone

**Steps to create a Workspace Template**
- Open SAP Work Zone as a Company Administrator
- Create a workspace with all contents that should be part of the Workspace Template.
- Save the workspace as a Workspace Template.
  - Open the workspace menu (top right button with three dots) in the header of your workspace.
  - Select 'Save as Workspace Template' from the menu.
  - Fill out the form in the popup and press 'Create'

**Steps to export a Workspace Template**
- Open SAP Work Zone as a Company Administrator
- Go to Administraton Console - Area & Workspace Configuration - Workspace Templates
- Find the Workspace Template created in the previous step in the list of templates (with your user name)
- Select 'Export' in the 'Action' menu of your template
- Save (Replace) the file in this project under ````src/workspace-template.zip````
- If you like to deliver the workspace template, commit this change to git.

## Import the Workspace template to SAP Work Zone for testing
As a company administrator in SAP Work Zone, you can import a workspace template. During Content Package installation from the customer, the import will be done automatically.

**Steps to import a Workspace Template**
- Open SAP Work Zone as a Company Administrator
- Go to Administraton Console - Area & Workspace Configuration - Workspace Templates
- Press the import button and choose the ````src/workspace-template.zip```` and upload it.

## Usage of this project's workspace-template for a Content Package
SAP Work Zone will be able to install Content Packages that can contain Workspace Templates.
To create a Content Package you should use following template provided by SAP Work Zone:

https://github.com/SAP-samples/build-workzone-integration/tree/main/advanced/content-package-template/content-package

While creating a Content Package, the build step of the content package will call  

````npm install````  
````npm run-script build````  

of this project to create the corresponding zip bundle and include it into the content package.
