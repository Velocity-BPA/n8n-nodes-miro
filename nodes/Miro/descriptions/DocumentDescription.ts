/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Create From URL',
				value: 'createFromUrl',
				description: 'Create a document from a URL',
				action: 'Create a document from URL',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a document',
				action: 'Delete a document',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a document',
				action: 'Get a document',
			},
			{
				name: 'Update From URL',
				value: 'updateFromUrl',
				description: 'Update a document from a URL',
				action: 'Update a document from URL',
			},
		],
		default: 'createFromUrl',
	},
];

export const documentFields: INodeProperties[] = [
	// ----------------------------------
	//         document: all operations
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
				resource: ['document'],
			},
		},
	},

	// ----------------------------------
	//         document: createFromUrl
	// ----------------------------------
	{
		displayName: 'Document URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		description: 'URL of the document to add to the board (supports Google Docs, PDFs, etc.)',
		displayOptions: {
			show: {
				resource: ['document'],
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
				resource: ['document'],
				operation: ['createFromUrl'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the document',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the document',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the document',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 0,
				description: 'Width of the document preview (0 for auto)',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 0,
				description: 'Height of the document preview (0 for auto)',
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
	//         document: get, delete, updateFromUrl
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the document',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get', 'delete', 'updateFromUrl'],
			},
		},
	},

	// ----------------------------------
	//         document: updateFromUrl
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['updateFromUrl'],
			},
		},
		options: [
			{
				displayName: 'Document URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'New URL for the document',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the document',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the document',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the document',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 0,
				description: 'Width of the document preview',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 0,
				description: 'Height of the document preview',
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
