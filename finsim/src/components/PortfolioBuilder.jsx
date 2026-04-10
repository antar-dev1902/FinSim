import { useState } from 'react';

function PortfolioBuilder({
  portfolio,
  onPortfolioChange,
  onSimulate,
  setLossProbability,
  setExplanation,
  setSentiment,
  loading,
  setLoading,
}) {

  const [symbol, setSymbol] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddStock = () => {
    const cleanSymbol = symbol.trim().toUpperCase();
    const cleanAmount = parseFloat(amount);

    if (!cleanSymbol || isNaN(cleanAmount) || cleanAmount <= 0) {
      alert('Please enter a valid stock symbol and a positive amount.');
      return;
    }

    const alreadyExists = portfolio.some(item => item.symbol === cleanSymbol);
    if (alreadyExists) {
      alert(`${cleanSymbol} is already in your portfolio.`);
      return;
    }

    const newStock = { symbol: cleanSymbol, amount: cleanAmount };
    onPortfolioChange([...portfolio, newStock]);
    setSymbol('');
    setAmount('');
  };

  const handleRemoveStock = (symbolToRemove) => {
    onPortfolioChange(portfolio.filter(item => item.symbol !== symbolToRemove));
  };

  const handleSimulate = async () => {
    if (portfolio.length === 0) {
      alert('Please add at least one stock.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio }),
      });

      const data = await response.json();
      onSimulate(data.simulation);
      setLossProbability(data.loss_probability);
      setExplanation(data.explanation);
      setSentiment(data.sentiment);

    } catch (error) {
      alert('Could not connect to backend. Make sure Flask is running on port 5000.');
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2 className="card-title">🧺 Build Your Portfolio</h2>
      <p className="card-subtitle">
        Add Indian stocks using NSE symbols — e.g. RELIANCE.NS, TCS.NS, INFY.NS
      </p>

      <div className="input-row">
        <input
          type="text"
          placeholder="Stock symbol e.g. RELIANCE.NS"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Amount in ₹ e.g. 10000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddStock} className="btn-add">
          + Add Stock
        </button>
      </div>

      {portfolio.length > 0 && (
        <table className="portfolio-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Amount (₹)</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((item) => (
              <tr key={item.symbol}>
                <td>{item.symbol}</td>
                <td>₹{item.amount.toLocaleString('en-IN')}</td>
                <td>
                  <button
                    onClick={() => handleRemoveStock(item.symbol)}
                    className="btn-remove"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={handleSimulate}
        className="btn-simulate"
        disabled={loading || portfolio.length === 0}
      >
        {loading ? '⏳ Running Simulation...' : '🚀 Run Simulation'}
      </button>
    </div>
  );
}

export default PortfolioBuilder;