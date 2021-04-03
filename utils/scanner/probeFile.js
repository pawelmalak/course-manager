const ffmpeg = require('fluent-ffmpeg');
const probe = require('ffmpeg-probe');

const probeFile = async (filePath) => {
  const fileInfo = await probe(filePath);
  const videoStream = fileInfo.streams.filter(s => s.codec_type == 'video')[0];
  return {
    duration: fileInfo.format.duration,
    width: videoStream.width,
    height: videoStream.height
  }
}

module.exports = probeFile;