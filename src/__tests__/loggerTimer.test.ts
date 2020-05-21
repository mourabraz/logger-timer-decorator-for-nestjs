/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import { Logger } from '@nestjs/common';
import { LoggerTimer } from '../index';

describe('@LoggerTimer Decorator', () => {
  class Test {
    @LoggerTimer({ name: Test.name, type: 'error' })
    testeLoggerTimerError(): string {
      return 'I am a method!';
    }

    @LoggerTimer({ name: Test.name, type: 'warn' })
    testeLoggerTimerWarn(): string {
      return 'I am a method!';
    }

    @LoggerTimer({ name: Test.name, type: 'debug' })
    testeLoggerTimerDebug(): string {
      return 'I am a method!';
    }

    @LoggerTimer({ name: Test.name, type: 'verbose' })
    testeLoggerTimerVerbose(): string {
      return 'I am a method!';
    }

    @LoggerTimer({ name: Test.name })
    testeLoggerTimerLog(): string {
      return 'I am a method!';
    }

    @LoggerTimer({
      name: Test.name,
      text: 'Test someStaticMethodAsync .....',
      asyncFunc: true,
    })
    static async someStaticMethodAsync(): Promise<string> {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve('teste');
        }, 2000),
      );
    }
  }

  beforeEach(() => {
    jest.spyOn(Logger, 'log').mockImplementation(() => 'LOG');
    jest.spyOn(Logger, 'error').mockImplementation(() => 'ERROR');
    jest.spyOn(Logger, 'debug').mockImplementation(() => 'DEBUG');
    jest.spyOn(Logger, 'verbose').mockImplementation(() => 'VERBOSE');
    jest.spyOn(Logger, 'warn').mockImplementation(() => 'WARN');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call Logger.log', () => {
    new Test().testeLoggerTimerLog();

    expect(Logger.log).toBeCalled();
  });
  it('should call Logger.warn', () => {
    new Test().testeLoggerTimerWarn();

    expect(Logger.warn).toBeCalled();
  });
  it('should call Logger.debug', () => {
    new Test().testeLoggerTimerDebug();

    expect(Logger.debug).toBeCalled();
  });
  it('should call Logger.verbose', () => {
    new Test().testeLoggerTimerVerbose();

    expect(Logger.verbose).toBeCalled();
  });
  it('should call Logger.error', () => {
    new Test().testeLoggerTimerError();

    expect(Logger.error).toBeCalled();
  });
});
