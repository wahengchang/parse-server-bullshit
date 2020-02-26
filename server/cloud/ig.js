const axios = require('axios')

Parse.Cloud.define("fetchMedia", async (req) => {
    try {
        const {params, user} = req
        const {url} = params

        const _url = (url.slice(-1) === '/') 
            ? url.substring(0, url.length-1)
            : url
        
        const res = await axios.get(`${_url}/?__a=1`)
        const {data} = res
    
        const caption = data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text
        const  imgUrl = data.graphql.shortcode_media.display_url

        return {
            caption,imgUrl
        }
        // const entities = await lg.analyzeEntities(text)
        // const syntax = await lg.analyzeSyntax(text)
        // return {entities, syntax}
    }
    catch(e) {
        throw new Error(e)
    }
});
