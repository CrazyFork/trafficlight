
## notes
这个库还是蛮有意思的的. 从某种程度上让koa开发更像是java里边的spring了, 而且简化了些 koa 上的操作.

以后如果写 koa 的话


* 详细的关于 decorator 的执行顺序 https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-evaluation
* method 上面的 decorator 优于 class 上面的 decorator 执行

  * 通过 `Reflect.getMetadata(MW_PREFIX, target) || [];` 这个 `MW_PREFIX` 的 refs 可以看出, method 上面的 `Reflect.defineMetadata` 是先执行的, 然后是 class instance 上面

* 从上面的 decorator 执行顺序和 `Controller` decorator 的定义可以得知, Use 必须放在 `Controller` 之前声明
  * 注意 decorator 的执行顺序, 高阶函数外层函数由上到下顺序执行, 高阶函数返回的函数由下到上顺序执行


* Controller 中如果指定了 @Inject, 就不能拿到 ctx 了, 反而是 @Inject 的值, 所以要拿 Context 需要通过 @Ctx decorator去拿

```

```













# Trafficlight 🚦

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9976a79a48a048a4a2194864e064567c)](https://www.codacy.com/app/Swimlane/trafficlight?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=swimlane/trafficlight&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/9976a79a48a048a4a2194864e064567c)](https://www.codacy.com/app/Swimlane/trafficlight?utm_source=github.com&utm_medium=referral&utm_content=swimlane/trafficlight&utm_campaign=Badge_Coverage) [![Build Status](https://travis-ci.org/swimlane/trafficlight.svg?branch=master)](https://travis-ci.org/swimlane/trafficlight) [![npm version](https://badge.fury.io/js/trafficlight.svg)](https://badge.fury.io/js/trafficlight)

A flexible NodeJS Routing Decorators for API Routing. Features include:

- Built for KOA2
- Bring-your-own router
- Bring-your-own body parser
- TypeScript and ES7 Support
- DI compatible

## Usage

### Building

`npm run build`

### Install

`npm i trafficlight --S`

*Note*: You must have [reflect-metadata](https://github.com/rbuckton/reflect-metadata) installed as a peer dependency

### Setup KOA

```ts
import 'reflect-metadata'; /* Must be singleton */
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as body from 'koa-better-body';

import { ProfileController } from './controllers';
import { bindRoutes } from 'trafficlight';

export function setupKoa() {
  const app = new Koa();

  app.use(body());
  buildRoutes(app);
  app.listen(3000);

  return app;
}

function buildRoutes(app) {
  const routerRoutes = new Router();

  // any router can be used, we support koa-router out of the box
  bindRoutes(routerRoutes, [ProfileController]);

  // if you are using with some sort of DI system you can pass
  // a third parameter callback to get the instance vs new ctrl.
  // bindRoutes(routerRoutes, [ProfileController], (ctrl) => injector.get(ctrl));

  app.use(routerRoutes.routes());
  app.use(routerRoutes.allowedMethods());
}
```

### Decorate the controller

```typescript
import { Controller, Get, Use, Param, Body, Delete, Put, Post, QueryParam } from 'trafficlight';

@Controller('/profile')
@Use(someMiddleware)
export class ProfileController {

  @Get()
  getAll(@QueryParam('filter') filter) {
    // return []
  }

  @Get('/:id')
  @Use(someMiddleware)
  getOne(@Param('id') id) {
    // return {}
  }

  @Post()
  create(@Body() body) {
    // return {}
  }

  @Post('/:id/upload')
  upload(@Param('id') id, @File() file) {
    // return {}
  }

  @Put('/:id')
  update(@Param('id') id, @Body() body) {
    // return {}
  }

  @Delete('/:id')
  destroy(@Param('id') id) {
    // return success
  }

}
```

## API

- `bindRoutes(routerTable, controllers, getter)` - Binds the controller to the route table.
- `Controller(url?)` - Top level controller decorator. Optional root url
- `Route(method, url?)` - Abstract method decorator, accepts method type, url
- `Get(url?)` - Http GET method, accepts URL
- `Post(url?)` - Http Post method, accepts URL
- `Put(url?)` - Http Put method, accepts URL
- `Delete(url?)` - Http Delete method, accepts URL
- `Params()` - Returns all the parameters passed in the request
- `Param(val)` - Returns a specific parameter passed in the request
- `File()` - Returns a single file in the request body
- `Files()` - Returns all files in the request body
- `QueryParams()` - Returns all the query parameters passed in the request url as an object
- `QueryParam(val)` - Returns a specific query parameter passed in the request url
- `Ctx()` - Returns the KOA context object
- `Req()` - Returns the Node request object
- `Request()` - Returns the KOA request object
- `Res()` - Returns the Node response object
- `Response()` - Returns the KOA response object
- `Body()` - Returns the request body object
- `Fields()` - Returns the request fields object
- `Use()` - Middleware decorator for class and functions

### Special return types

Since typescript doesn't allow decorators on return types. Certain type
has been added to indicate and allow for file download.

- `FileDownload: {fileName: string, mimeType: string, stream: ReadStream}`

## Inspiration

- [routing-controllers](https://github.com/pleerock/routing-controllers)
- [koa-decorators](https://github.com/DavidCai1993/koa-decorators)
- [koa-route-decorators](https://github.com/xmlking/koa-router-decorators)
- [route-decorators](https://github.com/buunguyen/route-decorators)

## Credits

`trafficlight` is a [Swimlane](http://swimlane.com) open-source project; we believe in giving back to the open-source community by sharing some of the projects we build for our application. Swimlane is an automated cyber security operations and incident response platform that enables cyber security teams to leverage threat intelligence, speed up incident response and automate security operations.
