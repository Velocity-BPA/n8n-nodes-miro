/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const cardOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['card'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a card',
				action: 'Create a card',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a card',
				action: 'Delete a card',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a card',
				action: 'Get a card',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a card',
				action: 'Update a card',
			},
		],
		default: 'create',
	},
];

export const cardFields: INodeProperties[] = [
	// ----------------------------------
	//         card: all operations
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
				resource: ['card'],
			},
		},
	},

	// ----------------------------------
	//         card: create
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'Title of the card',
		displayOptions: {
			show: {
				resource: ['card'],
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
				resource: ['card'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the card',
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'Due date in ISO 8601 format',
			},
			{
				displayName: 'Assignee ID',
				name: 'assigneeId',
				type: 'string',
				default: '',
				description: 'ID of the user to assign the card to',
			},
			{
				displayName: 'Card Theme',
				name: 'cardTheme',
				type: 'options',
				options: [
					{ name: 'Yellow', value: 'yellow' },
					{ name: 'Green', value: 'green' },
					{ name: 'Blue', value: 'blue' },
					{ name: 'Red', value: 'red' },
					{ name: 'Light Green', value: 'light_green' },
					{ name: 'Light Pink', value: 'light_pink' },
					{ name: 'Light Yellow', value: 'light_yellow' },
					{ name: 'Magenta', value: 'magenta' },
					{ name: 'Cyan', value: 'cyan' },
					{ name: 'Gray', value: 'gray' },
					{ name: 'Violet', value: 'violet' },
					{ name: 'Black', value: 'black' },
				],
				default: 'yellow',
				description: 'Theme color of the card',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the card',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the card',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 320,
				description: 'Width of the card',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 170,
				description: 'Height of the card',
			},
			{
				displayName: 'Parent Frame ID',
				name: 'parentId',
				type: 'string',
				default: '',
				description: 'ID of the parent frame',
			},
		],
	},

	// ----------------------------------
	//         card: get, update, delete
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the card',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['get', 'update', 'delete'],
			},
		},
	},

	// ----------------------------------
	//         card: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the card',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the card',
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'Due date in ISO 8601 format',
			},
			{
				displayName: 'Assignee ID',
				name: 'assigneeId',
				type: 'string',
				default: '',
				description: 'ID of the user to assign the card to',
			},
			{
				displayName: 'Card Theme',
				name: 'cardTheme',
				type: 'options',
				options: [
					{ name: 'Yellow', value: 'yellow' },
					{ name: 'Green', value: 'green' },
					{ name: 'Blue', value: 'blue' },
					{ name: 'Red', value: 'red' },
					{ name: 'Light Green', value: 'light_green' },
					{ name: 'Light Pink', value: 'light_pink' },
					{ name: 'Light Yellow', value: 'light_yellow' },
					{ name: 'Magenta', value: 'magenta' },
					{ name: 'Cyan', value: 'cyan' },
					{ name: 'Gray', value: 'gray' },
					{ name: 'Violet', value: 'violet' },
					{ name: 'Black', value: 'black' },
				],
				default: 'yellow',
				description: 'Theme color of the card',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the card',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the card',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 320,
				description: 'Width of the card',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 170,
				description: 'Height of the card',
			},
		],
	},
];
