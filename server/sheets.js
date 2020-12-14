const { GoogleSpreadsheet } = require("google-spreadsheet");

function initConnection() {
  let doc;
  return async function () {
    try {
      if (!doc) {
        doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
        await doc.useServiceAccountAuth({
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\\n/g, "\n"),
        });
        await doc.loadInfo();
      }

      return doc;
    } catch(error) {
			console.log('failed to load sreadsheet connection.')
			console.log(error)
		}
  };
}

const connection = initConnection();

async function getSheet(index) {
  const doc = await connection();
  return doc.sheetsByIndex[index];
}

module.exports.addReferralRow = async function addReferralRow(ctx) {
  try {
    const values = ctx.request.body;

    const sheet = await getSheet(0);
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

    console.log(ctx.request.body);

    const sheet = await getSheet(1);
    const row = await sheet.addRow({
      acceptedReferral: referralId,
      userId,
      email,
    });
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
};
