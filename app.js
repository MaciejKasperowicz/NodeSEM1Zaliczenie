const fs = require("fs");

const startingData = fs.readFileSync("quotes.json", "utf-8");

if (!startingData) {
  fs.writeFileSync("quotes.json", "[]", "utf-8", err => {
    if (!err) {
      console.log(
        "Dodano pustą tablicę, aby nie wyrzuciło błędu przy parsowaniu"
      );
    } else {
      console.log(err.message);
    }
  });
}

const addCommand = require("./add");
const removeCommand = require("./remove");
const showCommand = require("./show");
const randomCommand = require("./random");
const classifiedCommand = require("./classified");
const externalCommand = require("./external");
require("yargs")
  .command(addCommand)
  .command(removeCommand)
  .command(showCommand)
  .command(randomCommand)
  .command(classifiedCommand)
  .command(externalCommand)
  .demandCommand(1, "Musisz podać przynajmniej jedno polecenie")
  .help().argv;
