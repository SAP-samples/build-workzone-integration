# Built-In Workzone Card Context

## How to use card context via card parameter
There is [Card Parameters](https://ui5.sap.com/test-resources/sap/ui/integration/demokit/cardExplorer/webapp/index.html#/learn/configuration/manifestParameters) to provide dynamic values for certain card attributes in SAP UI Integration Card. The card parameter supports retrieving value from Workzone context as below syntax:

```json
"sap.card": {
    "configuration": {
      "parameters": {
        "userId": {
          "value": "{context>sap.workzone/currentUser/id/value}",
          "type": "string",
          "label": "Workzone user uuid",
          "description": "UUID of login Workzone user"
        },
        "webHost": {
          "value": "{context>sap.workzone/currentCompany/webHost/value}",
          "type": "string",
          "label": "Web host of current workzone",
          "description": "Web host of current workzone"
        }
      }
    },
}
```

To enrich the interaction between card as Workzone platform, Workzone supports below built-in card context to power the card feature:

## "sap.workzone" Namespace

"sap.workzone" is the main namespace to provide card context in SAP Build Work Zone. It has the following attributes (properties):

- context for current login user

  | Object      | Property    | Type         | Description                                                                                     |
  | ----------- | ----------- | ------------ | ----------------------------------------------------------------------------------------------- |
  | currentUser | id          | string       | Internal uuid of current login user                                                             |
  | currentUser | name        | string       | Full name of current login user                                                                 |
  | currentUser | firstName   | string       | First name of current login user                                                                |
  | currentUser | lastName    | string       | Last name of current login user                                                                 |
  | currentUser | email       | string       | Email of current login user                                                                     |
  | currentUser | global_uuid | string       | SAP global UUID of current login user                                                           |
  | currentUser | user_type   | string       | User type current login user, it is either `employee`(internal user) or `public`(external user) |
  | currentUser | time_zone   | `TimeZone`   | time zone info of current login user                                                            |

  type of `TimeZone`

  ```ts
  {
    dst: boolean,                 // boolean to indicate daylight saving time or not
    timezone: string,             // name of timezone such as "America/Los_Angeles"
    tzone_offset: number,         // offset in second to UTC such as -28800
    dst_transitions:  {           // transitions of DST
      start_date: string,         // start date of the DST period
      end_date: string,           // end date of the DST period
      offset: number              // offset in second to UTC
    }[]
  }
  ```

  example of the login user context:

  ```json
  {
    "id": {
      "value": "ZXeGhCw9RTDWrbToBb9QoC"
    },
    "name": {
      "value": "Test User"
    },
    "firstName": {
      "value": "Test"
    },
    "lastName": {
      "value": "User"
    },
    "email": {
      "value": "test.user@sap.com"
    },
    "global_uuid": {
      "value": "90c60790-8080-a3c9-d0f-633ac18b0be3"
    },
    "user_type": {
      "value": "employee"
    },
    "time_zone": {
      "value": {
        "tzone_offset": -28800,
        "dst": true,
        "timezone": "America/Los_Angeles",
        "dst_transitions": []
      }
    }
  }
  ```

- context for current workspace

  | Object           | Property    | Type         | Description                                                                               |
  | ---------------- | ----------- | ------------ | ----------------------------------------------------------------------------------------- |
  | currentWorkspace | id          | string       | Internal uuid of current workspace                                                        |
  | currentWorkspace | name        | string       | Name of current workspace                                                                 |


  example of the login user context:

  ```json
  {
    "id": {
        "value": "OKPCqSmAGV45fLsORdIrEf"
    },
    "name": {
        "value": "Ricky's test workspace"
    }
  }
  ```

- context for current company

  | Object         | Property    | Type         | Description                                                                                     |
  | -------------- | ----------- | ------------ | ----------------------------------------------------------------------------------------------- |
  | currentCompany | id          | string       | Internal uuid of current company                                                                |
  | currentCompany | name        | string       | Internal name of current company                                                                |
  | currentCompany | webHost     | string       | Web host of current company, it is the same with the one in browser's address bar               |

  example of the login user context:

  ```js
  {
    "id": {
        "value": "rlB8gAafRcXwjRjx3m80tb"
    },
    "name": {
        "value": "wz-adv-eu10-dev-snd392d7-0f3d4d09-ca58-4k9e-9982-be5d01e64352"
    },
    "webHost": {
        "value": Promise.resolve('https://wz-adv-eu10-dev-snd392d7.workzonelts.cfapps.sap.hana.ondemand.com')
    }
  }
  ```

## "sap.successfactors" Namespace

"sap.successfactors" is the main namespace to provide card context related to HCM capability in SAP Build Work Zone. Note, this namespace is only available in `SAP SuccessFactors Work Zone`. It has the following attributes (properties):

- context for current login user

  | Object      | Property    | Type         | Description                                                                                     |
  | ----------- | ----------- | ------------ | ----------------------------------------------------------------------------------------------- |
  | currentUser | id          | string       | The user ID of connected Success Factors system                                                            |

  example of the login user context:

  ```json
  {
    "id": {
        "value": "sfadmin"
    }
  }
  ```

- context for current company

  | Object         | Property    | Type         | Description                                                                                     |
  | -------------- | ----------- | ------------ | ----------------------------------------------------------------------------------------------- |
  | currentCompany | id          | string       | The company ID of connected Success Factors system                                              |

  example of the login user context:

  ```js
  {
    "id": {
        "value": "AFTWWIIS"
    }
  }
  ```
