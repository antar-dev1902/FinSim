import { useState } from 'react';
import PortfolioBuilder from './components/PortfolioBuilder';
import './App.css';

function App() {
  const [portfolio, setPortfolio]               = useState([]);
  const [simResults, setSimResults]             = useState(null);
  const [sentiment, setSentiment]               = useState(null);
  const [lossProbability, setLossProbability]   = useState(null);
  const [explanation, setExplanation]           = useState('');
  const [loading, setLoading]                   = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>FinSim 📈</h1>
        <p>AI-Powered Investment Fear Reducer for Gen-Z India</p>
      </header>
      <main className="app-main">
        <PortfolioBuilder
          portfolio={portfolio}
          onPortfolioChange={setPortfolio}
          onSimulate={setSimResults}
          setLossProbability={setLossProbability}
          setExplanation={setExplanation}
          setSentiment={setSentiment}
          loading={loading}
          setLoading={setLoading}
        />
        {simResults && (
          <p style={{ color: 'green' }}>
            Simulation complete! Charts will appear here soon.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;