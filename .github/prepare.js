global.XMLHttpRequest = undefined;
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");
const Fs = require("fs");
const Path = require("path");

const files = [
  "01-actions.test.js",
  "02-reducer.test.js",
  "03-Nav.test.js",
  "04-HouseCard.test.js",
  "05-Houses.test.js",
  "06-HouseDetail.test.js",
  "07-CreateHouse.test.js",
  "08-CharacterCard.test.js",
  "09-App.test.js",
];

function download(files) {
  const path = createPathIfNotExist(
    Path.resolve(__dirname, "..", "src", "__tests__")
  );
  const gets = files.map((file) =>
    downloadFile(
      `https://learning.soyhenry.com/toolbox/secure-downloads/cp-m2-got/${file}`,
      Path.resolve(path, file)
    )
  );
  return Promise.all(gets);
}

function createPathIfNotExist(path) {
  if (!Fs.existsSync(path)) {
    Fs.mkdirSync(path);
  }
  return path;
}

function downloadFile(url, path) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: { githubsha: process.env.GITHUB_SHA },
        responseType: "stream",
      })
      .then(
        (response) => {
          const writer = Fs.createWriteStream(path);
          response.data.pipe(writer);
          return new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
          });
        },
        (error) => console.log(error.response?.status)
      )
      .then((r) => {
        resolve(r);
      });
  });
}

download(files).then(() => {
  console.log("Prepare finished...");
});
