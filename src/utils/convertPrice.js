export const convertPrice = async (amount, from = "USD", to = "USD") => {
  // console.log('LINE AT 2', amount,  from , to);
  
  try {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );

    const data = await res.json();
    // console.log("LINE AT 8", data);

    const rate = data.rates[to];

    return amount * rate;
  } catch (error) {
    // console.log("Price conversion error:", error);
    return amount;
  }
};
