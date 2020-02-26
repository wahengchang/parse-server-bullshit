const vision = require('@google-cloud/vision');

const getLabels = async (localPath) => {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection(localPath);
  const labels = result.labelAnnotations;
//   console.log('Labels:');
//   labels.forEach(label => console.log(label.description));

  return labels
}

module.exports = {getLabels}