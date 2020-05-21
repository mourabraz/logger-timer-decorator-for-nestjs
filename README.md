# Logger for NestJs with timer

The purpose of this project is to **test a decorator implementation**. To be honest this project only contemplate a method decorator.

The decorator will execute the method and will log a message with the time through the Logger from NestJs/common. You can know more about the Logger [here](https://docs.nestjs.com/techniques/logger#logger).

## to see an example

1. install all dependencies and run the example script

```js
yarn
//or
npm install

// then

yarn example
//or
npm run example
```

## the decorator can receive an object as an argument to change the default output

For example:

```js
@LoggerTimer({
    name: MyClass.name,
    text: 'Test someStaticMethodAsync .....',
    asyncFunc: true,
    type: 'warn'
  })
  static async someStaticMethodAsync(): Promise<string> {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('teste');
      }, 2000),
    );
  }
```

- name: a string to identify the context
- text: the message associated
- asyncFunc: in order to use an async call, true or false
- type: to style de output and can be 'log', 'error', 'verbose', 'warn', 'debug';

## test with jest

```js
yarn test
//or
npm test
```

## to build and use as a library

```js
yarn build
//or
npm run build
```

# License

MIT © mourabraz@hotmail.com
