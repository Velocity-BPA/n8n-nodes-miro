/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tag'],
			},
		},
		options: [
			{
				name: 'Attach to Item',
				value: 'attachToItem',
				description: 'Attach a tag to an item',
				action: 'Attach tag to item',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a tag',
				action: 'Create a tag',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a tag',
				action: 'Delete a tag',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a tag',
				action: 'Get a tag',
			},
			{
				name: 'Get Item Tags',
				value: 'getItemTags',
				description: 'Get tags attached to an item',
				action: 'Get tags on an item',
			},
			{
				name: 'Get Items by Tag',
				value: 'getItemsByTag',
				description: 'Get items with a specific tag',
				action: 'Get items by tag',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many tags from a board',
				action: 'Get many tags',
			},
			{
				name: 'Remove From Item',
				value: 'removeFromItem',
				description: 'Remove a tag from an item',
				action: 'Remove tag from item',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a tag',
				action: 'Update a tag',
			},
		],
		default: 'getAll',
	},
];

export const tagFields: INodeProperties[] = [
	// ----------------------------------
	//         tag: all operations
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
				resource: ['tag'],
			},
		},
	},

	// ----------------------------------
	//         tag: create
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'Title of the tag',
		displayOptions: {
			show: {
				resource: ['tag'],
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
				resource: ['tag'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'options',
				options: [
					{ name: 'Red', value: 'red' },
					{ name: 'Light Green', value: 'light_green' },
					{ name: 'Cyan', value: 'cyan' },
					{ name: 'Yellow', value: 'yellow' },
					{ name: 'Magenta', value: 'magenta' },
					{ name: 'Green', value: 'green' },
					{ name: 'Blue', value: 'blue' },
					{ name: 'Gray', value: 'gray' },
					{ name: 'Violet', value: 'violet' },
					{ name: 'Dark Green', value: 'dark_green' },
					{ name: 'Dark Blue', value: 'dark_blue' },
					{ name: 'Black', value: 'black' },
				],
				default: 'red',
				description: 'Color of the tag',
			},
		],
	},

	// ----------------------------------
	//         tag: get, update, delete, getItemsByTag
	// ----------------------------------
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the tag',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get', 'update', 'delete', 'getItemsByTag'],
			},
		},
	},

	// ----------------------------------
	//         tag: attachToItem, removeFromItem, getItemTags
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
				resource: ['tag'],
				operation: ['attachToItem', 'removeFromItem', 'getItemTags'],
			},
		},
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the tag',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['attachToItem', 'removeFromItem'],
			},
		},
	},

	// ----------------------------------
	//         tag: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['getAll', 'getItemsByTag'],
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
				resource: ['tag'],
				operation: ['getAll', 'getItemsByTag'],
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
	//         tag: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'New title for the tag',
			},
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'options',
				options: [
					{ name: 'Red', value: 'red' },
					{ name: 'Light Green', value: 'light_green' },
					{ name: 'Cyan', value: 'cyan' },
					{ name: 'Yellow', value: 'yellow' },
					{ name: 'Magenta', value: 'magenta' },
					{ name: 'Green', value: 'green' },
					{ name: 'Blue', value: 'blue' },
					{ name: 'Gray', value: 'gray' },
					{ name: 'Violet', value: 'violet' },
					{ name: 'Dark Green', value: 'dark_green' },
					{ name: 'Dark Blue', value: 'dark_blue' },
					{ name: 'Black', value: 'black' },
				],
				default: 'red',
				description: 'Color of the tag',
			},
		],
	},
];
