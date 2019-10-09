const path = require('path').resolve()
process.env.GOOGLE_APPLICATION_CREDENTIALS = path + '/lib/tritium-ai.json'

const { SessionsClient } = require('dialogflow')
const dialogClient = new SessionsClient()

exports.send = (id, msg, cb) => {
  dialogClient.detectIntent({ session: dialogClient.sessionPath('tritium-ai', id), queryInput: { text: { text: msg, languageCode: 'ko-KR' } } }).then((res) => {
    cb(res[0].queryResult.fulfillmentText)
  })
}
