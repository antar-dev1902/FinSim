# We import yfinance and give it a short nickname 'yf'
import yfinance as yf

# We tell yfinance to get data for Reliance Industries
# 'RELIANCE.NS' is the ticker symbol - .NS means it's on NSE (Indian market)
stock = yf.Ticker("RELIANCE.NS")

# We ask for the last 6 months of daily price data
history = stock.history(period="6mo")

# We print it to see if it's working
print(history)