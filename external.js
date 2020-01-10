const axios = require("axios");

const externalQuoteHandler = () => {
  const url = `http://ec2-18-217-240-10.us-east-2.compute.amazonaws.com/node/quotes.php`;
  axios
    .get(url)
    .then(({ data }) =>
      console.log(
        `Wylosowano zewnętrzny cytat o id: ${data.id}, o treści: ${data.quote}, którego autorem jest ${data.author}.`
      )
    )
    .catch(error =>
      console.log(
        `Oto error pochodzący z wywołania funkcji quoteFromWeb: `,
        error.message
      )
    );
};
module.exports = {
  command: "zInternetu",
  desc: "wyświetla cytat pobrany z internetu",
  handler: externalQuoteHandler
};
