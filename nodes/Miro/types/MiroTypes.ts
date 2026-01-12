/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

export type MiroResource =
	| 'board'
	| 'boardMember'
	| 'item'
	| 'stickyNote'
	| 'shape'
	| 'card'
	| 'frame'
	| 'connector'
	| 'image'
	| 'text'
	| 'tag'
	| 'document';

// Board Types
export interface IMiroBoard {
	id: string;
	name: string;
	description?: string;
	createdAt: string;
	modifiedAt: string;
	viewLink: string;
	accessLink?: string;
	team?: {
		id: string;
		name: string;
	};
	project?: {
		id: string;
		name: string;
	};
	owner?: {
		id: string;
		name: string;
	};
	policy?: IMiroBoardPolicy;
}

export interface IMiroBoardPolicy {
	sharingPolicy?: {
		access: 'private' | 'view' | 'comment' | 'edit';
		teamAccess: 'private' | 'view' | 'comment' | 'edit';
	};
	permissionsPolicy?: {
		collaborationToolsStartAccess: 'all_editors' | 'board_owners_and_coowners';
		copyAccess: 'anyone' | 'team_members' | 'board_owner';
		copyAccessLevel: 'anyone' | 'team_members' | 'team_editors' | 'board_owner';
		sharingAccess: 'team_members_with_editing_rights' | 'board_owners_and_coowners';
	};
}

// Board Member Types
export interface IMiroBoardMember {
	id: string;
	name: string;
	role: 'viewer' | 'commenter' | 'editor' | 'coowner' | 'owner';
}

// Position Types
export interface IMiroPosition {
	x: number;
	y: number;
	origin?: 'center';
	relativeTo?: string;
}

// Geometry Types
export interface IMiroGeometry {
	width?: number;
	height?: number;
	rotation?: number;
}

// Style Types
export interface IMiroStyle {
	fillColor?: string;
	fillOpacity?: string;
	fontFamily?: string;
	fontSize?: string;
	textAlign?: string;
	textAlignVertical?: string;
	borderColor?: string;
	borderWidth?: string;
	borderOpacity?: string;
	borderStyle?: string;
	color?: string;
}

// Item Types
export interface IMiroItem {
	id: string;
	type: string;
	createdAt?: string;
	modifiedAt?: string;
	createdBy?: {
		id: string;
		name: string;
	};
	modifiedBy?: {
		id: string;
		name: string;
	};
	position?: IMiroPosition;
	geometry?: IMiroGeometry;
	parent?: {
		id: string;
	};
}

// Sticky Note Types
export interface IMiroStickyNote extends IMiroItem {
	type: 'sticky_note';
	data: {
		content: string;
		shape: 'square' | 'rectangle';
	};
	style: {
		fillColor: string;
		textAlign: string;
		textAlignVertical: string;
	};
}

// Shape Types
export interface IMiroShape extends IMiroItem {
	type: 'shape';
	data: {
		content?: string;
		shape:
			| 'rectangle'
			| 'round_rectangle'
			| 'circle'
			| 'triangle'
			| 'rhombus'
			| 'parallelogram'
			| 'trapezoid'
			| 'pentagon'
			| 'hexagon'
			| 'octagon'
			| 'wedge_round_rectangle_callout'
			| 'star'
			| 'flow_chart_predefined_process'
			| 'cloud'
			| 'cross'
			| 'can'
			| 'right_arrow'
			| 'left_arrow'
			| 'left_right_arrow'
			| 'left_brace'
			| 'right_brace';
	};
	style: IMiroStyle;
}

// Card Types
export interface IMiroCard extends IMiroItem {
	type: 'card';
	data: {
		title: string;
		description?: string;
		dueDate?: string;
		assigneeId?: string;
		fields?: IMiroCardField[];
	};
	style: {
		cardTheme?: string;
	};
}

export interface IMiroCardField {
	value?: string;
	fillColor?: string;
	textColor?: string;
	iconShape?: string;
	iconUrl?: string;
	tooltip?: string;
}

// Frame Types
export interface IMiroFrame extends IMiroItem {
	type: 'frame';
	data: {
		title?: string;
		format?: 'custom' | 'a4' | 'letter' | 'desktop' | 'tablet' | 'phone';
		type?: 'freeform' | 'custom';
		showContent?: boolean;
	};
	style?: {
		fillColor?: string;
	};
	children?: string[];
	childrenIds?: string[];
}

