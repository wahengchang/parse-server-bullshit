const lg = require('../lib/gcloud/language')
const translate = require('../lib/gcloud/translate')

Parse.Cloud.define("langAnalyz", async (req) => {
    const {params, user} = req
    const {text} = params
    
    const entities = await lg.analyzeEntities(text)
    const syntax = await lg.analyzeSyntax(text)
    return {entities, syntax}
});

Parse.Cloud.define("translate", async (req) => {
    const {params, user} = req
    const {text} = params
    
    const _t = await translate.translate(text)
    return {text: _t}
});
