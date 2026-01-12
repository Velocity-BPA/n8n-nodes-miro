/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const boardMemberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['boardMember'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific board member',
				action: 'Get a board member',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many board members',
				action: 'Get many board members',
			},
			{
				name: 'Remove',
				value: 'remove',
				description: 'Remove a member from a board',
				action: 'Remove a board member',
			},
			{
				name: 'Share',
				value: 'share',
				description: 'Share a board with a user',
				action: 'Share a board',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a board member\'s role',
				action: 'Update a board member',
			},
		],
		default: 'getAll',
	},
];

export const boardMemberFields: INodeProperties[] = [
	// ----------------------------------
	//         boardMember: all operations
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
				resource: ['boardMember'],
			},
		},
	},

	// ----------------------------------
	//         boardMember: share
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		description: 'Email of the user to invite',
		displayOptions: {
			show: {
				resource: ['boardMember'],
				operation: ['share'],
			},
		},
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		required: true,
		options: [
			{ name: 'Viewer', value: 'viewer' },
			{ name: 'Commenter', value: 'commenter' },
			{ name: 'Editor', value: 'editor' },
			{ name: 'Co-Owner', value: 'coowner' },
		],
		default: 'viewer',
		description: 'Role to assign to the invited user',
		displayOptions: {
			show: {
				resource: ['boardMember'],
				operation: ['share'],
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
				resource: ['boardMember'],
				operation: ['share'],
			},
		},
		options: [
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Message to include in the invitation email',
			},
		],
	},

	// ----------------------------------
	//         boardMember: get, update, remove
	// ----------------------------------
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the board member',
		displayOptions: {
			show: {
				resource: ['boardMember'],
				operation: ['get', 'update', 'remove'],
			},
		},
	},

	// ----------------------------------
	//         boardMember: update
	// ----------------------------------
	{
		displayName: 'New Role',
		name: 'role',
		type: 'options',
		required: true,
		options: [
			{ name: 'Viewer', value: 'viewer' },
			{ name: 'Commenter', value: 'commenter' },
			{ name: 'Editor', value: 'editor' },
			{ name: 'Co-Owner', value: 'coowner' },
		],
		default: 'viewer',
		description: 'New role for the board member',
		displayOptions: {
			show: {
				resource: ['boardMember'],
				operation: ['update'],
			},
		},
	},

	// ----------------------------------
	//         boardMember: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['boardMember'],
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
				resource: ['boardMember'],
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
];
