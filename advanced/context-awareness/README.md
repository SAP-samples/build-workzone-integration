# Interaction Between Cards in the SAP Build Work Zone

Cards on the same workpage can interact with each other by setting and getting parameters to and from the page context. All the parameters in the page context will be made available to a card when it is initialized. A card can then respond to any parameters it recognizes. Whenever a card updates a parameter to the page context, this will trigger a refresh for all the other cards on the same page, so that they will all get the updated context parameter.

## Built-in Workzone Card Context

Workzone as host environment to render card supports some built-in card context.[Explore built-in Workzone Card Context](./built-in-wz-context.md).


## Filter Bar

Once end user selects one of the available card parameters, all other cards that are designed to respond to the workpage context, will respond and update accordingly. Each time you add a parameter, it acts like a filter that you can see in the top menu bar and it remains in focus even when you scroll down the workpage. In this way, you can always see the filters you've added.


## Explorer Sample Codes

Sample code for various Cards can be found in [sample-cards](./sample-cards/README.md). Follow up the readme file to start the card in a local environment:

* [Work Zone Favorite Declarative Card](./sample-cards/wz-favorite-card):
  - Leverages the wizard to persist the favorite Item.
  - Validates whether the user selected at least one favorite item in the wizard.

* [Work Zone Todo Component Cards](./sample-cards/wz-todo-card/):
  - Leverage Work Zone Wizard to persist the Todo item and the status
  - Validate whether there is any incomplete Todo item in Wizard `Submission` event

* [Work Zone Vaccination Component Cards](./sample-cards/wz-favorite-card):
  - Vaccination Status card that collects vaccination status.
  - Leverage the wizard to persist vaccination status.
  - The card will check whether have confirmed the Vaccination in Vaccination Confirmation Card. This is an example to read context from other cards.
  - Once it is confirmed, user is not able to update Vaccination status anymore.

* [Work Zone Vaccination Confirmation Component Cards](./sample-cards/wz-favorite-card):
  - Read context from Vaccination Card, and show it in readonly model
  - Ask user to confirm the Vaccination info. Once it is confirmed, user is not able to update Vaccination status anymore.



## How to subscribe card context?

As the card developer, you can subscribe to the “Next Step” event to trigger data validation (to check if a favorite item was selected), and then submit the content to the server.

When the user clicks the “Next Step” button the, `Page:SubmitWizard` event is triggered as follows:

![Page:SubmitWizard event](./images/submit-wizard.png)

The card can return `rejected` promise to notify the wizard that the card is not complete (a user action item is still pending completion). In this case, an error message will be displayed in the wizard footer.

![Wizard error message](./images/error-message.png)

## How to update card context?

Users may leave the wizard before completing it, and to allow them to resume their work from the point they’ve reached, you would want to persist their context.

Let’s consider the following example – there are 3 cards:
•	Basic card: collects basic user info such as username, gender, and so.
•	Skillset card: collects a user’s skillset.
•	Submission card: submits the collected user info from the first 2 cards to the back end.

As card developer, you would only need to persist the user info that is collected by the Submission card. However, to avoid data loss, you would also want to persist the Basic and Skillset card context in case the user leaves the wizard before completing this step.
The card context can be persisted by triggering the `UpdateHostContext` event that persists the temporary Card context.
:

![UpdateHostContext](./images/update-host-context.png)
