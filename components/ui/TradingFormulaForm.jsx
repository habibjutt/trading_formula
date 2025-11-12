'use client';

import { useState } from 'react';

export default function TradingFormulaForm() {
  const [orderType, setOrderType] = useState('quantity'); // 'quantity' or 'totalPrice'
  const [coinPrice, setCoinPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [leverage, setLeverage] = useState('5');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const coinPriceValue = parseFloat(coinPrice);
    const leverageValue = parseInt(leverage);
    
    if (coinPriceValue && leverageValue) {
      let calculatedQuantity;
      let calculatedTotalPrice;
      
      if (orderType === 'quantity') {
        // Order by quantity: user provides quantity, we calculate total price
        const quantityValue = parseFloat(quantity);
        if (!quantityValue) return;
        calculatedQuantity = quantityValue;
        calculatedTotalPrice = coinPriceValue * quantityValue * leverageValue;
      } else {
        // Order by total price: user provides total price, we calculate quantity
        const totalPriceValue = parseFloat(totalPrice);
        if (!totalPriceValue) return;
        calculatedTotalPrice = totalPriceValue;
        calculatedQuantity = totalPriceValue / (coinPriceValue * leverageValue);
      }
      
      setFormData({
        coinPrice: coinPriceValue,
        quantity: calculatedQuantity,
        totalPrice: calculatedTotalPrice,
        leverage: leverageValue,
        orderType,
      });
      setSubmitted(true);
    }
  };

  // Calculate total trade price
  const calculateTotalTradePrice = () => {
    if (!formData) return null;
    return formData.totalPrice;
  };

  // Calculate SL prices for different percentages
  const calculateSLPrices = () => {
    if (!formData || !formData.coinPrice || formData.coinPrice <= 0) return null;

    const entryPrice = formData.coinPrice;
    const qty = formData.quantity;
    const lev = formData.leverage;
    const slPercentages = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
    
    return slPercentages.map(percentage => {
      const slPrice = entryPrice * (1 - percentage / 100);
      const priceDifference = entryPrice - slPrice;
      const totalLoss = priceDifference * qty * lev;
      return {
        percentage,
        slPrice: slPrice.toFixed(4),
        priceDifference: priceDifference.toFixed(4),
        totalLoss: totalLoss.toFixed(4),
      };
    });
  };

  // Calculate TP prices for different percentages
  const calculateTPPrices = () => {
    if (!formData || !formData.coinPrice || formData.coinPrice <= 0) return null;

    const entryPrice = formData.coinPrice;
    const qty = formData.quantity;
    const lev = formData.leverage;
    const tpPercentages = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
    
    return tpPercentages.map(percentage => {
      const tpPrice = entryPrice * (1 + percentage / 100);
      const priceDifference = tpPrice - entryPrice;
      const totalProfit = priceDifference * qty * lev;
      return {
        percentage,
        tpPrice: tpPrice.toFixed(4),
        priceDifference: priceDifference.toFixed(4),
        totalProfit: totalProfit.toFixed(4),
      };
    });
  };

  const totalTradePrice = calculateTotalTradePrice();
  const slPrices = calculateSLPrices();
  const tpPrices = calculateTPPrices();

  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Form - 2 columns */}
        <div className="col-span-12 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white dark:bg-black border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg p-6">
              {/* <h2 className="text-2xl font-semibold mb-6 text-black dark:text-zinc-50">
                Trading Formula Calculator
              </h2> */}
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-zinc-600 dark:text-zinc-400">
                    Order By
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="orderType"
                        value="quantity"
                        checked={orderType === 'quantity'}
                        onChange={(e) => {
                          setOrderType(e.target.value);
                          setTotalPrice('');
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-black dark:text-zinc-50">Order by Quantity</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="orderType"
                        value="totalPrice"
                        checked={orderType === 'totalPrice'}
                        onChange={(e) => {
                          setOrderType(e.target.value);
                          setQuantity('');
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-black dark:text-zinc-50">Order by Total Price</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="coinPrice" 
                    className="block text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400"
                  >
                    Coin Price
                  </label>
                  <input
                    id="coinPrice"
                    type="number"
                    step="0.0001"
                    value={coinPrice}
                    onChange={(e) => setCoinPrice(e.target.value)}
                    placeholder="Enter coin price"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black/[.08] dark:focus:ring-white/[.145]"
                  />
                </div>
                
                {orderType === 'quantity' ? (
                  <div>
                    <label 
                      htmlFor="quantity" 
                      className="block text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400"
                    >
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      step="0.0001"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black/[.08] dark:focus:ring-white/[.145]"
                    />
                  </div>
                ) : (
                  <div>
                    <label 
                      htmlFor="totalPrice" 
                      className="block text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400"
                    >
                      Total Price
                    </label>
                    <input
                      id="totalPrice"
                      type="number"
                      step="0.0001"
                      value={totalPrice}
                      onChange={(e) => setTotalPrice(e.target.value)}
                      placeholder="Enter total price"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black/[.08] dark:focus:ring-white/[.145]"
                    />
                  </div>
                )}
                
                <div>
                  <label 
                    htmlFor="leverage" 
                    className="block text-sm font-medium mb-2 text-zinc-600 dark:text-zinc-400"
                  >
                    Leverage
                  </label>
                  <select
                    id="leverage"
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black/[.08] dark:focus:ring-white/[.145]"
                  >
                    <option value="1">1:1</option>
                    <option value="2">2:1</option>
                    <option value="3">3:1</option>
                    <option value="4">4:1</option>
                    <option value="5">5:1</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-full bg-foreground text-background font-medium transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              >
                Calculate
              </button>
            </div>
          </form>
        </div>

        {/* Results Section - 10 columns */}
        <div className="col-span-12 md:col-span-10 space-y-6">
          {/* Total Trade Price - Full width (10 columns) */}
          {submitted && totalTradePrice && (
            <div className="bg-white dark:bg-black border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-2">
                  Total Trade Price
                </h3>
                <p className="text-2xl font-mono text-black dark:text-zinc-50 mb-3">
                  {totalTradePrice.toFixed(4)}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                    <span className="text-sm font-medium text-green-800 dark:text-green-300 mr-2">Quantity:</span>
                    <span className="text-lg font-bold font-mono text-green-900 dark:text-green-200">
                      {formData.quantity.toFixed(4)}
                    </span>
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                  {formData.orderType === 'quantity' ? (
                    <>Coin Price: {formData.coinPrice} × Quantity: {formData.quantity.toFixed(4)} × Leverage: {formData.leverage}:1</>
                  ) : (
                    <>Total Price: {formData.totalPrice.toFixed(4)} ÷ (Coin Price: {formData.coinPrice} × Leverage: {formData.leverage}:1) = Quantity: {formData.quantity.toFixed(4)}</>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Tables Row - 5 columns each */}
          {submitted && (slPrices || tpPrices) && (
            <div className="grid grid-cols-12 gap-6">
              {/* Stop Loss Table - 5 columns */}
              {slPrices && (
                <div className="col-span-12 md:col-span-6">
                  <div className="bg-white dark:bg-black border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
                      Stop Loss Price Table
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-solid border-black/[.08] dark:border-white/[.145]">
                            <th className="text-left py-3 px-4 font-semibold text-black dark:text-zinc-50">
                              SL %
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-black dark:text-zinc-50">
                              SL Price
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-black dark:text-zinc-50">
                              Price Difference
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-black dark:text-zinc-50">
                              Total Loss
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {slPrices.map(({ percentage, slPrice, priceDifference, totalLoss }) => (
                            <tr 
                              key={percentage}
                              className="border-b border-solid border-black/[.08] dark:border-white/[.145] hover:bg-black/[.04] dark:hover:bg-[#1a1a1a] transition-colors"
                            >
                              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400 font-medium">
                                {percentage}%
                              </td>
                              <td className="py-3 px-4 text-black dark:text-zinc-50 font-mono">
                                {slPrice}
                              </td>
                              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400 font-mono">
                                {priceDifference}
                              </td>
                              <td className="py-3 px-4 text-red-600 dark:text-red-400 font-mono font-semibold">
                                {totalLoss}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Take Profit Table - 5 columns */}
              {tpPrices && (
                <div className="col-span-12 md:col-span-6">
                  <div className="bg-white dark:bg-black border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
                      Take Profit Price Table
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-solid border-black/[.08] dark:border-white/[.145]">
                            <th className="text-left py-3 px-4 font-semibold text-black dark:text-zinc-50">
                              TP %
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-black dark:text-zinc-50">
                              TP Price
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-black dark:text-zinc-50">
                              Price Difference
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-black dark:text-zinc-50">
                              Total Profit
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tpPrices.map(({ percentage, tpPrice, priceDifference, totalProfit }) => (
                            <tr 
                              key={percentage}
                              className="border-b border-solid border-black/[.08] dark:border-white/[.145] hover:bg-black/[.04] dark:hover:bg-[#1a1a1a] transition-colors"
                            >
                              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400 font-medium">
                                {percentage}%
                              </td>
                              <td className="py-3 px-4 text-black dark:text-zinc-50 font-mono">
                                {tpPrice}
                              </td>
                              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400 font-mono">
                                {priceDifference}
                              </td>
                              <td className="py-3 px-4 text-green-600 dark:text-green-400 font-mono font-semibold">
                                {totalProfit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

