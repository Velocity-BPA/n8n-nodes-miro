/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Integration tests for Miro API
 *
 * These tests require valid Miro OAuth2 credentials to run.
 * Set the following environment variables before running:
 *   - MIRO_ACCESS_TOKEN: Valid Miro access token
 *   - MIRO_TEST_BOARD_ID: ID of a test board to use
 *
 * Run with: npm run test:integration
 */

interface MiroListResponse {
  data: any[];
  cursor?: string;
  size?: number;
  total?: number;
}

interface MiroBoardResponse {
  id: string;
  name: string;
  [key: string]: any;
}

describe('Miro API Integration Tests', () => {
  const accessToken = process.env.MIRO_ACCESS_TOKEN;
  const testBoardId = process.env.MIRO_TEST_BOARD_ID;

  beforeAll(() => {
    if (!accessToken) {
      console.warn(
        'MIRO_ACCESS_TOKEN not set. Integration tests will be skipped.'
      );
    }
    if (!testBoardId) {
      console.warn(
        'MIRO_TEST_BOARD_ID not set. Some integration tests will be skipped.'
      );
    }
  });

  describe('Board Operations', () => {
    it('should be able to list boards', async () => {
      if (!accessToken) {
        return;
      }

      const response = await fetch('https://api.miro.com/v2/boards?limit=1', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });

      expect(response.ok).toBe(true);
      const data = (await response.json()) as MiroListResponse;
      expect(data).toHaveProperty('data');
    });

    it('should be able to get a specific board', async () => {
      if (!accessToken || !testBoardId) {
        return;
      }

      const response = await fetch(
        `https://api.miro.com/v2/boards/${testBoardId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as MiroBoardResponse;
      expect(data).toHaveProperty('id', testBoardId);
    });
  });

  describe('Item Operations', () => {
    it('should be able to list items on a board', async () => {
      if (!accessToken || !testBoardId) {
        return;
      }

      const response = await fetch(
        `https://api.miro.com/v2/boards/${testBoardId}/items?limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as MiroListResponse;
      expect(data).toHaveProperty('data');
      expect(Array.isArray(data.data)).toBe(true);
    });
  });

  describe('Tag Operations', () => {
    it('should be able to list tags on a board', async () => {
      if (!accessToken || !testBoardId) {
        return;
      }

      const response = await fetch(
        `https://api.miro.com/v2/boards/${testBoardId}/tags`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as MiroListResponse;
      expect(data).toHaveProperty('data');
      expect(Array.isArray(data.data)).toBe(true);
    });
  });

  describe('Connector Operations', () => {
    it('should be able to list connectors on a board', async () => {
      if (!accessToken || !testBoardId) {
        return;
      }

      const response = await fetch(
        `https://api.miro.com/v2/boards/${testBoardId}/connectors`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as MiroListResponse;
      expect(data).toHaveProperty('data');
      expect(Array.isArray(data.data)).toBe(true);
    });
  });
});
