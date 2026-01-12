/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const imageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['image'],
			},
		},
		options: [
			{
				name: 'Create From URL',
				value: 'createFromUrl',
				description: 'Create an image from a URL',
				action: 'Create an image from URL',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an image',
				action: 'Delete an image',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an image',
				action: 'Get an image',
			},
			{
				name: 'Update From URL',
				value: 'updateFromUrl',
				description: 'Update an image from a URL',
				action: 'Update an image from URL',
			},
		],
		default: 'createFromUrl',
	},
];

export const imageFields: INodeProperties[] = [
	// ----------------------------------
	//         image: all operations
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
				resource: ['image'],
			},
		},
	},

	// ----------------------------------
	//         image: createFromUrl
	// ----------------------------------
	{
		displayName: 'Image URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		description: 'URL of the image to add to the board',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['createFromUrl'],
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
				resource: ['image'],
				operation: ['createFromUrl'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the image',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the image',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the image',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 0,
				description: 'Width of the image (0 for auto)',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 0,
				description: 'Height of the image (0 for auto)',
			},
			{
				displayName: 'Rotation',
				name: 'rotation',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 360,
				},
				default: 0,
				description: 'Rotation angle in degrees',
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
	//         image: get, delete
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the image',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['get', 'delete', 'updateFromUrl'],
			},
		},
	},

	// ----------------------------------
	//         image: updateFromUrl
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['updateFromUrl'],
			},
		},
		options: [
			{
				displayName: 'Image URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'New URL for the image',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the image',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the image',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the image',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 0,
				description: 'Width of the image',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 0,
				description: 'Height of the image',
			},
			{
				displayName: 'Rotation',
				name: 'rotation',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 360,
				},
				default: 0,
				description: 'Rotation angle in degrees',
			},
		],
	},
];