// Connector Types
export interface IMiroConnector extends IMiroItem {
	type: 'connector';
	startItem?: {
		id: string;
		position?: {
			x: string;
			y: string;
		};
		snapTo?: 'auto' | 'top' | 'right' | 'bottom' | 'left';
	};
	endItem?: {
		id: string;
		position?: {
			x: string;
			y: string;
		};
		snapTo?: 'auto' | 'top' | 'right' | 'bottom' | 'left';
	};
	shape?: 'straight' | 'elbowed' | 'curved';
	style?: {
		strokeColor?: string;
		strokeWidth?: string;
		strokeStyle?: 'normal' | 'dotted' | 'dashed';
		startStrokeCap?: 'none' | 'stealth' | 'arrow' | 'filled_triangle' | 'triangle' | 'filled_diamond' | 'diamond' | 'filled_oval' | 'oval' | 'erd_one' | 'erd_many' | 'erd_one_or_many' | 'erd_zero_or_one' | 'erd_zero_or_many';
		endStrokeCap?: 'none' | 'stealth' | 'arrow' | 'filled_triangle' | 'triangle' | 'filled_diamond' | 'diamond' | 'filled_oval' | 'oval' | 'erd_one' | 'erd_many' | 'erd_one_or_many' | 'erd_zero_or_one' | 'erd_zero_or_many';
	};
	captions?: IMiroConnectorCaption[];
}

export interface IMiroConnectorCaption {
	content: string;
	position?: string;
	textAlignVertical?: 'top' | 'middle' | 'bottom';
}

// Image Types
export interface IMiroImage extends IMiroItem {
	type: 'image';
	data: {
		title?: string;
		url?: string;
		imageUrl?: string;
	};
}

// Text Types
export interface IMiroText extends IMiroItem {
	type: 'text';
	data: {
		content: string;
	};
	style?: IMiroStyle;
}

// Tag Types
export interface IMiroTag {
	id: string;
	title: string;
	fillColor: string;
}

// Document Types
export interface IMiroDocument extends IMiroItem {
	type: 'document';
	data: {
		title?: string;
		documentUrl?: string;
	};
}

// API Response Types
export interface IMiroPaginatedResponse<T> {
	data: T[];
	cursor?: string;
	size: number;
	total?: number;
	links?: {
		self: string;
		first?: string;
		last?: string;
		next?: string;
		prev?: string;
	};
}

export interface IMiroError {
	status: number;
	code: string;
	message: string;
	type: 'error';
}

// Webhook Types
export interface IMiroWebhookEvent {
	event: string;
	data: IDataObject;
	createdAt: string;
	createdBy: {
		id: string;
		name: string;
	};
}

// Sticky Note Colors
export type MiroStickyNoteColor =
	| 'gray'
	| 'light_yellow'
	| 'yellow'
	| 'orange'
	| 'light_green'
	| 'green'
	| 'dark_green'
	| 'cyan'
	| 'light_pink'
	| 'pink'
	| 'violet'
	| 'red'
	| 'light_blue'
	| 'blue'
	| 'dark_blue'
	| 'black';

// Tag Colors
export type MiroTagColor =
	| 'red'
	| 'light_green'
	| 'cyan'
	| 'yellow'
	| 'magenta'
	| 'green'
	| 'blue'
	| 'gray'
	| 'violet'
	| 'dark_green'
	| 'dark_blue'
	| 'black';

// Card Theme Colors
export type MiroCardTheme =
	| 'yellow'
	| 'green'
	| 'blue'
	| 'red'
	| 'light_green'
	| 'light_pink'
	| 'light_yellow'
	| 'magenta'
	| 'cyan'
	| 'gray'
	| 'violet'
	| 'black';

// Shape Types
export type MiroShapeType =
	| 'rectangle'
	| 'round_rectangle'
	| 'circle'
	| 'triangle'
	| 'rhombus'
	| 'parallelogram'
	| 'trapezoid'
	| 'pentagon'
	| 'hexagon'
	| 'octagon'
	| 'wedge_round_rectangle_callout'
	| 'star'
	| 'flow_chart_predefined_process'
	| 'cloud'
	| 'cross'
	| 'can'
	| 'right_arrow'
	| 'left_arrow'
	| 'left_right_arrow'
	| 'left_brace'
	| 'right_brace';
