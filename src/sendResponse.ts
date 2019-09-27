import { CloudFormationCustomResourceEvent } from 'aws-lambda';
import fetch from 'node-fetch';
import { CustomResourceResponse } from './CustomResourceResponse';

export async function sendResponse(
  result: CustomResourceResponse,
  event: CloudFormationCustomResourceEvent,
): Promise<void> {
  const response = {
    Status: result.responseStatus,
    Reason: result.reason,
    PhysicalResourceId: result.physicalResourceId,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    NoEcho: result.noEcho,
  };

  await fetch(event.ResponseURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response),
  });
}
