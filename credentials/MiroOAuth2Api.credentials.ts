/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MiroOAuth2Api implements ICredentialType {
	name = 'miroOAuth2Api';
	displayName = 'Miro OAuth2 API';
	documentationUrl = 'https://developers.miro.com/docs/getting-started';
	extends = ['oAuth2Api'];

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://miro.com/oauth/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://api.miro.com/v1/oauth/token',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'boards:read boards:write',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.miro.com/v2',
			url: '/boards',
			method: 'GET',
			qs: {
				limit: 1,
			},
		},
	};
}
