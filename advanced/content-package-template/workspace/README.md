# SAP Work Zone - Workspace Project

## Using this template

Create a new git project and copy the content of this folder into the repository.

### Project Structure

- `/` folder contains the general project files for for building the artifact
- `/src` folder contains the workspace-template manifest.json, the template zip and translations
- `/src/i18n` folder contains the workspace-template translations text properties. Use UTF-8 encoding for translations.
- `/src/workspace-template.zip` downloaded workspace from a SAP Work Zone

### Adapt `package.json`

- Change the name of the package json. **This name is used to create a bundle (zip) for the workspace artifact**.  
  from `name`: `sap-workzone-cpkg-workspace-template-sample`  
  to `name`: `company-department-workspace-template-name`

### Adapt `src/manifest.json`

- Manifest `sap.artifact/id` needs to be in your namespace, example `company.department.workspace.template.name`
- Manifest `sap.artifact/artifactVersion/version` needs to be increased if necessary

### Translations of texts

Translated texts of a workspace should be maintained in `/src/i18n` folder. Those will appear in a content package manager application to describe the workspace-template.  
The .properties files should use suffix below and be UTF-8 encoded.
`_language_REGION`.  
**Example**
`i18n_en_US.properties`

## Create and export a Workspace from SAP Work Zone

**Steps to export a Workspace**

- Open SAP Work Zone as a Company Administrator
- Go to Administraton Console - Area & Workspace Configuration - Workspaces
- Click Import and Export Workspaces Tab and the button and goto Export Tab
- Choose the workspace you want to export and click Export Buttonand save the file.
- Save (Replace) the file in this project under `src/workspace.zip`
- If you like to deliver the home page, commit this change to git.

## Import the Workspace template to SAP Work Zone for testing

As a company administrator in SAP Work Zone, you can import a workspaceemplate. During Content Package installation from the customer, the import will be done automatically.

**Steps to import a Workspace**

- Open SAP Work Zone as a Company Administrator
- Go to Administraton Console - Area & Workspace Configuration - Workspaces
- Click Import and Export Workspaces Tab and the button and goto Import Tab
- Click Import Workspace button to upload the zip file `src/workspace.zip` from previous step

## Usage of this project's workspace-template for a Content Package

SAP Work Zone will be able to install Content Packages that can contain Workspaces.
To create a Content Package you should use following template provided by SAP Work Zone:

https://github.com/SAP-samples/build-workzone-integration/tree/main/advanced/content-package-template/content-package

While creating a Content Package, the build step of the content package will call

`npm install`  
`npm run-script build`

of this project to create the corresponding zip bundle and include it into the content package.
