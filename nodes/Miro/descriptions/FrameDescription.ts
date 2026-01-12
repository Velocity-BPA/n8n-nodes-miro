/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const frameOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['frame'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a frame',
				action: 'Create a frame',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a frame',
				action: 'Delete a frame',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a frame',
				action: 'Get a frame',
			},
			{
				name: 'Get Items',
				value: 'getItems',
				description: 'Get items within a frame',
				action: 'Get items in a frame',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a frame',
				action: 'Update a frame',
			},
		],
		default: 'create',
	},
];

export const frameFields: INodeProperties[] = [
	// ----------------------------------
	//         frame: all operations
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
				resource: ['frame'],
			},
		},
	},

	// ----------------------------------
	//         frame: create
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['frame'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the frame',
			},
			{
				displayName: 'Frame Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Freeform', value: 'freeform' },
					{ name: 'Custom', value: 'custom' },
				],
				default: 'freeform',
				description: 'Type of frame',
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{ name: 'Custom', value: 'custom' },
					{ name: 'A4', value: 'a4' },
					{ name: 'Letter', value: 'letter' },
					{ name: 'Desktop', value: 'desktop' },
					{ name: 'Tablet', value: 'tablet' },
					{ name: 'Phone', value: 'phone' },
				],
				default: 'custom',
				description: 'Format preset for the frame',
			},
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'color',
				default: '#ffffff',
				description: 'Fill color of the frame',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the frame',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the frame',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 800,
				description: 'Width of the frame',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 600,
				description: 'Height of the frame',
			},
			{
				displayName: 'Show Content',
				name: 'showContent',
				type: 'boolean',
				default: true,
				description: 'Whether to show the content inside the frame',
			},
		],
	},

	// ----------------------------------
	//         frame: get, update, delete, getItems
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the frame',
		displayOptions: {
			show: {
				resource: ['frame'],
				operation: ['get', 'update', 'delete', 'getItems'],
			},
		},
	},

	// ----------------------------------
	//         frame: getItems
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['frame'],
				operation: ['getItems'],
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
				resource: ['frame'],
				operation: ['getItems'],
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

	// ----------------------------------
	//         frame: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['frame'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the frame',
			},
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'color',
				default: '#ffffff',
				description: 'Fill color of the frame',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the frame',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the frame',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 800,
				description: 'Width of the frame',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 600,
				description: 'Height of the frame',
			},
		],
	},
];
