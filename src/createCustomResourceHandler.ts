import uuid from 'uuid/v4';
import { AwsCustomResourceHandler } from './AwsCustomResourceHandler';
import { sendResponse } from './sendResponse';
import { CustomResourceSpec } from './CustomResourceSpec';
import { CustomResourceResponse } from './CustomResourceResponse';
import { ValueValidator } from './ValueValidator';
import { Logger } from './Logger';
import { makeDefaultLog } from './makeDefaultLog';

export interface CustomResourceHandlerOptions<T> {
  propertyValidator?: ValueValidator<T>;
  logger?: Logger;
}

export function createCustomResourceHandler<T>(
  spec: CustomResourceSpec<T>,
  options?: CustomResourceHandlerOptions<T>,
): AwsCustomResourceHandler {
  return async (event, context): Promise<void> => {
    const { propertyValidator = undefined, logger = makeDefaultLog() } =
      options || {};

    logger({
      message: `custom resource event`,
      event,
    });

    let physicalResourceId: string;

    if (event.RequestType === 'Create') {
      physicalResourceId = uuid();
    } else {
      physicalResourceId = event.PhysicalResourceId;
    }

    let response: CustomResourceResponse = {
      responseStatus: 'SUCCESS',
      physicalResourceId,
    };

    try {
      let props = (event.ResourceProperties as unknown) as T;

      if (propertyValidator) {
        const result = propertyValidator(props);

        if (!result.ok) {
          logger({ message: `validation error`, errors: result.errors });
          throw new Error(`validation error`);
        }

        props = result.value;
      }

      switch (event.RequestType) {
        case 'Create':
          response = await spec.create(props, event, context);
          break;

        case 'Update':
          if (spec.update) {
            response = await spec.update(props, event, context);
          } else {
            logger({
              message: `no handler provided for request type '${event.RequestType}'`,
            });
          }
          break;

        case 'Delete':
          if (spec.delete) {
            response = await spec.delete(props, event, context);
          } else {
            logger({
              message: `no handler provided for request type '${event.RequestType}'`,
            });
          }
          break;

        default:
          logger({
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            message: `unknown request type '${(event as any).RequestType}'`,
          });
          break;
      }
    } catch (e) {
      logger(e);
      let reason = '';

      if ('message' in e && typeof e.message === 'string') {
        reason = e.message;
      } else {
        reason = e.toString();
      }

      response = {
        physicalResourceId,
        responseStatus: 'FAILED',
        reason,
      };
    }

    logger({ message: `sending response`, response });
    await sendResponse(response, event);
  };
}
