const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const makeCommit = async (n) => {
  if (n === 0) return simpleGit().push();

  // Generate random integers using Math.random()
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const x = getRandomInt(54, 84);
  const y = getRandomInt(0, 6);
  const DATE = moment().subtract(1, "y").add(x, "w").add(y, "d").format();

  const data = {
    date: DATE,
  };

  console.log(DATE);
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
  });
};

const FILE_PATH = "./data.json";
makeCommit(10000);
