/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const stickyNoteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['stickyNote'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a sticky note',
				action: 'Create a sticky note',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a sticky note',
				action: 'Delete a sticky note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a sticky note',
				action: 'Get a sticky note',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a sticky note',
				action: 'Update a sticky note',
			},
		],
		default: 'create',
	},
];

export const stickyNoteFields: INodeProperties[] = [
	// ----------------------------------
	//         stickyNote: all operations
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
				resource: ['stickyNote'],
			},
		},
	},

	// ----------------------------------
	//         stickyNote: create
	// ----------------------------------
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		description: 'Text content of the sticky note',
		displayOptions: {
			show: {
				resource: ['stickyNote'],
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
				resource: ['stickyNote'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Shape',
				name: 'shape',
				type: 'options',
				options: [
					{ name: 'Square', value: 'square' },
					{ name: 'Rectangle', value: 'rectangle' },
				],
				default: 'square',
				description: 'Shape of the sticky note',
			},
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'options',
				options: [
					{ name: 'Gray', value: 'gray' },
					{ name: 'Light Yellow', value: 'light_yellow' },
					{ name: 'Yellow', value: 'yellow' },
					{ name: 'Orange', value: 'orange' },
					{ name: 'Light Green', value: 'light_green' },
					{ name: 'Green', value: 'green' },
					{ name: 'Dark Green', value: 'dark_green' },
					{ name: 'Cyan', value: 'cyan' },
					{ name: 'Light Pink', value: 'light_pink' },
					{ name: 'Pink', value: 'pink' },
					{ name: 'Violet', value: 'violet' },
					{ name: 'Red', value: 'red' },
					{ name: 'Light Blue', value: 'light_blue' },
					{ name: 'Blue', value: 'blue' },
					{ name: 'Dark Blue', value: 'dark_blue' },
					{ name: 'Black', value: 'black' },
				],
				default: 'light_yellow',
				description: 'Fill color of the sticky note',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the sticky note',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the sticky note',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 199,
				description: 'Width of the sticky note',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 228,
				description: 'Height of the sticky note',
			},
			{
				displayName: 'Parent Frame ID',
				name: 'parentId',
				type: 'string',
				default: '',
				description: 'ID of the parent frame',
			},
			{
				displayName: 'Text Align',
				name: 'textAlign',
				type: 'options',
				options: [
					{ name: 'Left', value: 'left' },
					{ name: 'Center', value: 'center' },
					{ name: 'Right', value: 'right' },
				],
				default: 'center',
				description: 'Horizontal text alignment',
			},
			{
				displayName: 'Text Align Vertical',
				name: 'textAlignVertical',
				type: 'options',
				options: [
					{ name: 'Top', value: 'top' },
					{ name: 'Middle', value: 'middle' },
					{ name: 'Bottom', value: 'bottom' },
				],
				default: 'middle',
				description: 'Vertical text alignment',
			},
		],
	},

	// ----------------------------------
	//         stickyNote: get, update, delete
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the sticky note',
		displayOptions: {
			show: {
				resource: ['stickyNote'],
				operation: ['get', 'update', 'delete'],
			},
		},
	},

	// ----------------------------------
	//         stickyNote: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['stickyNote'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				default: '',
				description: 'Text content of the sticky note',
			},
			{
				displayName: 'Shape',
				name: 'shape',
				type: 'options',
				options: [
					{ name: 'Square', value: 'square' },
					{ name: 'Rectangle', value: 'rectangle' },
				],
				default: 'square',
				description: 'Shape of the sticky note',
			},
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'options',
				options: [
					{ name: 'Gray', value: 'gray' },
					{ name: 'Light Yellow', value: 'light_yellow' },
					{ name: 'Yellow', value: 'yellow' },
					{ name: 'Orange', value: 'orange' },
					{ name: 'Light Green', value: 'light_green' },
					{ name: 'Green', value: 'green' },
					{ name: 'Dark Green', value: 'dark_green' },
					{ name: 'Cyan', value: 'cyan' },
					{ name: 'Light Pink', value: 'light_pink' },
					{ name: 'Pink', value: 'pink' },
					{ name: 'Violet', value: 'violet' },
					{ name: 'Red', value: 'red' },
					{ name: 'Light Blue', value: 'light_blue' },
					{ name: 'Blue', value: 'blue' },
					{ name: 'Dark Blue', value: 'dark_blue' },
					{ name: 'Black', value: 'black' },
				],
				default: 'light_yellow',
				description: 'Fill color of the sticky note',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the sticky note',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the sticky note',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 199,
				description: 'Width of the sticky note',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 228,
				description: 'Height of the sticky note',
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
];
