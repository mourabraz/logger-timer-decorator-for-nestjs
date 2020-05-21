/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { Logger } from '@nestjs/common';

function LoggerTimer(
  data: {
    name: string;
    text?: string;
    type?: 'log' | 'error' | 'verbose' | 'warn' | 'debug';
    asyncFunc?: boolean;
  } = { name: '', text: '', type: 'log', asyncFunc: false },
): any {
  const { name, type, asyncFunc } = data;
  let { text } = data;

  return (
    target: any,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    // const logger = new Logger(name, true);

    const method = propertyDesciptor.value;

    if (!asyncFunc) {
      propertyDesciptor.value = function exec(...args: any[]): any {
        const params = args.map(a => JSON.stringify(a)).join();

        const result = method.apply(this, args);

        const r = JSON.stringify(result);

        if (!text) {
          text = `Call: ${propertyName}(${params}) => ${r}`;
        }

        if (type === 'error') {
          Logger.error(`${text}`, name);
        } else {
          Logger[type || 'log'](`${text}`, name, true);
        }

        return result;
      };
    } else {
      propertyDesciptor.value = async function exec(
        ...args: any[]
      ): Promise<any> {
        const params = args.map(a => JSON.stringify(a)).join();

        const result = await method.apply(this, args);

        const r = JSON.stringify(result);

        if (!text) {
          text = `Call: ${propertyName}(${params}) => ${r}`;
        }

        if (type === 'error') {
          Logger.error(`${text}`, name);
        } else {
          Logger[type || 'log'](`${text}`, name, true);
        }

        return result;
      };
    }

    return propertyDesciptor;
  };
}

LoggerTimer.logger = new Logger();

export { LoggerTimer };
