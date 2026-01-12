/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IPollFunctions,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, sleep } from 'n8n-workflow';

const BASE_URL = 'https://api.miro.com/v2';

/**
 * Make an authenticated request to the Miro API
 */
export async function miroApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<IDataObject> {
	const options: IRequestOptions = {
		method,
		uri: uri || `${BASE_URL}${endpoint}`,
		qs: query,
		body,
		json: true,
	};

	if (Object.keys(option).length > 0) {
		Object.assign(options, option);
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.requestOAuth2.call(this, 'miroOAuth2Api', options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an authenticated request to the Miro API with automatic retry for rate limiting
 */
export async function miroApiRequestWithRetry(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	maxRetries = 5,
): Promise<IDataObject> {
	let retries = 0;
	let delay = 1000; // Start with 1 second

	while (retries < maxRetries) {
		try {
			return await miroApiRequest.call(this, method, endpoint, body, query);
		} catch (error) {
			const statusCode = (error as JsonObject).statusCode as number;

			if (statusCode === 429) {
				// Rate limited
				retries++;
				if (retries >= maxRetries) {
					throw error;
				}

				// Exponential backoff
				await sleep(delay);
				delay = Math.min(delay * 2, 60000); // Max 60 seconds
			} else {
				throw error;
			}
		}
	}

	throw new Error('Max retries exceeded');
}

/**
 * Make an authenticated request to the Miro API and return all items using pagination
 */
export async function miroApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	dataKey = 'data',
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let cursor: string | undefined;

	query.limit = query.limit || 50;

	do {
		if (cursor) {
			query.cursor = cursor;
		}

		const response = await miroApiRequest.call(this, method, endpoint, body, query);

		const items = dataKey ? (response[dataKey] as IDataObject[]) : (response.data as IDataObject[]);
		if (items && Array.isArray(items)) {
			returnData.push(...items);
		}

		cursor = response.cursor as string | undefined;
	} while (cursor);

	return returnData;
}

/**
 * Upload a file to the Miro API
 */
export async function miroApiRequestUpload(
	this: IExecuteFunctions,
	endpoint: string,
	formData: IDataObject,
): Promise<IDataObject> {
	const options: IRequestOptions = {
		method: 'POST',
		uri: `${BASE_URL}${endpoint}`,
		formData,
		json: true,
	};

	try {
		const response = await this.helpers.requestOAuth2.call(this, 'miroOAuth2Api', options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Build query parameters for item creation/update
 */
export function buildItemBody(
	this: IExecuteFunctions,
	itemIndex: number,
	additionalFields: IDataObject,
): IDataObject {
	const body: IDataObject = {};
	const data: IDataObject = {};
	const style: IDataObject = {};
	const position: IDataObject = {};
	const geometry: IDataObject = {};

	// Process additional fields
	for (const [key, value] of Object.entries(additionalFields)) {
		if (value === undefined || value === null || value === '') continue;

		// Position fields
		if (key === 'positionX' || key === 'x') {
			position.x = value;
		} else if (key === 'positionY' || key === 'y') {
			position.y = value;
		} else if (key === 'origin') {
			position.origin = value;

		// Geometry fields
		} else if (key === 'width') {
			geometry.width = value;
		} else if (key === 'height') {
			geometry.height = value;
		} else if (key === 'rotation') {
			geometry.rotation = value;

		// Style fields
		} else if (
			key === 'fillColor' ||
			key === 'fillOpacity' ||
			key === 'fontFamily' ||
			key === 'fontSize' ||
			key === 'textAlign' ||
			key === 'textAlignVertical' ||
			key === 'borderColor' ||
			key === 'borderWidth' ||
			key === 'borderOpacity' ||
			key === 'borderStyle' ||
			key === 'color' ||
			key === 'cardTheme'
		) {
			style[key] = value;

		// Data fields
		} else if (
			key === 'content' ||
			key === 'shape' ||
			key === 'title' ||
			key === 'description' ||
			key === 'dueDate' ||
			key === 'assigneeId' ||
			key === 'format' ||
			key === 'type' ||
			key === 'showContent'
		) {
			data[key] = value;

		// Parent frame
		} else if (key === 'parentId') {
			body.parent = { id: value };

		// Other top-level fields
		} else {
			body[key] = value;
		}
	}

	// Only add objects if they have properties
	if (Object.keys(data).length > 0) {
		body.data = data;
	}
	if (Object.keys(style).length > 0) {
		body.style = style;
	}
	if (Object.keys(position).length > 0) {
		body.position = position;
	}
	if (Object.keys(geometry).length > 0) {
		body.geometry = geometry;
	}

	return body;
}

/**
 * Validate board ID format
 */
export function validateBoardId(boardId: string): void {
	if (!boardId || typeof boardId !== 'string' || boardId.trim() === '') {
		throw new Error('Board ID is required and must be a non-empty string');
	}
}

/**
 * Validate item ID format
 */
export function validateItemId(itemId: string): void {
	if (!itemId || typeof itemId !== 'string' || itemId.trim() === '') {
		throw new Error('Item ID is required and must be a non-empty string');
	}
}

/**
 * Get the board ID from parameters
 */
export function getBoardId(this: IExecuteFunctions, itemIndex: number): string {
	const boardId = this.getNodeParameter('boardId', itemIndex) as string;
	validateBoardId(boardId);
	return boardId;
}

/**
 * Get the item ID from parameters
 */
export function getItemId(this: IExecuteFunctions, itemIndex: number): string {
	const itemId = this.getNodeParameter('itemId', itemIndex) as string;
	validateItemId(itemId);
	return itemId;
}
