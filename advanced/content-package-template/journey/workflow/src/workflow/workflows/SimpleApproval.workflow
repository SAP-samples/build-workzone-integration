{
	"contents": {
		"f5a8d4ff-7205-4b31-860b-273de48f1d67": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "simpleapproval",
			"subject": "SimpleApproval",
			"name": "SimpleApproval",
			"lastIds": "a31d921d-4401-4d0a-a0fd-a25180413ec6",
			"events": {
				"da539e6c-497b-4476-8c82-07bc93cee69b": {
					"name": "Start"
				},
				"69b86c5d-76d3-4cd2-9c3b-fd4f386a63b9": {
					"name": "End"
				}
			},
			"activities": {
				"478bde48-d34a-400b-ac3e-46ff79cf259f": {
					"name": "First-level Approval"
				},
				"9f3b7efd-8a2c-479b-a676-2cc0175c49d1": {
					"name": "Second-level Approval"
				}
			},
			"sequenceFlows": {
				"c63f9489-07d1-4c4e-9124-e7810de53972": {
					"name": "SequenceFlow1"
				},
				"dce5b9d7-c242-41c9-b441-6c987d489446": {
					"name": "SequenceFlow3"
				},
				"ae3d99b8-b895-4487-bb51-666224775d89": {
					"name": "SequenceFlow6"
				}
			},
			"diagrams": {
				"d4c0cb56-fb5d-4dd1-8bf2-9b9bc590eb88": {}
			}
		},
		"da539e6c-497b-4476-8c82-07bc93cee69b": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent1",
			"name": "Start",
			"sampleContextRefs": {
				"79460eed-9865-4e13-9672-99244328a64e": {}
			}
		},
		"69b86c5d-76d3-4cd2-9c3b-fd4f386a63b9": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent1",
			"name": "End"
		},
		"478bde48-d34a-400b-ac3e-46ff79cf259f": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "${context.general.subject}",
			"description": "${context.general.description}",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://comsapbpmworkflow.comsapbpmwusformplayer/com.sap.bpm.wus.form.player",
			"recipientUsers": "${context.recipients.firstApprover}",
			"formReference": "/forms/ApproveFirst.form",
			"userInterfaceParams": [{
				"key": "formId",
				"value": "approvefirst"
			}, {
				"key": "formRevision",
				"value": "1.0"
			}],
			"id": "usertask1",
			"name": "First-level Approval"
		},
		"9f3b7efd-8a2c-479b-a676-2cc0175c49d1": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "${context.general.subject}",
			"description": "${context.general.description}",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://comsapbpmworkflow.comsapbpmwusformplayer/com.sap.bpm.wus.form.player",
			"recipientUsers": "${context.recipients.secondApprover}",
			"formReference": "/forms/ApproveSecond.form",
			"userInterfaceParams": [{
				"key": "formId",
				"value": "approvesecond"
			}, {
				"key": "formRevision",
				"value": "1.0"
			}],
			"id": "usertask2",
			"name": "Second-level Approval"
		},
		"c63f9489-07d1-4c4e-9124-e7810de53972": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow1",
			"name": "SequenceFlow1",
			"sourceRef": "da539e6c-497b-4476-8c82-07bc93cee69b",
			"targetRef": "478bde48-d34a-400b-ac3e-46ff79cf259f"
		},
		"dce5b9d7-c242-41c9-b441-6c987d489446": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow3",
			"name": "SequenceFlow3",
			"sourceRef": "9f3b7efd-8a2c-479b-a676-2cc0175c49d1",
			"targetRef": "69b86c5d-76d3-4cd2-9c3b-fd4f386a63b9"
		},
		"d4c0cb56-fb5d-4dd1-8bf2-9b9bc590eb88": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"db43f1dc-43b9-410d-b6eb-f2d5744c5e5b": {},
				"682ddac7-a0f0-4cf1-92ea-5b0e35a154fa": {},
				"df189331-293a-4c92-9e22-3f43aa2adada": {},
				"7dee8815-f551-4415-b1a1-9817981fd9e7": {},
				"293bbc7e-9ca5-4862-9759-70664a1e07ac": {},
				"ae13446b-a022-4222-b9af-d6e735a477db": {},
				"a9b352b6-bf2b-4320-b9a4-7c3adc110a93": {}
			}
		},
		"79460eed-9865-4e13-9672-99244328a64e": {
			"classDefinition": "com.sap.bpm.wfs.SampleContext",
			"reference": "/sample-data/SimpleApproval.json",
			"id": "default-start-context"
		},
		"db43f1dc-43b9-410d-b6eb-f2d5744c5e5b": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": 12,
			"y": 26,
			"width": 32,
			"height": 32,
			"object": "da539e6c-497b-4476-8c82-07bc93cee69b"
		},
		"682ddac7-a0f0-4cf1-92ea-5b0e35a154fa": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 394,
			"y": 24.5,
			"width": 35,
			"height": 35,
			"object": "69b86c5d-76d3-4cd2-9c3b-fd4f386a63b9"
		},
		"df189331-293a-4c92-9e22-3f43aa2adada": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "44,42 94,42",
			"sourceSymbol": "db43f1dc-43b9-410d-b6eb-f2d5744c5e5b",
			"targetSymbol": "7dee8815-f551-4415-b1a1-9817981fd9e7",
			"object": "c63f9489-07d1-4c4e-9124-e7810de53972"
		},
		"7dee8815-f551-4415-b1a1-9817981fd9e7": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 94,
			"y": 12,
			"width": 100,
			"height": 60,
			"object": "478bde48-d34a-400b-ac3e-46ff79cf259f"
		},
		"293bbc7e-9ca5-4862-9759-70664a1e07ac": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 244,
			"y": 12,
			"width": 100,
			"height": 60,
			"object": "9f3b7efd-8a2c-479b-a676-2cc0175c49d1"
		},
		"ae13446b-a022-4222-b9af-d6e735a477db": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "344,42 394,42",
			"sourceSymbol": "293bbc7e-9ca5-4862-9759-70664a1e07ac",
			"targetSymbol": "682ddac7-a0f0-4cf1-92ea-5b0e35a154fa",
			"object": "dce5b9d7-c242-41c9-b441-6c987d489446"
		},
		"a31d921d-4401-4d0a-a0fd-a25180413ec6": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"terminateeventdefinition": 1,
			"sequenceflow": 6,
			"startevent": 1,
			"endevent": 2,
			"usertask": 2,
			"exclusivegateway": 1
		},
		"ae3d99b8-b895-4487-bb51-666224775d89": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow6",
			"name": "SequenceFlow6",
			"sourceRef": "478bde48-d34a-400b-ac3e-46ff79cf259f",
			"targetRef": "9f3b7efd-8a2c-479b-a676-2cc0175c49d1"
		},
		"a9b352b6-bf2b-4320-b9a4-7c3adc110a93": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "194,42 244,42",
			"sourceSymbol": "7dee8815-f551-4415-b1a1-9817981fd9e7",
			"targetSymbol": "293bbc7e-9ca5-4862-9759-70664a1e07ac",
			"object": "ae3d99b8-b895-4487-bb51-666224775d89"
		}
	}
}