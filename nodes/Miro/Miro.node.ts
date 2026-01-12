/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	miroApiRequest,
	miroApiRequestAllItems,
	buildItemBody,
} from './transport';

import {
	boardOperations,
	boardFields,
	boardMemberOperations,
	boardMemberFields,
	itemOperations,
	itemFields,
	stickyNoteOperations,
	stickyNoteFields,
	shapeOperations,
	shapeFields,
	cardOperations,
	cardFields,
	frameOperations,
	frameFields,
	connectorOperations,
	connectorFields,
	imageOperations,
	imageFields,
	textOperations,
	textFields,
	tagOperations,
	tagFields,
	documentOperations,
	documentFields,
} from './descriptions';

export class Miro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Miro',
		name: 'miro',
		icon: 'file:miro.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Miro API for whiteboard automation',
		defaults: {
			name: 'Miro',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'miroOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Board',
						value: 'board',
					},
					{
						name: 'Board Member',
						value: 'boardMember',
					},
					{
						name: 'Card',
						value: 'card',
					},
					{
						name: 'Connector',
						value: 'connector',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Frame',
						value: 'frame',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Item',
						value: 'item',
					},
					{
						name: 'Shape',
						value: 'shape',
					},
					{
						name: 'Sticky Note',
						value: 'stickyNote',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Text',
						value: 'text',
					},
				],
				default: 'board',
			},
			// Board
			...boardOperations,
			...boardFields,
			// Board Member
			...boardMemberOperations,
			...boardMemberFields,
			// Item
			...itemOperations,
			...itemFields,
			// Sticky Note
			...stickyNoteOperations,
			...stickyNoteFields,
			// Shape
			...shapeOperations,
			...shapeFields,
			// Card
			...cardOperations,
			...cardFields,
			// Frame
			...frameOperations,
			...frameFields,
			// Connector
			...connectorOperations,
			...connectorFields,
			// Image
			...imageOperations,
			...imageFields,
			// Text
			...textOperations,
			...textFields,
			// Tag
			...tagOperations,
			...tagFields,
			// Document
			...documentOperations,
			...documentFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Log licensing notice once per execution
		this.logger.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.'
		);

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// ----------------------------------------
				//              Board
				// ----------------------------------------
				if (resource === 'board') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = { name };

						if (additionalFields.description) {
							body.description = additionalFields.description;
						}
						if (additionalFields.teamId) {
							body.teamId = additionalFields.teamId;
						}
						if (additionalFields.projectId) {
							body.projectId = additionalFields.projectId;
						}

						// Build policy object
						const policy: IDataObject = {};
						if (additionalFields.sharingPolicyAccess || additionalFields.sharingPolicyTeamAccess) {
							policy.sharingPolicy = {};
							if (additionalFields.sharingPolicyAccess) {
								(policy.sharingPolicy as IDataObject).access = additionalFields.sharingPolicyAccess;
							}
							if (additionalFields.sharingPolicyTeamAccess) {
								(policy.sharingPolicy as IDataObject).teamAccess = additionalFields.sharingPolicyTeamAccess;
							}
						}
						if (additionalFields.copyAccessLevel) {
							policy.permissionsPolicy = {
								copyAccessLevel: additionalFields.copyAccessLevel,
							};
						}
						if (Object.keys(policy).length > 0) {
							body.policy = policy;
						}

						responseData = await miroApiRequest.call(this, 'POST', '/boards', body);
					}

					if (operation === 'get') {
						const boardId = this.getNodeParameter('boardId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}`);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await miroApiRequestAllItems.call(this, 'GET', '/boards', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							filters.limit = limit;
							const response = await miroApiRequest.call(this, 'GET', '/boards', {}, filters);
							responseData = response.data as IDataObject[];
						}
					}

					if (operation === 'update') {
						const boardId = this.getNodeParameter('boardId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};
						if (updateFields.name) body.name = updateFields.name;
						if (updateFields.description) body.description = updateFields.description;
						if (updateFields.projectId) body.projectId = updateFields.projectId;

						// Build policy object
						const policy: IDataObject = {};
						if (updateFields.sharingPolicyAccess || updateFields.sharingPolicyTeamAccess) {
							policy.sharingPolicy = {};
							if (updateFields.sharingPolicyAccess) {
								(policy.sharingPolicy as IDataObject).access = updateFields.sharingPolicyAccess;
							}
							if (updateFields.sharingPolicyTeamAccess) {
								(policy.sharingPolicy as IDataObject).teamAccess = updateFields.sharingPolicyTeamAccess;
							}
						}
						if (Object.keys(policy).length > 0) {
							body.policy = policy;
						}

						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}`, body);
					}

					if (operation === 'delete') {
						const boardId = this.getNodeParameter('boardId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}`);
						responseData = { success: true };
					}

					if (operation === 'copy') {
						const boardId = this.getNodeParameter('boardId', i) as string;
						const copyOptions = this.getNodeParameter('copyOptions', i) as IDataObject;

						const body: IDataObject = {};
						if (copyOptions.name) body.name = copyOptions.name;
						if (copyOptions.teamId) body.teamId = copyOptions.teamId;

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/copy`, body);
					}
				}

				// ----------------------------------------
				//           Board Member
				// ----------------------------------------
				if (resource === 'boardMember') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'share') {
						const email = this.getNodeParameter('email', i) as string;
						const role = this.getNodeParameter('role', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							email,
							role,
						};
						if (additionalFields.message) {
							body.message = additionalFields.message;
						}

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/members`, body);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await miroApiRequestAllItems.call(this, 'GET', `/boards/${boardId}/members`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/members`, {}, { limit });
							responseData = response.data as IDataObject[];
						}
					}

					if (operation === 'get') {
						const memberId = this.getNodeParameter('memberId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/members/${memberId}`);
					}

					if (operation === 'update') {
						const memberId = this.getNodeParameter('memberId', i) as string;
						const role = this.getNodeParameter('role', i) as string;

						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/members/${memberId}`, { role });
					}

					if (operation === 'remove') {
						const memberId = this.getNodeParameter('memberId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/members/${memberId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//              Item
				// ----------------------------------------
				if (resource === 'item') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const query: IDataObject = {};
						if (filters.type && (filters.type as string[]).length > 0) {
							query.type = (filters.type as string[]).join(',');
						}

						if (returnAll) {
							responseData = await miroApiRequestAllItems.call(this, 'GET', `/boards/${boardId}/items`, {}, query);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.limit = limit;
							const response = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/items`, {}, query);
							responseData = response.data as IDataObject[];
						}
					}

					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/items/${itemId}`);
					}

					if (operation === 'updatePosition') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body = buildItemBody.call(this, i, updateFields);
						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/items/${itemId}`, body);
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/items/${itemId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//           Sticky Note
				// ----------------------------------------
				if (resource === 'stickyNote') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'create') {
						const content = this.getNodeParameter('content', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						additionalFields.content = content;
						const body = buildItemBody.call(this, i, additionalFields);

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/sticky_notes`, body);
					}

					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/sticky_notes/${itemId}`);
					}

					if (operation === 'update') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body = buildItemBody.call(this, i, updateFields);
						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/sticky_notes/${itemId}`, body);
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/sticky_notes/${itemId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//              Shape
				// ----------------------------------------
				if (resource === 'shape') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'create') {
						const shapeType = this.getNodeParameter('shapeType', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						additionalFields.shape = shapeType;
						const body = buildItemBody.call(this, i, additionalFields);

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/shapes`, body);
					}

					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/shapes/${itemId}`);
					}

					if (operation === 'update') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body = buildItemBody.call(this, i, updateFields);
						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/shapes/${itemId}`, body);
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/shapes/${itemId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//              Card
				// ----------------------------------------
				if (resource === 'card') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						additionalFields.title = title;
						const body = buildItemBody.call(this, i, additionalFields);

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/cards`, body);
					}

					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/cards/${itemId}`);
					}

					if (operation === 'update') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body = buildItemBody.call(this, i, updateFields);
						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/cards/${itemId}`, body);
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/cards/${itemId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//              Frame
				// ----------------------------------------
				if (resource === 'frame') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'create') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = buildItemBody.call(this, i, additionalFields);

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/frames`, body);
					}

					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/frames/${itemId}`);
					}

					if (operation === 'getItems') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await miroApiRequestAllItems.call(this, 'GET', `/boards/${boardId}/frames/${itemId}/items`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/frames/${itemId}/items`, {}, { limit });
							responseData = response.data as IDataObject[];
						}
					}

					if (operation === 'update') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body = buildItemBody.call(this, i, updateFields);
						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/frames/${itemId}`, body);
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/frames/${itemId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//            Connector
				// ----------------------------------------
				if (resource === 'connector') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'create') {
						const startItemId = this.getNodeParameter('startItemId', i) as string;
						const endItemId = this.getNodeParameter('endItemId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							startItem: { id: startItemId },
							endItem: { id: endItemId },
						};

						if (additionalFields.startSnapTo) {
							(body.startItem as IDataObject).snapTo = additionalFields.startSnapTo;
						}
						if (additionalFields.endSnapTo) {
							(body.endItem as IDataObject).snapTo = additionalFields.endSnapTo;
						}
						if (additionalFields.shape) {
							body.shape = additionalFields.shape;
						}

						// Build style object
						const style: IDataObject = {};
						if (additionalFields.strokeColor) style.strokeColor = additionalFields.strokeColor;
						if (additionalFields.strokeWidth) style.strokeWidth = String(additionalFields.strokeWidth);
						if (additionalFields.strokeStyle) style.strokeStyle = additionalFields.strokeStyle;
						if (additionalFields.startStrokeCap) style.startStrokeCap = additionalFields.startStrokeCap;
						if (additionalFields.endStrokeCap) style.endStrokeCap = additionalFields.endStrokeCap;
						if (Object.keys(style).length > 0) {
							body.style = style;
						}

						if (additionalFields.caption) {
							body.captions = [{ content: additionalFields.caption }];
						}

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/connectors`, body);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await miroApiRequestAllItems.call(this, 'GET', `/boards/${boardId}/connectors`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/connectors`, {}, { limit });
							responseData = response.data as IDataObject[];
						}
					}

					if (operation === 'get') {
						const connectorId = this.getNodeParameter('connectorId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/connectors/${connectorId}`);
					}

					if (operation === 'update') {
						const connectorId = this.getNodeParameter('connectorId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.startItemId) {
							body.startItem = { id: updateFields.startItemId };
						}
						if (updateFields.endItemId) {
							body.endItem = { id: updateFields.endItemId };
						}
						if (updateFields.shape) {
							body.shape = updateFields.shape;
						}

						// Build style object
						const style: IDataObject = {};
						if (updateFields.strokeColor) style.strokeColor = updateFields.strokeColor;
						if (updateFields.strokeWidth) style.strokeWidth = String(updateFields.strokeWidth);
						if (updateFields.strokeStyle) style.strokeStyle = updateFields.strokeStyle;
						if (updateFields.startStrokeCap) style.startStrokeCap = updateFields.startStrokeCap;
						if (updateFields.endStrokeCap) style.endStrokeCap = updateFields.endStrokeCap;
						if (Object.keys(style).length > 0) {
							body.style = style;
						}

						if (updateFields.caption) {
							body.captions = [{ content: updateFields.caption }];
						}

						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/connectors/${connectorId}`, body);
					}

					if (operation === 'delete') {
						const connectorId = this.getNodeParameter('connectorId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/connectors/${connectorId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//              Image
				// ----------------------------------------
				if (resource === 'image') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'createFromUrl') {
						const url = this.getNodeParameter('url', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							data: { url },
						};

						if (additionalFields.title) {
							(body.data as IDataObject).title = additionalFields.title;
						}

						// Add position
						const position: IDataObject = {};
						if (additionalFields.x !== undefined) position.x = additionalFields.x;
						if (additionalFields.y !== undefined) position.y = additionalFields.y;
						if (Object.keys(position).length > 0) {
							position.origin = 'center';
							body.position = position;
						}

						// Add geometry
						const geometry: IDataObject = {};
						if (additionalFields.width && additionalFields.width !== 0) geometry.width = additionalFields.width;
						if (additionalFields.height && additionalFields.height !== 0) geometry.height = additionalFields.height;
						if (additionalFields.rotation) geometry.rotation = additionalFields.rotation;
						if (Object.keys(geometry).length > 0) {
							body.geometry = geometry;
						}

						if (additionalFields.parentId) {
							body.parent = { id: additionalFields.parentId };
						}

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/images`, body);
					}

					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/images/${itemId}`);
					}

					if (operation === 'updateFromUrl') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.url || updateFields.title) {
							body.data = {};
							if (updateFields.url) (body.data as IDataObject).url = updateFields.url;
							if (updateFields.title) (body.data as IDataObject).title = updateFields.title;
						}

						// Add position
						const position: IDataObject = {};
						if (updateFields.x !== undefined) position.x = updateFields.x;
						if (updateFields.y !== undefined) position.y = updateFields.y;
						if (Object.keys(position).length > 0) {
							position.origin = 'center';
							body.position = position;
						}

						// Add geometry
						const geometry: IDataObject = {};
						if (updateFields.width) geometry.width = updateFields.width;
						if (updateFields.height) geometry.height = updateFields.height;
						if (updateFields.rotation) geometry.rotation = updateFields.rotation;
						if (Object.keys(geometry).length > 0) {
							body.geometry = geometry;
						}

						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/images/${itemId}`, body);
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/images/${itemId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//              Text
				// ----------------------------------------
				if (resource === 'text') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'create') {
						const content = this.getNodeParameter('content', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						additionalFields.content = content;
						const body = buildItemBody.call(this, i, additionalFields);

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/texts`, body);
					}

					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/texts/${itemId}`);
					}

					if (operation === 'update') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body = buildItemBody.call(this, i, updateFields);
						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/texts/${itemId}`, body);
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/texts/${itemId}`);
						responseData = { success: true };
					}
				}

				// ----------------------------------------
				//              Tag
				// ----------------------------------------
				if (resource === 'tag') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = { title };
						if (additionalFields.fillColor) {
							body.fillColor = additionalFields.fillColor;
						}

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/tags`, body);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await miroApiRequestAllItems.call(this, 'GET', `/boards/${boardId}/tags`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/tags`, {}, { limit });
							responseData = response.data as IDataObject[];
						}
					}

					if (operation === 'get') {
						const tagId = this.getNodeParameter('tagId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/tags/${tagId}`);
					}

					if (operation === 'update') {
						const tagId = this.getNodeParameter('tagId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};
						if (updateFields.title) body.title = updateFields.title;
						if (updateFields.fillColor) body.fillColor = updateFields.fillColor;

						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/tags/${tagId}`, body);
					}

					if (operation === 'delete') {
						const tagId = this.getNodeParameter('tagId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/tags/${tagId}`);
						responseData = { success: true };
					}

					if (operation === 'attachToItem') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const tagId = this.getNodeParameter('tagId', i) as string;

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/items/${itemId}/tags`, { tagId });
					}

					if (operation === 'removeFromItem') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const tagId = this.getNodeParameter('tagId', i) as string;

						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/items/${itemId}/tags/${tagId}`);
						responseData = { success: true };
					}

					if (operation === 'getItemTags') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const response = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/items/${itemId}/tags`);
						responseData = response.tags as IDataObject[] || [];
					}

					if (operation === 'getItemsByTag') {
						const tagId = this.getNodeParameter('tagId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await miroApiRequestAllItems.call(this, 'GET', `/boards/${boardId}/tags/${tagId}/items`);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/tags/${tagId}/items`, {}, { limit });
							responseData = response.data as IDataObject[];
						}
					}
				}

				// ----------------------------------------
				//            Document
				// ----------------------------------------
				if (resource === 'document') {
					const boardId = this.getNodeParameter('boardId', i) as string;

					if (operation === 'createFromUrl') {
						const url = this.getNodeParameter('url', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							data: { url },
						};

						if (additionalFields.title) {
							(body.data as IDataObject).title = additionalFields.title;
						}

						// Add position
						const position: IDataObject = {};
						if (additionalFields.x !== undefined) position.x = additionalFields.x;
						if (additionalFields.y !== undefined) position.y = additionalFields.y;
						if (Object.keys(position).length > 0) {
							position.origin = 'center';
							body.position = position;
						}

						// Add geometry
						const geometry: IDataObject = {};
						if (additionalFields.width && additionalFields.width !== 0) geometry.width = additionalFields.width;
						if (additionalFields.height && additionalFields.height !== 0) geometry.height = additionalFields.height;
						if (additionalFields.rotation) geometry.rotation = additionalFields.rotation;
						if (Object.keys(geometry).length > 0) {
							body.geometry = geometry;
						}

						if (additionalFields.parentId) {
							body.parent = { id: additionalFields.parentId };
						}

						responseData = await miroApiRequest.call(this, 'POST', `/boards/${boardId}/documents`, body);
					}

					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await miroApiRequest.call(this, 'GET', `/boards/${boardId}/documents/${itemId}`);
					}

					if (operation === 'updateFromUrl') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.url || updateFields.title) {
							body.data = {};
							if (updateFields.url) (body.data as IDataObject).url = updateFields.url;
							if (updateFields.title) (body.data as IDataObject).title = updateFields.title;
						}

						// Add position
						const position: IDataObject = {};
						if (updateFields.x !== undefined) position.x = updateFields.x;
						if (updateFields.y !== undefined) position.y = updateFields.y;
						if (Object.keys(position).length > 0) {
							position.origin = 'center';
							body.position = position;
						}

						// Add geometry
						const geometry: IDataObject = {};
						if (updateFields.width) geometry.width = updateFields.width;
						if (updateFields.height) geometry.height = updateFields.height;
						if (updateFields.rotation) geometry.rotation = updateFields.rotation;
						if (Object.keys(geometry).length > 0) {
							body.geometry = geometry;
						}

						responseData = await miroApiRequest.call(this, 'PATCH', `/boards/${boardId}/documents/${itemId}`, body);
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await miroApiRequest.call(this, 'DELETE', `/boards/${boardId}/documents/${itemId}`);
						responseData = { success: true };
					}
				}

				// Return data
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
