const fs = require("fs");

const classifiedQuotesHandler = args => {
  fs.readFile("quotes.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const quotes = JSON.parse(data);

      if (quotes.length === 0) {
        return console.log(`Przed wyświetleniem cytatów z danej grupy, musisz mieć mieć minimum jeden,
          użyj command: "dodaj <cytat> <autor> <grupa>".`);
      }

      const classifiedQuotes = quotes.filter(
        quote => quote.group === args.grupa
      );
      console.log(`Oto cytaty z grupy ${args.grupa}:`);
      classifiedQuotes.forEach(quote => {
        console.log(
          `Cytat o id: ${quote.id}, o treści: ${quote.content}, autorstwa: ${quote.author}, w grupie: ${quote.group}.`
        );
      });
    }
  });
};

module.exports = {
  command: "pogrupowane <grupa>",
  desc: `wyświetla wszystkie cytaty z danej grupy z quotes.json`,
  handler: classifiedQuotesHandler
};
