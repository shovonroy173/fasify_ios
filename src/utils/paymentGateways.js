// utils/paymentGateways.js
export const getPaymentGateway = (countryCode) => {
  // Paystack supports primarily African countries
  const paystackCountries = ['NG', 'GH', 'KE', 'ZA', 'US'];
  
  // Use Paystack for supported African countries, Stripe for others
  return paystackCountries.includes(countryCode) ? 'paystack' : 'stripe';
};

export const isGatewayAvailable = (gateway, countryCode) => {
  if (gateway === 'paystack') {
    const paystackCountries = ['NG', 'GH', 'KE', 'ZA', 'US'];
    return paystackCountries.includes(countryCode);
  }
  return true; // Stripe is available in most countries
};