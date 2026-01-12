/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const textOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['text'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a text item',
				action: 'Create a text item',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a text item',
				action: 'Delete a text item',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a text item',
				action: 'Get a text item',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a text item',
				action: 'Update a text item',
			},
		],
		default: 'create',
	},
];

export const textFields: INodeProperties[] = [
	// ----------------------------------
	//         text: all operations
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
				resource: ['text'],
			},
		},
	},

	// ----------------------------------
	//         text: create
	// ----------------------------------
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		description: 'Text content (supports HTML subset: &lt;p&gt;, &lt;a&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;u&gt;, &lt;s&gt;)',
		displayOptions: {
			show: {
				resource: ['text'],
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
				resource: ['text'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'color',
				default: '#1a1a1a',
				description: 'Text color',
			},
			{
				displayName: 'Fill Opacity',
				name: 'fillOpacity',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberStepSize: 0.1,
				},
				default: 1,
				description: 'Text opacity (0-1)',
			},
			{
				displayName: 'Font Family',
				name: 'fontFamily',
				type: 'options',
				options: [
					{ name: 'Arial', value: 'arial' },
					{ name: 'Abril Fatface', value: 'abril_fatface' },
					{ name: 'Bangers', value: 'bangers' },
					{ name: 'EB Garamond', value: 'eb_garamond' },
					{ name: 'Georgia', value: 'georgia' },
					{ name: 'Graduate', value: 'graduate' },
					{ name: 'Gravitas One', value: 'gravitas_one' },
					{ name: 'Fredoka One', value: 'fredoka_one' },
					{ name: 'Nixie One', value: 'nixie_one' },
					{ name: 'Open Sans', value: 'open_sans' },
					{ name: 'Permanent Marker', value: 'permanent_marker' },
					{ name: 'PT Sans', value: 'pt_sans' },
					{ name: 'PT Sans Narrow', value: 'pt_sans_narrow' },
					{ name: 'PT Serif', value: 'pt_serif' },
					{ name: 'Rammetto One', value: 'rammetto_one' },
					{ name: 'Roboto', value: 'roboto' },
					{ name: 'Roboto Condensed', value: 'roboto_condensed' },
					{ name: 'Roboto Slab', value: 'roboto_slab' },
					{ name: 'Pacifico', value: 'pacifico' },
					{ name: 'Poppins', value: 'poppins' },
					{ name: 'Spoof', value: 'spoof' },
					{ name: 'Tiempos Text', value: 'tiempos_text' },
					{ name: 'Trash Hand', value: 'trash_hand' },
				],
				default: 'arial',
				description: 'Font family for the text',
			},
			{
				displayName: 'Font Size',
				name: 'fontSize',
				type: 'number',
				typeOptions: {
					minValue: 10,
					maxValue: 288,
				},
				default: 14,
				description: 'Font size in pixels',
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
				default: 'left',
				description: 'Text alignment',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the text',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the text',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 0,
				description: 'Width of the text box (0 for auto)',
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
	//         text: get, update, delete
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the text item',
		displayOptions: {
			show: {
				resource: ['text'],
				operation: ['get', 'update', 'delete'],
			},
		},
	},

	// ----------------------------------
	//         text: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['text'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				default: '',
				description: 'Text content',
			},
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'color',
				default: '#1a1a1a',
				description: 'Text color',
			},
			{
				displayName: 'Fill Opacity',
				name: 'fillOpacity',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberStepSize: 0.1,
				},
				default: 1,
				description: 'Text opacity (0-1)',
			},
			{
				displayName: 'Font Family',
				name: 'fontFamily',
				type: 'options',
				options: [
					{ name: 'Arial', value: 'arial' },
					{ name: 'Abril Fatface', value: 'abril_fatface' },
					{ name: 'Bangers', value: 'bangers' },
					{ name: 'EB Garamond', value: 'eb_garamond' },
					{ name: 'Georgia', value: 'georgia' },
					{ name: 'Graduate', value: 'graduate' },
					{ name: 'Gravitas One', value: 'gravitas_one' },
					{ name: 'Fredoka One', value: 'fredoka_one' },
					{ name: 'Nixie One', value: 'nixie_one' },
					{ name: 'Open Sans', value: 'open_sans' },
					{ name: 'Permanent Marker', value: 'permanent_marker' },
					{ name: 'PT Sans', value: 'pt_sans' },
					{ name: 'PT Sans Narrow', value: 'pt_sans_narrow' },
					{ name: 'PT Serif', value: 'pt_serif' },
					{ name: 'Rammetto One', value: 'rammetto_one' },
					{ name: 'Roboto', value: 'roboto' },
					{ name: 'Roboto Condensed', value: 'roboto_condensed' },
					{ name: 'Roboto Slab', value: 'roboto_slab' },
					{ name: 'Pacifico', value: 'pacifico' },
					{ name: 'Poppins', value: 'poppins' },
					{ name: 'Spoof', value: 'spoof' },
					{ name: 'Tiempos Text', value: 'tiempos_text' },
					{ name: 'Trash Hand', value: 'trash_hand' },
				],
				default: 'arial',
				description: 'Font family for the text',
			},
			{
				displayName: 'Font Size',
				name: 'fontSize',
				type: 'number',
				typeOptions: {
					minValue: 10,
					maxValue: 288,
				},
				default: 14,
				description: 'Font size in pixels',
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
				default: 'left',
				description: 'Text alignment',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the text',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the text',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 0,
				description: 'Width of the text box',
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
