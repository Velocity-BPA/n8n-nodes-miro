/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

export interface INodeProperties {
  displayName: string;
  name: string;
  type: string;
  default?: any;
  description?: string;
  required?: boolean;
  options?: any[];
  displayOptions?: any;
  placeholder?: string;
  routing?: any;
}

export interface INodePropertyOptions {
  name: string;
  value: string;
  description?: string;
}

export interface IExecuteFunctions {
  getInputData(): any[];
  getNodeParameter(parameterName: string, itemIndex: number, fallbackValue?: any): any;
  getCredentials(type: string): Promise<any>;
  helpers: {
    request: (options: any) => Promise<any>;
    requestWithAuthentication: (credentialsType: string, options: any) => Promise<any>;
  };
  getNode(): any;
  continueOnFail(): boolean;
  getWorkflow(): any;
}

export interface ILoadOptionsFunctions {
  getCredentials(type: string): Promise<any>;
  helpers: {
    request: (options: any) => Promise<any>;
  };
  getNode(): any;
}

export interface ICredentialType {
  name: string;
  displayName: string;
  properties: INodeProperties[];
  authenticate?: any;
  test?: any;
}

export interface INodeType {
  description: any;
  execute?(this: IExecuteFunctions): Promise<any>;
}

export interface INodeExecutionData {
  json: any;
  binary?: any;
  pairedItem?: any;
}

export class NodeApiError extends Error {
  constructor(node: any, error: any, options?: any) {
    super(error.message || 'An error occurred');
    this.name = 'NodeApiError';
  }
}

export class NodeOperationError extends Error {
  constructor(node: any, message: string, options?: any) {
    super(message);
    this.name = 'NodeOperationError';
  }
}
