/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const boardOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['board'],
			},
		},
		options: [
			{
				name: 'Copy',
				value: 'copy',
				description: 'Copy an existing board',
				action: 'Copy a board',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new board',
				action: 'Create a board',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a board',
				action: 'Delete a board',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a board by ID',
				action: 'Get a board',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many boards',
				action: 'Get many boards',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a board',
				action: 'Update a board',
			},
		],
		default: 'getAll',
	},
];

export const boardFields: INodeProperties[] = [
	// ----------------------------------
	//         board: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the board',
		displayOptions: {
			show: {
				resource: ['board'],
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
				resource: ['board'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the board',
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				default: '',
				description: 'ID of the team to create the board in',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				description: 'ID of the project to add the board to',
			},
			{
				displayName: 'Sharing Policy - Access',
				name: 'sharingPolicyAccess',
				type: 'options',
				options: [
					{ name: 'Private', value: 'private' },
					{ name: 'View', value: 'view' },
					{ name: 'Comment', value: 'comment' },
					{ name: 'Edit', value: 'edit' },
				],
				default: 'private',
				description: 'Default access level for sharing',
			},
			{
				displayName: 'Sharing Policy - Team Access',
				name: 'sharingPolicyTeamAccess',
				type: 'options',
				options: [
					{ name: 'Private', value: 'private' },
					{ name: 'View', value: 'view' },
					{ name: 'Comment', value: 'comment' },
					{ name: 'Edit', value: 'edit' },
				],
				default: 'private',
				description: 'Default team access level',
			},
			{
				displayName: 'Copy Access Level',
				name: 'copyAccessLevel',
				type: 'options',
				options: [
					{ name: 'Anyone', value: 'anyone' },
					{ name: 'Team Members', value: 'team_members' },
					{ name: 'Team Editors', value: 'team_editors' },
					{ name: 'Board Owner', value: 'board_owner' },
				],
				default: 'anyone',
				description: 'Who can copy the board',
			},
		],
	},

	// ----------------------------------
	//         board: get
	// ----------------------------------
	{
		displayName: 'Board ID',
		name: 'boardId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the board to retrieve',
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['get', 'update', 'delete', 'copy'],
			},
		},
	},

	// ----------------------------------
	//         board: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['board'],
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
				resource: ['board'],
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Team ID',
				name: 'team_id',
				type: 'string',
				default: '',
				description: 'Filter boards by team ID',
			},
			{
				displayName: 'Project ID',
				name: 'project_id',
				type: 'string',
				default: '',
				description: 'Filter boards by project ID',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query to filter boards',
			},
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'string',
				default: '',
				description: 'Filter boards by owner ID',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Default', value: 'default' },
					{ name: 'Last Modified', value: 'last_modified' },
					{ name: 'Last Opened', value: 'last_opened' },
					{ name: 'Last Created', value: 'last_created' },
					{ name: 'Alphabetically', value: 'alphabetically' },
				],
				default: 'default',
				description: 'Sort order for the results',
			},
		],
	},

	// ----------------------------------
	//         board: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name for the board',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description for the board',
			},
			{
				displayName: 'Sharing Policy - Access',
				name: 'sharingPolicyAccess',
				type: 'options',
				options: [
					{ name: 'Private', value: 'private' },
					{ name: 'View', value: 'view' },
					{ name: 'Comment', value: 'comment' },
					{ name: 'Edit', value: 'edit' },
				],
				default: 'private',
				description: 'Default access level for sharing',
			},
			{
				displayName: 'Sharing Policy - Team Access',
				name: 'sharingPolicyTeamAccess',
				type: 'options',
				options: [
					{ name: 'Private', value: 'private' },
					{ name: 'View', value: 'view' },
					{ name: 'Comment', value: 'comment' },
					{ name: 'Edit', value: 'edit' },
				],
				default: 'private',
				description: 'Default team access level',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				description: 'Move board to a different project',
			},
		],
	},

	// ----------------------------------
	//         board: copy
	// ----------------------------------
	{
		displayName: 'Copy Options',
		name: 'copyOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['board'],
				operation: ['copy'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name for the copied board (defaults to "Copy of [original name]")',
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				default: '',
				description: 'ID of the team to copy the board to',
			},
		],
	},
];
