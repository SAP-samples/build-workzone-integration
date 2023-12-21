# Integrating Cards and Widgets in the SAP Build Work Zone Wizard

Workspace administrators can create wizards to help users complete step-by-step processes. The wizards can contain one or multiple stages, each with steps and contextual information that assists the users to complete the steps. In addition, workspace administrators can add widgets and cards to the wizard steps. When a card/widget is added to a step, the step will only be marked as complete when the required user input is added to the card/widget.

In the following screenshot you can find the Favorite declarative card. This card persists the favorite item selected by the user. 
Card details: [Work Zone Favorite Card](./sample-cards/wz-favorite-card):

 ![Work Zone Wizard](./images/wizard.png)

## Explorer Sample Codes

Sample code for various Cards can be found in [sample-cards](./sample-cards/README.md). Follow up the readme file to start the card in a local environment:

* [Work Zone Favorite Declarative Card](./sample-cards/wz-favorite-card):
  - Leverages the wizard to persist the favorite Item.
  - Validates whether the user selected at least one favorite item in the wizard.

* [Work Zone Vaccination Component Cards](./sample-cards/wz-favorite-card):
  - Vaccination Status card that collects vaccination status.
  - Leverage the wizard to persist vaccination status.
  - The card will check whether have confirmed the Vaccination in Vaccination Confirmation Card. This is an example to read context from other cards.
  - Once it is confirmed, user is not able to update Vaccination status anymore.

* [Work Zone Vaccination Confirmation Component Cards](./sample-cards/wz-favorite-card):
  - Read context from Vaccination Card, and show it in readonly model
  - Ask user to confirm the Vaccination info. Once it is confirmed, user is not able to update Vaccination status anymore.


## How to subscribe Submission events?

As the card developer, you can subscribe to the “Next Step” event to trigger data validation (to check if a favorite item was selected), and then submit the content to the server.

When the user clicks the “Next Step” button the, `Page:SubmitWizard` event is triggered as follows:

![Page:SubmitWizard event](./images/submit-wizard.png)

The card can return `rejected` promise to notify the wizard that the card is not complete (a user action item is still pending completion). In this case, an error message will be displayed in the wizard footer.

![Wizard error message](./images/error-message.png)

## How to Persist Wizard context in to Workzone?

Users may leave the wizard before completing it, and to allow them to resume their work from the point they’ve reached, you would want to persist their context.

Let’s consider the following example – there are 3 cards:
•	Basic card: collects basic user info such as username, gender, and so.
•	Skillset card: collects a user’s skillset.
•	Submission card: submits the collected user info from the first 2 cards to the back end.

As card developer, you would only need to persist the user info that is collected by the Submission card. However, to avoid data loss, you would also want to persist the Basic and Skillset card context in case the user leaves the wizard before completing this step.
The card context can be persisted by triggering the `UpdateHostContext` event that persists the temporary Card context.
:

![UpdateHostContext](./images/update-host-context.png)

## How to retrieve persistent Wizard context?

A card can retrieve a persisted card context by explicitly declaring the `host.context` card parameter:

![Card Parameter](./images/retrieve-wizard-context.png)

Setup the context model in the Card Controller/Extension:

![Retrieve wizard context-in-controller](./images/retrieve-wizard-context-in-controller.png)


## How to support in Declarative Card?

To use the above features in a declarative card, add an extension to the card:

![Card extension](./images/card-extension.png)

## All above event/parameter/model setup must be done on the onCardReady event instead of on the onInit event.:

![onReady event in extension](./images/onReady-extension.png)

