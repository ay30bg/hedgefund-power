import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({
    code: "USD",
    symbol: "$",
    rate: 1
  });

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: changeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
