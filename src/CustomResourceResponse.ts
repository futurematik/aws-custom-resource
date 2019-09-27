export interface CustomResourceResponseBase {
  physicalResourceId: string;
  data?: { [key: string]: unknown };
  noEcho?: boolean;
}

export interface CustomResourceSuccessResponse
  extends CustomResourceResponseBase {
  responseStatus: 'SUCCESS';
  reason?: string;
}

export interface CustomResourceFailedResponse
  extends CustomResourceResponseBase {
  responseStatus: 'FAILED';
  reason: string;
}

export type CustomResourceResponse =
  | CustomResourceSuccessResponse
  | CustomResourceFailedResponse;
