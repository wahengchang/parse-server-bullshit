const translateApi = require('@vitalets/google-translate-api');
 
const translate = (sourceText) => {
  return translateApi(sourceText, {to: 'zh-TW'}).then((res)=>{
    return res.text
  })
}

module.exports = {translate}