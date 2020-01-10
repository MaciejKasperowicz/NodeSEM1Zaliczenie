const fs = require("fs");

const showQuoteHandler = () => {
  fs.readFile("quotes.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const quotes = JSON.parse(data);

      if (quotes.length === 0) {
        return console.log(`Przed wyświetleniem cytatów, musisz mieć mieć minimum jeden,
          użyj command: "dodaj <cytat> <autor> <grupa>".`);
      }
      quotes.forEach(quote => {
        console.log(
          `Cytat o id: ${quote.id}, o treści: ${quote.content}, autorstwa: ${quote.author}, w grupie: ${quote.group}.`
        );
      });
    }
  });
};

module.exports = {
  command: "wyswietl",
  desc: "wyświetla wszystkie cytaty z quotes.json",
  handler: showQuoteHandler
};
