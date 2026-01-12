/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const connectorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['connector'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a connector',
				action: 'Create a connector',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a connector',
				action: 'Delete a connector',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a connector',
				action: 'Get a connector',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many connectors',
				action: 'Get many connectors',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a connector',
				action: 'Update a connector',
			},
		],
		default: 'create',
	},
];

export const connectorFields: INodeProperties[] = [
	// ----------------------------------
	//         connector: all operations
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
				resource: ['connector'],
			},
		},
	},

	// ----------------------------------
	//         connector: create
	// ----------------------------------
	{
		displayName: 'Start Item ID',
		name: 'startItemId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the item where the connector starts',
		displayOptions: {
			show: {
				resource: ['connector'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'End Item ID',
		name: 'endItemId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the item where the connector ends',
		displayOptions: {
			show: {
				resource: ['connector'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['connector'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Shape',
				name: 'shape',
				type: 'options',
				options: [
					{ name: 'Straight', value: 'straight' },
					{ name: 'Elbowed', value: 'elbowed' },
					{ name: 'Curved', value: 'curved' },
				],
				default: 'curved',
				description: 'Shape of the connector line',
			},
			{
				displayName: 'Start Snap To',
				name: 'startSnapTo',
				type: 'options',
				options: [
					{ name: 'Auto', value: 'auto' },
					{ name: 'Top', value: 'top' },
					{ name: 'Right', value: 'right' },
					{ name: 'Bottom', value: 'bottom' },
					{ name: 'Left', value: 'left' },
				],
				default: 'auto',
				description: 'Where on the start item to attach the connector',
			},
			{
				displayName: 'End Snap To',
				name: 'endSnapTo',
				type: 'options',
				options: [
					{ name: 'Auto', value: 'auto' },
					{ name: 'Top', value: 'top' },
					{ name: 'Right', value: 'right' },
					{ name: 'Bottom', value: 'bottom' },
					{ name: 'Left', value: 'left' },
				],
				default: 'auto',
				description: 'Where on the end item to attach the connector',
			},
			{
				displayName: 'Stroke Color',
				name: 'strokeColor',
				type: 'color',
				default: '#1a1a1a',
				description: 'Color of the connector line',
			},
			{
				displayName: 'Stroke Width',
				name: 'strokeWidth',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 24,
				},
				default: 1,
				description: 'Width of the connector line',
			},
			{
				displayName: 'Stroke Style',
				name: 'strokeStyle',
				type: 'options',
				options: [
					{ name: 'Normal', value: 'normal' },
					{ name: 'Dotted', value: 'dotted' },
					{ name: 'Dashed', value: 'dashed' },
				],
				default: 'normal',
				description: 'Style of the connector line',
			},
			{
				displayName: 'Start Stroke Cap',
				name: 'startStrokeCap',
				type: 'options',
				options: [
					{ name: 'None', value: 'none' },
					{ name: 'Arrow', value: 'arrow' },
					{ name: 'Stealth', value: 'stealth' },
					{ name: 'Filled Triangle', value: 'filled_triangle' },
					{ name: 'Triangle', value: 'triangle' },
					{ name: 'Filled Diamond', value: 'filled_diamond' },
					{ name: 'Diamond', value: 'diamond' },
					{ name: 'Filled Oval', value: 'filled_oval' },
					{ name: 'Oval', value: 'oval' },
					{ name: 'ERD One', value: 'erd_one' },
					{ name: 'ERD Many', value: 'erd_many' },
					{ name: 'ERD One or Many', value: 'erd_one_or_many' },
					{ name: 'ERD Zero or One', value: 'erd_zero_or_one' },
					{ name: 'ERD Zero or Many', value: 'erd_zero_or_many' },
				],
				default: 'none',
				description: 'Cap style at the start of the connector',
			},
			{
				displayName: 'End Stroke Cap',
				name: 'endStrokeCap',
				type: 'options',
				options: [
					{ name: 'None', value: 'none' },
					{ name: 'Arrow', value: 'arrow' },
					{ name: 'Stealth', value: 'stealth' },
					{ name: 'Filled Triangle', value: 'filled_triangle' },
					{ name: 'Triangle', value: 'triangle' },
					{ name: 'Filled Diamond', value: 'filled_diamond' },
					{ name: 'Diamond', value: 'diamond' },
					{ name: 'Filled Oval', value: 'filled_oval' },
					{ name: 'Oval', value: 'oval' },
					{ name: 'ERD One', value: 'erd_one' },
					{ name: 'ERD Many', value: 'erd_many' },
					{ name: 'ERD One or Many', value: 'erd_one_or_many' },
					{ name: 'ERD Zero or One', value: 'erd_zero_or_one' },
					{ name: 'ERD Zero or Many', value: 'erd_zero_or_many' },
				],
				default: 'stealth',
				description: 'Cap style at the end of the connector',
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				default: '',
				description: 'Text caption to display on the connector',
			},
		],
	},

	// ----------------------------------
	//         connector: get, update, delete
	// ----------------------------------
	{
		displayName: 'Connector ID',
		name: 'connectorId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the connector',
		displayOptions: {
			show: {
				resource: ['connector'],
				operation: ['get', 'update', 'delete'],
			},
		},
	},

	// ----------------------------------
	//         connector: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['connector'],
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
				resource: ['connector'],
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

	// ----------------------------------
	//         connector: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['connector'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Start Item ID',
				name: 'startItemId',
				type: 'string',
				default: '',
				description: 'ID of the item where the connector starts',
			},
			{
				displayName: 'End Item ID',
				name: 'endItemId',
				type: 'string',
				default: '',
				description: 'ID of the item where the connector ends',
			},
			{
				displayName: 'Shape',
				name: 'shape',
				type: 'options',
				options: [
					{ name: 'Straight', value: 'straight' },
					{ name: 'Elbowed', value: 'elbowed' },
					{ name: 'Curved', value: 'curved' },
				],
				default: 'curved',
				description: 'Shape of the connector line',
			},
			{
				displayName: 'Stroke Color',
				name: 'strokeColor',
				type: 'color',
				default: '#1a1a1a',
				description: 'Color of the connector line',
			},
			{
				displayName: 'Stroke Width',
				name: 'strokeWidth',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 24,
				},
				default: 1,
				description: 'Width of the connector line',
			},
			{
				displayName: 'Stroke Style',
				name: 'strokeStyle',
				type: 'options',
				options: [
					{ name: 'Normal', value: 'normal' },
					{ name: 'Dotted', value: 'dotted' },
					{ name: 'Dashed', value: 'dashed' },
				],
				default: 'normal',
				description: 'Style of the connector line',
			},
			{
				displayName: 'Start Stroke Cap',
				name: 'startStrokeCap',
				type: 'options',
				options: [
					{ name: 'None', value: 'none' },
					{ name: 'Arrow', value: 'arrow' },
					{ name: 'Stealth', value: 'stealth' },
					{ name: 'Filled Triangle', value: 'filled_triangle' },
					{ name: 'Triangle', value: 'triangle' },
					{ name: 'Filled Diamond', value: 'filled_diamond' },
					{ name: 'Diamond', value: 'diamond' },
					{ name: 'Filled Oval', value: 'filled_oval' },
					{ name: 'Oval', value: 'oval' },
				],
				default: 'none',
				description: 'Cap style at the start of the connector',
			},
			{
				displayName: 'End Stroke Cap',
				name: 'endStrokeCap',
				type: 'options',
				options: [
					{ name: 'None', value: 'none' },
					{ name: 'Arrow', value: 'arrow' },
					{ name: 'Stealth', value: 'stealth' },
					{ name: 'Filled Triangle', value: 'filled_triangle' },
					{ name: 'Triangle', value: 'triangle' },
					{ name: 'Filled Diamond', value: 'filled_diamond' },
					{ name: 'Diamond', value: 'diamond' },
					{ name: 'Filled Oval', value: 'filled_oval' },
					{ name: 'Oval', value: 'oval' },
				],
				default: 'stealth',
				description: 'Cap style at the end of the connector',
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				default: '',
				description: 'Text caption to display on the connector',
			},
		],
	},
];
