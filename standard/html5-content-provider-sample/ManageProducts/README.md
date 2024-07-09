# Simple Business Solution that can be accessed as Content Provider

## Developers should find here -
1. Simple UI5 application called manage products that shows a list of products from generic Northwind service.
2. Very basic cdm.json file in workzone folder that contains 1 Role, 1 Group, 1 Catalog and 1 App.
3. Build script entry in mta.yaml to copy the cdm.json from workzone folder to resources folder.
4. Sap.cloud.service defined in the UI app manifest that denotes the business solution.
5. CDM and RT destinations defined within mta.yaml which can be used as reference while create the destinations in the consumer sub-account.

Refer the documentation [here](https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/developing-html5-apps-for-cross-subaccount-consumption) for details.
