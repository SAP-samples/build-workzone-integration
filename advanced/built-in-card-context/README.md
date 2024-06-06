# Built-In Workzone Card Context

## How to Use Card Context via Card Parameter

SAP UI Integration Cards allow for dynamic values to be provided using [Card Parameters](https://ui5.sap.com/test-resources/sap/ui/integration/demokit/cardExplorer/webapp/index.html#/learn/configuration/manifestParameters). You can retrieve values from the Workzone context using the following syntax:

```json
"sap.card": {
  "configuration": {
    "parameters": {
      "userId": {
        "value": "{context>sap.workzone/currentUser/id/value}",
        "type": "string",
        "label": "Workzone user UUID",
        "description": "UUID of the logged-in Workzone user"
      },
      "webHost": {
        "value": "{context>sap.workzone/currentCompany/webHost/value}",
        "type": "string",
        "label": "Web host of the current Workzone",
        "description": "Web host of the current Workzone"
      }
    }
  }
}
```

To enhance interaction between the card and the Workzone platform, Workzone supports the following built-in card contexts:

## "sap.workzone" Namespace

The "sap.workzone" namespace provides card context related current Workzone information in SAP Build Work Zone with the following properties:

### Current Login User Context

| Object      | Property    | Type       | Description                                                                                            |
| ----------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| currentUser | id          | string     | Internal UUID of the current logged-in user                                                            |
| currentUser | name        | string     | Full name of the current logged-in user                                                                |
| currentUser | firstName   | string     | First name of the current logged-in user                                                               |
| currentUser | lastName    | string     | Last name of the current logged-in user                                                                |
| currentUser | email       | string     | Email of the current logged-in user                                                                    |
| currentUser | global_uuid | string     | SAP global UUID of the current logged-in user                                                          |
| currentUser | user_type   | string     | User type of the current logged-in user, either `employee` (internal user) or `public` (external user) |
| currentUser | time_zone   | `TimeZone` | Time zone information of the current logged-in user                                                    |

#### TimeZone Type

```ts
{
  dst: boolean,                 // Indicates daylight saving time or not
  timezone: string,             // Name of timezone, e.g., "America/Los_Angeles"
  tzone_offset: number,         // Offset in seconds to UTC, e.g., -28800
  dst_transitions: {            // DST transitions
    start_date: string,         // Start date of the DST period
    end_date: string,           // End date of the DST period
    offset: number              // Offset in seconds to UTC
  }[]
}
```

#### Example: Current Login User Context

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

### Current Workspace Context

| Object           | Property | Type   | Description                            |
| ---------------- | -------- | ------ | -------------------------------------- |
| currentWorkspace | id       | string | Internal UUID of the current workspace |
| currentWorkspace | name     | string | Name of the current workspace          |

#### Example: Current Workspace Context

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

### Current Company Context

| Object         | Property | Type   | Description                                                                   |
| -------------- | -------- | ------ | ----------------------------------------------------------------------------- |
| currentCompany | id       | string | Internal UUID of the current company                                          |
| currentCompany | name     | string | Internal name of the current company                                          |
| currentCompany | webHost  | string | Web host of the current company, same as the one in the browser's address bar |

#### Example: Current Company Context

```json
{
  "id": {
    "value": "rlB8gAafRcXwjRjx3m80tb"
  },
  "name": {
    "value": "wz-adv-eu10-dev-snd392d7-0f3d4d09-ca58-4k9e-9982-be5d01e64352"
  },
  "webHost": {
    "value": "https://wz-adv-eu10-dev-snd392d7.workzonelts.cfapps.sap.hana.ondemand.com"
  }
}
```

## "sap.successfactors" Namespace

The "sap.successfactors" namespace provides card context related to HCM capabilities in SAP Build Work Zone. Note that this namespace is only available in `SAP SuccessFactors Work Zone` with the following properties:

### Current Login User Context

| Object      | Property | Type   | Description                                        |
| ----------- | -------- | ------ | -------------------------------------------------- |
| currentUser | id       | string | The user ID of the connected SuccessFactors system |

#### Example: Current Login User Context

```json
{
  "id": {
    "value": "sfadmin"
  }
}
```

### Current Company Context

| Object         | Property | Type   | Description                                           |
| -------------- | -------- | ------ | ----------------------------------------------------- |
| currentCompany | id       | string | The company ID of the connected SuccessFactors system |

#### Example: Current Company Context

```json
{
  "id": {
    "value": "AFTWWIIS"
  }
}
```
