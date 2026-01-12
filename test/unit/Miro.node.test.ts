/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { Miro } from '../../nodes/Miro/Miro.node';

describe('Miro Node', () => {
  let miroNode: Miro;

  beforeEach(() => {
    miroNode = new Miro();
  });

  describe('Node Description', () => {
    it('should have correct display name', () => {
      expect(miroNode.description.displayName).toBe('Miro');
    });

    it('should have correct name', () => {
      expect(miroNode.description.name).toBe('miro');
    });

    it('should have correct icon', () => {
      expect(miroNode.description.icon).toBe('file:miro.svg');
    });

    it('should have correct group', () => {
      expect(miroNode.description.group).toContain('transform');
    });

    it('should have correct version', () => {
      expect(miroNode.description.version).toBe(1);
    });

    it('should have correct subtitle', () => {
      expect(miroNode.description.subtitle).toBe('={{$parameter["operation"] + ": " + $parameter["resource"]}}');
    });

    it('should require miroOAuth2Api credentials', () => {
      expect(miroNode.description.credentials).toContainEqual({
        name: 'miroOAuth2Api',
        required: true,
      });
    });
  });

  describe('Resources', () => {
    it('should have 12 resources', () => {
      const resourceProperty = miroNode.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProperty).toBeDefined();
      expect(resourceProperty!.options).toHaveLength(12);
    });

    it('should have board resource', () => {
      const resourceProperty = miroNode.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProperty).toBeDefined();
      const boardResource = resourceProperty!.options!.find(
        (o: any) => o.value === 'board'
      );
      expect(boardResource).toBeDefined();
      expect(boardResource!.name).toBe('Board');
    });

    it('should have stickyNote resource', () => {
      const resourceProperty = miroNode.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProperty).toBeDefined();
      const stickyNoteResource = resourceProperty!.options!.find(
        (o: any) => o.value === 'stickyNote'
      );
      expect(stickyNoteResource).toBeDefined();
      expect(stickyNoteResource!.name).toBe('Sticky Note');
    });

    it('should have connector resource', () => {
      const resourceProperty = miroNode.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProperty).toBeDefined();
      const connectorResource = resourceProperty!.options!.find(
        (o: any) => o.value === 'connector'
      );
      expect(connectorResource).toBeDefined();
      expect(connectorResource!.name).toBe('Connector');
    });

    it('should have tag resource', () => {
      const resourceProperty = miroNode.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProperty).toBeDefined();
      const tagResource = resourceProperty!.options!.find(
        (o: any) => o.value === 'tag'
      );
      expect(tagResource).toBeDefined();
      expect(tagResource!.name).toBe('Tag');
    });
  });

  describe('Operations', () => {
    it('should have operation property', () => {
      const operationProperty = miroNode.description.properties.find(
        (p: any) => p.name === 'operation'
      );
      expect(operationProperty).toBeDefined();
    });
  });

  describe('Input/Output', () => {
    it('should have single input', () => {
      expect(miroNode.description.inputs).toEqual(['main']);
    });

    it('should have single output', () => {
      expect(miroNode.description.outputs).toEqual(['main']);
    });
  });
});
