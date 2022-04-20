import { Datum, Stock, Stocks } from "../types/data";
import data from "../data/stock_data.json";

/** Sort dates in ascending order */
const sortDates = (dataArr: Array<Datum>) => {
  dataArr.sort((a: any, b: any) => b.date - a.date);
};

/** Find the investment ating  */
const findInvestmentRating = (datum: Array<Datum>, range = -1): number => {
  // If range is not set, set it to the last index
  let end = range === -1 ? datum.length - 1 : range;

  // Stock rating
  let sumGap: number = 0;
  let dayCount: number = 0;
  let sumPrice = 0;

  // Find stock sumGap
  for (let i = 0; i < end; i++) {
    const { dcf, price } = datum[i];
    sumGap += dcf - price;
    sumPrice += price;
    dayCount++;
  }

  const averageGap = sumGap / dayCount;
  const averagePrice = sumPrice / dayCount;
  const investmentRating = (averageGap / averagePrice) * 10;

  // Calculate the investment rating
  return parseFloat(investmentRating.toFixed(2));
};

/** Add stocks to the stocks array object | Stocks */
const addStock = (stocks: Stocks, datum: Datum): void => {
  // Add values to the stock obj
  stocks.push({
    investmentRating: 0,
    ticker: datum.ticker!,
    name: datum.name!,
    data: [],
  });
};

/** Add values to the data array in Stock object | Stocsk.data = [] */
const addDataToStock = (stock: Stock, datum: Datum): void => {
  stock.data.push({
    name: datum.name,
    ticker: datum.ticker,
    date: new Date(datum.date),
    price: datum.price,
    dcf: datum.dcf,
  });
};

/** Process the data from json file */
const getProcessedData = (): Stocks => {
  // Unprocessed data
  const obj: any = data; // Load json data

  // Varibales
  const dataMap = new Map(); // Map - (key: ticker, value: index)
  const stocks: Stocks = []; // Store processed data

  // Add the stock data
  let index: number = 0; // Array index
  obj.forEach((datum: any) => {
    if (!dataMap.has(datum.ticker)) {
      // Add value if the key is not in the map
      dataMap.set(datum.ticker, index);

      // // Add values to the stock obj
      addStock(stocks, datum);

      index++;
    }

    // Add values to the datum obj
    let stockIndex = dataMap.get(datum.ticker);
    addDataToStock(stocks[stockIndex], datum);
  });

  // Calculate the investing rating
  dataMap.forEach((data: any) => {
    //sortDates(stocks[data].data); // Sort dates
    stocks[data].investmentRating = findInvestmentRating(stocks[data].data); // Calculate investing rating
  });

  // Return processed data
  return stocks;
};

/** Export processed data funcion */
export { getProcessedData, findInvestmentRating };