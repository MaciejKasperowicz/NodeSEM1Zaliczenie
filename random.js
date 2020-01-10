const fs = require("fs");
const randomData = fs.readFileSync("randomQuotes.json", "utf-8");

if (!randomData) {
  fs.writeFileSync("randomQuotes.json", "[]", "utf-8", () =>
    console.log("Dodano pustą tablicę, aby nie wyrzuciło błędu przy parsowaniu")
  );
}

const randomQuoteHandler = () => {
  fs.readFile("quotes.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const quotes = JSON.parse(data);

      if (quotes.length === 0) {
        return console.log(`Przed wyświetleniem losowego cytatu, musisz mieć mieć minimum jeden,
              użyj command: "dodaj <cytat> <autor> <grupa>".`);
      }
      const quotesNumber = quotes.length;
      const randomNumber = Math.floor(Math.random() * quotesNumber);
      const randomQuote = quotes[randomNumber];
      console.log(
        `Wylosowałeś cytat o id: ${randomQuote.id}, treści: ${randomQuote.content}, w grupie: ${randomQuote.group}, autorstwa: ${randomQuote.author}.`
      );
      fs.readFile("randomQuotes.json", "utf-8", (err, body) => {
        if (err) {
          console.log(err.message);
        } else {
          const randomQuotes = JSON.parse(body);
          randomQuotes.push(randomQuote);
          const randomQuoteCounter = randomQuotes.filter(
            quote => quote.content === randomQuote.content
          ).length;
          console.log(
            `Wylosowany cytat, o treści: ${randomQuote.content} wystąpił po raz ${randomQuoteCounter}.`
          );
          randomQuotesStringify = JSON.stringify(randomQuotes);
          fs.writeFileSync("randomQuotes.json", randomQuotesStringify);
        }
      });
    }
  });
};

module.exports = {
  command: "wylosuj",
  desc: "wyświetla losowy cytat z quotes.json",
  handler: randomQuoteHandler
};
