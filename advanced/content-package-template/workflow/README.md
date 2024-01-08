# SAP Work Zone - Workflow Project


## Using this template
Create a new git project and copy the content of this folder into the repository.

### Project Structure
- ````/```` folder contains the general project files for building the artifact
- ````/src```` folder contains the files for the workflow metadata (manifest.json) and the mta.yaml to create the workflow.mtar for testing.
- ````/src/i18n```` folder contains the translation of texts properties from the manifest. Use UTF-8 encoding for translations.
- ````/src/workflow```` folder contains the workflow project sources like the workflow projects in BAS (Business Application Studio)

### Adapt ````package.json````
- Change the name of the package json. **This name is used to create a bundle (zip) for the workflow artifact**.  
	from ````name````: ````sap-workzone-cpkg-workflow-sample````  
	to ````name````: ````company-department-workflow-name````

### Adapt ````src/manifest.json````
- Manifest ````sap.artifact/id```` needs to be in your namespace, example ````company.department.workflow.name````
- Manifest ````sap.artifact/artifactVersion/version```` needs to be increased if necessary

### Adapt ````src/mta.yaml````
- Change ID: simple-approval -> your-name
- Change version: 1.0.0 to match the version in the manifest.json and package.json.
- Change modules/requires/name: workflow_simple-approval -> workflow_your-name
- Change resources/name: workflow_simple-approval -> workflow_your-name

### Translations of texts
Translated texts of a workflow artifact should be maintained in ````/src/i18n```` folder. Those will appear in a content package manager application to describe the workflow.  
The .properties files should use suffix below and be UTF-8 encoded.
````_language_REGION````.  
**Example**
````i18n_en_US.properties````

## Editing your Workflow with Business Application Studio (BAS)
As a developer create a new workspace in BAS and activate workflow extensions for it.

- In the terminal of BAS, clone your newly created repository using git clone {repositorylink}.
- Use the workflow tooling within the ````src/workflow````folder.
- Test the workflow by deploying the mtar to your SCP subaccount.
- Push your commits after you are finished.


## Usage of this project's workflow for a Content Package
SAP Work Zone will be able to install Content Packages that can contain workflows.
To create a Content Package you should use following template provided by SAP Work Zone:

https://github.com/SAP-samples/build-workzone-integration/tree/main/advanced/content-package-template/content-package

While creating a Content Package, the build step of the content package will call  

````npm install````  
````npm run-script build````  

of this project to create the corresponding zip bundle and include it into the content package.
