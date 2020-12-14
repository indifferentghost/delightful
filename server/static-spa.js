const fs = require("fs");
const Koa = require("koa");
const serve = require("koa-static");
const mount = require("koa-mount");
const historyApiFallback = require("connect-history-api-fallback");
const addTrailingSlashes = require("./addTrailingSlashes");

/**
 * serve spa files
 *
 * We create secondary koa app and call it "spa".
 * We create mount point under prefix "/app" by default for "spa".
 * We serve files from "folder" via koa-static.
 * We rewrite with historyApiFallback i.e.: /app/terms => /app
 */

module.exports = function ({ folder, prefix = "/", verbose = false }) {
  const spa = new Koa();
  const middleware = historyApiFallback({ verbose });

  spa.use(async (ctx, next) => {
    try {
      fs.statSync(folder).isDirectory();
    } catch (err) {
      ctx.throw("Invalid SPA folder", 404);
    }
    middleware(ctx, null, () => {});
    await next();
  });

  spa.use(serve(folder));

  return mount(spa);
};
