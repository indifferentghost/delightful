const { GoogleSpreadsheet } = require("google-spreadsheet");

function initConnection() {
  let doc;
  return async function () {
    if (doc) {
      return doc;
    }

    doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\\n/g, "\n"),
    });
    console.log("sucessfully did thing");
    await doc.loadInfo();
    return doc;
  };
}

const connection = initConnection();
function getSheet() {
  let doc;
  return async function (index) {
    if (!doc) {
      doc = await connection();
      console.log("doc.length", doc.length);
    }
    return doc.sheetsByIndex[index];
  };
}

const memoizedSheet = getSheet();

module.exports.addReferralRow = async function addReferralRow(ctx) {
  try {
    const values = ctx.request.body;

    const sheet = await memoizedSheet(0);
    const row = await sheet.addRow(values);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
};

module.exports.addAcceptedReferral = async function addReferralRow(ctx) {
	try {
    const { referralId, userId, email } = ctx.request.body;

		console.log(ctx.request.body)

    const sheet = await memoizedSheet(1);
    const row = await sheet.addRow({ acceptedReferral: referralId, userId, email });
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}
