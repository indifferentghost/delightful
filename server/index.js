if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const fetch = require("node-fetch");
const requestIp = require("request-ip");
const ipChecking = require("./ipChecking");
const { addReferralRow, addAcceptedReferral } = require("./sheets");

const PORT = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();
const logger = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
  }
  console.log(`${ctx.status}: ${ctx.request.method} ${ctx.request.url}`);
};

router.get("/api/proxy", async (ctx) => {
  const { term } = ctx.query;
  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=Chicago, IL`;

  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.YELP_API}`,
    },
    redirect: "follow",
  };

  const result = await fetch(url, params)
    .then((request) => request.json())
    .catch(console.error);

  result.coordinates = ctx.coordinates;

  ctx.status = 200;
  ctx.body = result;
});

console.log("loading /api/refer");
router.post("/api/refer", addReferralRow);
router.post("/api/accept", addAcceptedReferral);

app.use(cors({ origin: "*" }));
app.use(logger);
app.use(ipChecking);
app.use(bodyParser());
if (process.env.NODE_ENV === "production") {
  app.use(serve("build"));
}
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`listening Port ${PORT}...\n`);
});
