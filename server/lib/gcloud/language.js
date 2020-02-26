const language = require('@google-cloud/language');

const analyzeSentiment = async (text) => {
  // Creates a client
  const client = new language.LanguageServiceClient()
  const document = {
    content: text,
    language: "zh",
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;
  return result
}

const analyzeEntities = async (text) => {
  // Creates a client
  const client = new language.LanguageServiceClient()
  const document = {
    content: text,
    language: "zh",
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeEntities({document: document});
  return result
}

const analyzeSyntax = async (text) => {
  // Creates a client
  const client = new language.LanguageServiceClient()
  const document = {
    content: text,
    language: "zh",
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSyntax({document: document});
  return result
}

module.exports = {analyzeSentiment, analyzeEntities, analyzeSyntax}