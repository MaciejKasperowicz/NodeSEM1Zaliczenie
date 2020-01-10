const fs = require("fs");

const removeQuoteHandler = args => {
  fs.readFile("quotes.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      let quotes = JSON.parse(data);
      const isExisted = quotes.find(quote => quote.id === args.id)
        ? true
        : false;
      //   console.log("Quote przed: ", quotes);
      if (!isExisted) {
        return console.log(`Nie można usunąć cytatu, którego nie ma.`);
      }
      const quoteToRemoveIndex = quotes.findIndex(
        quote => quote.id === args.id
      );
      quotes.splice(quoteToRemoveIndex, 1);
      //   console.log("Quote po: ", quotes);
      quotes.map((quote, index) => (quote.id = index));

      quotesStringify = JSON.stringify(quotes);
      fs.writeFile("quotes.json", quotesStringify, "utf-8", err => {
        if (!err) {
          console.log(
            `Usunięto cytat o id: ${args.id}, nastąpiło przemapowanie indexów cytatów.
            Użyj command: "wyswietl", aby zobaczyć obecną listę cytatów.`
          );
        }
      });
    }
  });
};

module.exports = {
  command: "usun <id>",
  desc: "Usuwanie cytatu z quotes.json",
  handler: removeQuoteHandler
};
