const fetch = require("node-fetch");
const requestIp = require("request-ip");

const ipChecking = async (ctx, next) => {
  const clientIp = requestIp.getClientIp(ctx.request);
  const url = `https://tools.keycdn.com/geo.json?host=${clientIp}`;

  const params = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const { data } = await fetch(url, params)
      .then((request) => request.json())
      .catch(console.error);

    const coordinates = {
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    };

    ctx.coordinates = coordinates;
  } finally {
    await next();
  }
};

module.exports = ipChecking;
