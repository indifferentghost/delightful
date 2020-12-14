const { GoogleSpreadsheet } = require("google-spreadsheet");
const key = require("./env.json")

async function initConnection() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
  await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  	private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\\n/g, '\n')
	});
	console.log('sucessfully did thing')
  await doc.loadInfo();
  return doc;
}

function getSheet() {
  let doc;
  return async function () {
    if (!doc) {
      doc = await initConnection();
			console.log('doc.length', doc.length)
    }
    return doc.sheetsByIndex[0];
  };
}

const memoizedSheet = getSheet();
memoizedSheet();

module.exports.addRow = async function addRow(ctx) {
  try {
    const values = ctx.request.body;

		console.log(values);
    const sheet = await memoizedSheet();
    const row = await sheet.addRow(values);
    console.log(`row appended.`);
		ctx.status = 201;
  } catch (error) {
		// console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}
