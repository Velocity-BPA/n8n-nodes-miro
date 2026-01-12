/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { MiroOAuth2Api } from '../../credentials/MiroOAuth2Api.credentials';

describe('MiroOAuth2Api Credentials', () => {
  let credentials: MiroOAuth2Api;

  beforeEach(() => {
    credentials = new MiroOAuth2Api();
  });

  describe('Credential Description', () => {
    it('should have correct name', () => {
      expect(credentials.name).toBe('miroOAuth2Api');
    });

    it('should have correct display name', () => {
      expect(credentials.displayName).toBe('Miro OAuth2 API');
    });

    it('should extend oAuth2Api', () => {
      expect(credentials.extends).toContain('oAuth2Api');
    });

    it('should have documentation URL', () => {
      expect(credentials.documentationUrl).toBeDefined();
    });
  });

  describe('Properties', () => {
    it('should have grantType property', () => {
      const grantType = credentials.properties.find(
        (p) => p.name === 'grantType'
      );
      expect(grantType).toBeDefined();
      expect(grantType?.default).toBe('authorizationCode');
    });

    it('should have authorization URL', () => {
      const authUrl = credentials.properties.find(
        (p) => p.name === 'authUrl'
      );
      expect(authUrl).toBeDefined();
      expect(authUrl?.default).toBe('https://miro.com/oauth/authorize');
    });

    it('should have access token URL', () => {
      const tokenUrl = credentials.properties.find(
        (p) => p.name === 'accessTokenUrl'
      );
      expect(tokenUrl).toBeDefined();
      expect(tokenUrl?.default).toBe('https://api.miro.com/v1/oauth/token');
    });

    it('should have default scope', () => {
      const scope = credentials.properties.find((p) => p.name === 'scope');
      expect(scope).toBeDefined();
      expect(scope?.default).toBe('boards:read boards:write');
    });

    it('should have authentication type set to body', () => {
      const authType = credentials.properties.find(
        (p) => p.name === 'authentication'
      );
      expect(authType).toBeDefined();
      expect(authType?.default).toBe('body');
    });
  });

  describe('Test Request', () => {
    it('should have test request configured', () => {
      expect(credentials.test).toBeDefined();
      expect(credentials.test?.request?.baseURL).toBe('https://api.miro.com/v2');
      expect(credentials.test?.request?.url).toBe('/boards');
    });
  });
});
