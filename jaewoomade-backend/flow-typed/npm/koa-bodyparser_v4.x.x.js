// flow-typed signature: ad1403b7f5aff011a947c0e97bd64478
// flow-typed version: e969a7af52/koa-bodyparser_v4.x.x/flow_>=v0.56.x

declare module "koa-bodyparser" {
  declare type Context = Object;

  declare type Middleware = (
    ctx: Context,
    next: () => Promise<void>
  ) => Promise<void> | void;

  declare type Options = {|
    enableTypes?: Array<string>,
    encode?: string,
    formLimit?: string,
    jsonLimit?: string,
    strict?: boolean,
    detectJSON?: (ctx: Context) => boolean,
    extendTypes?: {
      json?: Array<string>,
      form?: Array<string>,
      text?: Array<string>
    },
    onerror?: (err: Error, ctx: Context) => void
  |};

  declare module.exports: (opts?: Options) => Middleware;
}
