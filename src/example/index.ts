/* eslint-disable no-console */
import { LoggerTimer } from '../index';

class Client {
  private name: string;

  private lastName: string;

  constructor(name: string, lastName: string) {
    this.name = name;
    this.lastName = lastName;
  }

  @LoggerTimer({ name: Client.name, type: 'error' })
  static someStaticMethod(): string {
    return 'I am a static method!';
  }

  @LoggerTimer({
    name: Client.name,
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

  @LoggerTimer({ name: Client.name, text: 'Test fullName .....', type: 'warn' })
  fullName(): string {
    return `${this.name} ${this.lastName}`;
  }

  @LoggerTimer({
    name: Client.name,
    text: 'Test fullNameLowerCase .....',
    type: 'warn',
  })
  fullNameLowerCase(): string {
    return this.name.toLowerCase();
  }
}

const cliente1 = new Client('André', 'Prince');

Client.someStaticMethod();
Client.someStaticMethodAsync().then(console.log);
cliente1.fullName();
cliente1.fullNameLowerCase();
