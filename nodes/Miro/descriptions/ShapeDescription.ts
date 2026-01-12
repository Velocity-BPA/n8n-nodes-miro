/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const shapeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['shape'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a shape',
				action: 'Create a shape',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a shape',
				action: 'Delete a shape',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a shape',
				action: 'Get a shape',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a shape',
				action: 'Update a shape',
			},
		],
		default: 'create',
	},
];

export const shapeFields: INodeProperties[] = [
	// ----------------------------------
	//         shape: all operations
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
				resource: ['shape'],
			},
		},
	},

	// ----------------------------------
	//         shape: create
	// ----------------------------------
	{
		displayName: 'Shape Type',
		name: 'shapeType',
		type: 'options',
		required: true,
		options: [
			{ name: 'Can', value: 'can' },
			{ name: 'Circle', value: 'circle' },
			{ name: 'Cloud', value: 'cloud' },
			{ name: 'Cross', value: 'cross' },
			{ name: 'Flow Chart Predefined Process', value: 'flow_chart_predefined_process' },
			{ name: 'Hexagon', value: 'hexagon' },
			{ name: 'Left Arrow', value: 'left_arrow' },
			{ name: 'Left Brace', value: 'left_brace' },
			{ name: 'Left-Right Arrow', value: 'left_right_arrow' },
			{ name: 'Octagon', value: 'octagon' },
			{ name: 'Parallelogram', value: 'parallelogram' },
			{ name: 'Pentagon', value: 'pentagon' },
			{ name: 'Rectangle', value: 'rectangle' },
			{ name: 'Rhombus', value: 'rhombus' },
			{ name: 'Right Arrow', value: 'right_arrow' },
			{ name: 'Right Brace', value: 'right_brace' },
			{ name: 'Round Rectangle', value: 'round_rectangle' },
			{ name: 'Star', value: 'star' },
			{ name: 'Trapezoid', value: 'trapezoid' },
			{ name: 'Triangle', value: 'triangle' },
			{ name: 'Wedge Round Rectangle Callout', value: 'wedge_round_rectangle_callout' },
		],
		default: 'rectangle',
		description: 'Type of shape to create',
		displayOptions: {
			show: {
				resource: ['shape'],
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
				resource: ['shape'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				default: '',
				description: 'Text content of the shape',
			},
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'color',
				default: '#ffffff',
				description: 'Fill color of the shape',
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
				description: 'Opacity of the fill (0-1)',
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
				description: 'Font family for text',
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
				description: 'Font size for text',
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
				description: 'Text alignment',
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
			{
				displayName: 'Border Color',
				name: 'borderColor',
				type: 'color',
				default: '#1a1a1a',
				description: 'Border color of the shape',
			},
			{
				displayName: 'Border Width',
				name: 'borderWidth',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 24,
				},
				default: 2,
				description: 'Border width in pixels',
			},
			{
				displayName: 'Border Style',
				name: 'borderStyle',
				type: 'options',
				options: [
					{ name: 'Normal', value: 'normal' },
					{ name: 'Dotted', value: 'dotted' },
					{ name: 'Dashed', value: 'dashed' },
				],
				default: 'normal',
				description: 'Border style',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the shape',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the shape',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 100,
				description: 'Width of the shape',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 100,
				description: 'Height of the shape',
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
	//         shape: get, update, delete
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the shape',
		displayOptions: {
			show: {
				resource: ['shape'],
				operation: ['get', 'update', 'delete'],
			},
		},
	},

	// ----------------------------------
	//         shape: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['shape'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				default: '',
				description: 'Text content of the shape',
			},
			{
				displayName: 'Shape Type',
				name: 'shape',
				type: 'options',
				options: [
					{ name: 'Can', value: 'can' },
					{ name: 'Circle', value: 'circle' },
					{ name: 'Cloud', value: 'cloud' },
					{ name: 'Cross', value: 'cross' },
					{ name: 'Flow Chart Predefined Process', value: 'flow_chart_predefined_process' },
					{ name: 'Hexagon', value: 'hexagon' },
					{ name: 'Left Arrow', value: 'left_arrow' },
					{ name: 'Left Brace', value: 'left_brace' },
					{ name: 'Left-Right Arrow', value: 'left_right_arrow' },
					{ name: 'Octagon', value: 'octagon' },
					{ name: 'Parallelogram', value: 'parallelogram' },
					{ name: 'Pentagon', value: 'pentagon' },
					{ name: 'Rectangle', value: 'rectangle' },
					{ name: 'Rhombus', value: 'rhombus' },
					{ name: 'Right Arrow', value: 'right_arrow' },
					{ name: 'Right Brace', value: 'right_brace' },
					{ name: 'Round Rectangle', value: 'round_rectangle' },
					{ name: 'Star', value: 'star' },
					{ name: 'Trapezoid', value: 'trapezoid' },
					{ name: 'Triangle', value: 'triangle' },
					{ name: 'Wedge Round Rectangle Callout', value: 'wedge_round_rectangle_callout' },
				],
				default: 'rectangle',
				description: 'Type of shape',
			},
			{
				displayName: 'Fill Color',
				name: 'fillColor',
				type: 'color',
				default: '#ffffff',
				description: 'Fill color of the shape',
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
				description: 'Opacity of the fill (0-1)',
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
				description: 'Font size for text',
			},
			{
				displayName: 'Border Color',
				name: 'borderColor',
				type: 'color',
				default: '#1a1a1a',
				description: 'Border color of the shape',
			},
			{
				displayName: 'Border Width',
				name: 'borderWidth',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 24,
				},
				default: 2,
				description: 'Border width in pixels',
			},
			{
				displayName: 'Position X',
				name: 'x',
				type: 'number',
				default: 0,
				description: 'X coordinate of the shape',
			},
			{
				displayName: 'Position Y',
				name: 'y',
				type: 'number',
				default: 0,
				description: 'Y coordinate of the shape',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 100,
				description: 'Width of the shape',
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 100,
				description: 'Height of the shape',
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
