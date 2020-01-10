const fs = require("fs");

const addQuoteHandler = args => {
  const Quote = function(index, content, author, group) {
    this.id = index;
    this.content = args.cytat;
    this.author = args.autor;
    this.group = args.grupa;
  };
  //console.log(args);

  fs.readFile("quotes.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const quotes = JSON.parse(data);
      const isExisted = quotes.find(quote => quote.content === args.cytat)
        ? true
        : false;
      if (isExisted) {
        return console.log("Taki cytat już istnieje");
      }
      const index = quotes.length;
      quotes.push(new Quote(index, args.content, args.author, args.group));

      quotesStringify = JSON.stringify(quotes);
      fs.writeFile("quotes.json", quotesStringify, "utf-8", err => {
        if (!err) {
          console.log(`Dodano cytat o treści: ${args.cytat}`);
        }
      });
    }
  });
};

module.exports = {
  command: "dodaj <cytat> <autor> <grupa>",
  desc: "Dodawanie cytatu do quotes.json",
  handler: addQuoteHandler
};
