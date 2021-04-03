const Jimp = require('jimp');

const generateRandomColor = () => {
  const color = `rgb(
    ${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)}
    )`;
  return color;
}

const generateCover = (
  width,
  height,
  path,
  text = '',
  color = generateRandomColor()
  ) => {
  new Jimp(width, height, color, (err, image) => {
    if (err) {
      throw err;
    }

    Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
      image.print(
        font, 0, 0,
        {
          text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        width,
        height
      );
      image.write(`${path}/cover.png`);
    });
  })
}

module.exports = generateCover;