import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
  Context,
} from 'aws-lambda';
import { CustomResourceResponse } from './CustomResourceResponse';

export interface CustomResourceSpec<T> {
  create(
    params: T,
    event: CloudFormationCustomResourceCreateEvent,
    context: Context,
    autoId: string,
  ): Promise<CustomResourceResponse>;

  update?(
    params: T,
    event: CloudFormationCustomResourceUpdateEvent,
    context: Context,
  ): Promise<CustomResourceResponse>;

  delete?(
    params: T,
    event: CloudFormationCustomResourceDeleteEvent,
    context: Context,
  ): Promise<CustomResourceResponse>;
}
