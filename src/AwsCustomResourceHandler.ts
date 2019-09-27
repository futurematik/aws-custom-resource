import { Context } from 'aws-lambda';
import { CloudFormationCustomResourceEvent } from 'aws-lambda';

export type AwsCustomResourceHandler = (
  event: CloudFormationCustomResourceEvent,
  context: Context,
) => PromiseLike<void>;
