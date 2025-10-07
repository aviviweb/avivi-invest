import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'

export default function RealTimeData() {
  const { t, isRTL } = useLanguage()
  const [marketData, setMarketData] = useState({})
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30)

  const watchlist = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'SPY', 'QQQ', 'IWM']

  useEffect(() => {
    fetchMarketData()
    
    if (autoRefresh) {
      const interval = setInterval(fetchMarketData, refreshInterval * 1000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refreshInterval])

  const fetchMarketData = async () => {
    try {
      setLoading(true)
      
      // Simulate real-time data fetching
      const mockData = generateMockMarketData()
      setMarketData(mockData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching market data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockMarketData = () => {
    const data = {}
    
    watchlist.forEach(symbol => {
      const basePrice = 50 + Math.random() * 200
      const change = (Math.random() - 0.5) * 10
      const changePercent = (change / basePrice) * 100
      const volume = Math.floor(Math.random() * 10000000) + 1000000
      const high = basePrice + Math.random() * 5
      const low = basePrice - Math.random() * 5
      
      data[symbol] = {
        symbol,
        price: Math.round(basePrice * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        volume,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        marketCap: Math.floor(Math.random() * 1000000000000) + 100000000000,
        pe: Math.round((Math.random() * 50 + 10) * 100) / 100,
        dividend: Math.round(Math.random() * 5 * 100) / 100,
        lastUpdate: new Date().toISOString()
      }
    })
    
    return data
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const getChangeColor = (change) => {
    return change >= 0 ? '#28a745' : '#dc3545'
  }

  const getChangeIcon = (change) => {
    return change >= 0 ? '📈' : '📉'
  }

  const sortData = (sortBy) => {
    const sorted = Object.values(marketData).sort((a, b) => {
      switch (sortBy) {
        case 'symbol':
          return a.symbol.localeCompare(b.symbol)
        case 'price':
          return b.price - a.price
        case 'change':
          return b.change - a.change
        case 'changePercent':
          return b.changePercent - a.changePercent
        case 'volume':
          return b.volume - a.volume
        case 'marketCap':
          return b.marketCap - a.marketCap
        default:
          return 0
      }
    })
    
    const sortedData = {}
    sorted.forEach(item => {
      sortedData[item.symbol] = item
    })
    
    setMarketData(sortedData)
  }

  return (
    <section>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>{t('realTimeData')}</h2>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <input 
              type="checkbox"
              checked={autoRefresh}
              onChange={e => setAutoRefresh(e.target.checked)}
            />
            {t('autoRefresh')}
          </label>
          <select 
            value={refreshInterval}
            onChange={e => setRefreshInterval(parseInt(e.target.value))}
            style={{padding: '5px', border: '1px solid #ddd', borderRadius: '4px'}}
          >
            <option value="10">10s</option>
            <option value="30">30s</option>
            <option value="60">1m</option>
            <option value="300">5m</option>
          </select>
          <button 
            onClick={fetchMarketData}
            disabled={loading}
            style={{padding: '8px 16px', backgroundColor: '#0ea5a4', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer'}}
          >
            {loading ? t('loading') : t('refresh')}
          </button>
        </div>
      </div>

      {/* Market Summary */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px'}}>
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('marketStatus')}</h3>
          <p style={{margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#28a745'}}>
            {t('marketOpen')}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('lastUpdate')}</h3>
          <p style={{margin: 0, fontSize: '14px', color: '#6c757d'}}>
            {lastUpdate ? lastUpdate.toLocaleTimeString() : t('never')}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('totalSymbols')}</h3>
          <p style={{margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {Object.keys(marketData).length}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('refreshRate')}</h3>
          <p style={{margin: 0, fontSize: '14px', color: '#6c757d'}}>
            {refreshInterval}s
          </p>
        </div>
      </div>

      {/* Market Data Table */}
      <div style={{overflowX: 'auto'}}>
        <table>
          <thead>
            <tr>
              <th style={{textAlign: isRTL ? 'right' : 'left', cursor: 'pointer'}} onClick={() => sortData('symbol')}>
                {t('symbol')} ↕️
              </th>
              <th style={{textAlign: isRTL ? 'left' : 'right', cursor: 'pointer'}} onClick={() => sortData('price')}>
                {t('price')} ↕️
              </th>
              <th style={{textAlign: isRTL ? 'left' : 'right', cursor: 'pointer'}} onClick={() => sortData('change')}>
                {t('change')} ↕️
              </th>
              <th style={{textAlign: isRTL ? 'left' : 'right', cursor: 'pointer'}} onClick={() => sortData('changePercent')}>
                {t('changePercent')} ↕️
              </th>
              <th style={{textAlign: isRTL ? 'left' : 'right', cursor: 'pointer'}} onClick={() => sortData('volume')}>
                {t('volume')} ↕️
              </th>
              <th style={{textAlign: isRTL ? 'left' : 'right', cursor: 'pointer'}} onClick={() => sortData('marketCap')}>
                {t('marketCap')} ↕️
              </th>
              <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('pe')}</th>
              <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('dividend')}</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(marketData).map((stock, index) => (
              <tr key={stock.symbol}>
                <td style={{fontWeight: 'bold'}}>
                  <span style={{marginRight: '5px'}}>{getChangeIcon(stock.change)}</span>
                  {stock.symbol}
                </td>
                <td style={{textAlign: isRTL ? 'left' : 'right', fontWeight: 'bold'}}>
                  {formatCurrency(stock.price)}
                </td>
                <td style={{textAlign: isRTL ? 'left' : 'right', color: getChangeColor(stock.change), fontWeight: 'bold'}}>
                  {formatCurrency(stock.change)}
                </td>
                <td style={{textAlign: isRTL ? 'left' : 'right', color: getChangeColor(stock.change), fontWeight: 'bold'}}>
                  {formatPercentage(stock.changePercent)}
                </td>
                <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                  {formatNumber(stock.volume)}
                </td>
                <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                  {formatCurrency(stock.marketCap)}
                </td>
                <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                  {stock.pe}
                </td>
                <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                  {stock.dividend}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Market Overview */}
      <div style={{marginTop: '30px'}}>
        <h3>{t('marketOverview')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
          <div className="card">
            <h4>{t('topGainers')}</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              {Object.values(marketData)
                .sort((a, b) => b.changePercent - a.changePercent)
                .slice(0, 5)
                .map((stock, index) => (
                  <li key={stock.symbol} style={{padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: 'bold'}}>{stock.symbol}</span>
                    <span style={{color: '#28a745', fontWeight: 'bold'}}>
                      {formatPercentage(stock.changePercent)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="card">
            <h4>{t('topLosers')}</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              {Object.values(marketData)
                .sort((a, b) => a.changePercent - b.changePercent)
                .slice(0, 5)
                .map((stock, index) => (
                  <li key={stock.symbol} style={{padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: 'bold'}}>{stock.symbol}</span>
                    <span style={{color: '#dc3545', fontWeight: 'bold'}}>
                      {formatPercentage(stock.changePercent)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="card">
            <h4>{t('mostActive')}</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              {Object.values(marketData)
                .sort((a, b) => b.volume - a.volume)
                .slice(0, 5)
                .map((stock, index) => (
                  <li key={stock.symbol} style={{padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: 'bold'}}>{stock.symbol}</span>
                    <span style={{color: '#0ea5a4', fontWeight: 'bold'}}>
                      {formatNumber(stock.volume)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Data Info */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('dataInfo')}</h4>
        <p>{t('dataDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('dataNote1')}</li>
          <li>{t('dataNote2')}</li>
          <li>{t('dataNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
