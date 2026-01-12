/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const itemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['item'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an item',
				action: 'Delete an item',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an item by ID',
				action: 'Get an item',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many items from a board',
				action: 'Get many items',
			},
			{
				name: 'Update Position',
				value: 'updatePosition',
				description: 'Update an item\'s position',
				action: 'Update item position',
			},
		],
		default: 'getAll',
	},
];

export const itemFields: INodeProperties[] = [
	// ----------------------------------
	//         item: all operations
	// ----------------------------------
	{
		displayName: 'Board ID',
		name: 'boardId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the board',
		displayOptions: {
			show: {
				resource: ['item'],
			},
		},
	},

	// ----------------------------------
	//         item: get, delete, updatePosition
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the item',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['get', 'delete', 'updatePosition'],
			},
		},
	},

	// ----------------------------------
	//         item: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
		default: 20,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'multiOptions',
				options: [
					{ name: 'App Card', value: 'app_card' },
					{ name: 'Card', value: 'card' },
					{ name: 'Connector', value: 'connector' },
					{ name: 'Document', value: 'document' },
					{ name: 'Embed', value: 'embed' },
					{ name: 'Frame', value: 'frame' },
					{ name: 'Image', value: 'image' },
					{ name: 'Preview', value: 'preview' },
					{ name: 'Shape', value: 'shape' },
					{ name: 'Sticky Note', value: 'sticky_note' },
					{ name: 'Text', value: 'text' },
				],
				default: [],
				description: 'Filter items by type',
			},
		],
	},

	// ----------------------------------
	//         item: updatePosition
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['updatePosition'],
			},
		},
		options: [
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the item',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the item',
			},
			{
				displayName: 'Origin',
				name: 'origin',
				type: 'options',
				options: [
					{ name: 'Center', value: 'center' },
				],
				default: 'center',
				description: 'Origin point for positioning',
			},
			{
				displayName: 'Parent Frame ID',
				name: 'parentId',
				type: 'string',
				default: '',
				description: 'ID of the parent frame to move the item into',
			},
		],
	},
];
