import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'

export default function MarketChart() {
  const { t, isRTL } = useLanguage()
  const [symbol, setSymbol] = useState('SPY')
  const [priceData, setPriceData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPriceData = async () => {
    if (!symbol.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Simulate price data (in real app, you'd fetch historical data)
      const mockData = generateMockPriceData(symbol)
      setPriceData(mockData)
    } catch (err) {
      setError(t('error'))
    } finally {
      setLoading(false)
    }
  }

  const generateMockPriceData = (symbol) => {
    // Generate mock price data for demonstration
    const data = []
    let basePrice = 400 + Math.random() * 100 // Random base price
    
    for (let i = 0; i < 20; i++) {
      basePrice += (Math.random() - 0.5) * 10 // Random walk
      data.push({
        time: new Date(Date.now() - (19 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: Math.round(basePrice * 100) / 100,
        volume: Math.floor(Math.random() * 1000000) + 100000
      })
    }
    return data
  }

  useEffect(() => {
    fetchPriceData()
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const getPriceChange = () => {
    if (priceData.length < 2) return { change: 0, percent: 0 }
    const current = priceData[priceData.length - 1].price
    const previous = priceData[priceData.length - 2].price
    const change = current - previous
    const percent = (change / previous) * 100
    return { change, percent }
  }

  const priceChange = getPriceChange()

  return (
    <section>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>{t('marketChart')}</h2>
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <input 
            value={symbol} 
            onChange={e => setSymbol(e.target.value.toUpperCase())}
            placeholder={t('symbolPlaceholder')}
            style={{padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
          />
          <button 
            onClick={fetchPriceData}
            disabled={loading}
            style={{padding: '8px 16px', backgroundColor: '#0ea5a4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            {loading ? t('loading') : t('update')}
          </button>
        </div>
      </div>

      {error && (
        <div style={{padding: '15px', backgroundColor: '#f8d7da', borderRadius: '8px', marginBottom: '20px', color: '#721c24'}}>
          {error}
        </div>
      )}

      {priceData.length > 0 && (
        <div style={{marginBottom: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
            <h3>{symbol}</h3>
            <div style={{textAlign: isRTL ? 'left' : 'right'}}>
              <div style={{fontSize: '24px', fontWeight: 'bold'}}>
                {formatCurrency(priceData[priceData.length - 1].price)}
              </div>
              <div style={{color: priceChange.change >= 0 ? '#28a745' : '#dc3545'}}>
                {priceChange.change >= 0 ? '+' : ''}{formatCurrency(priceChange.change)} 
                ({priceChange.percent >= 0 ? '+' : ''}{priceChange.percent.toFixed(2)}%)
              </div>
            </div>
          </div>

          {/* Simple ASCII Chart */}
          <div style={{backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', fontFamily: 'monospace'}}>
            <div style={{marginBottom: '10px', fontSize: '14px'}}>
              {t('priceChart')} - {symbol}
            </div>
            <div style={{height: '200px', display: 'flex', alignItems: 'end', gap: '2px'}}>
              {priceData.map((point, index) => {
                const maxPrice = Math.max(...priceData.map(p => p.price))
                const minPrice = Math.min(...priceData.map(p => p.price))
                const height = ((point.price - minPrice) / (maxPrice - minPrice)) * 180
                
                return (
                  <div 
                    key={index}
                    style={{
                      width: '20px',
                      height: `${height}px`,
                      backgroundColor: '#0ea5a4',
                      borderRadius: '2px',
                      position: 'relative'
                    }}
                    title={`${point.time}: ${formatCurrency(point.price)}`}
                  />
                )
              })}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px', color: '#6c757d'}}>
              <span>{priceData[0]?.time}</span>
              <span>{priceData[priceData.length - 1]?.time}</span>
            </div>
          </div>

          {/* Price Table */}
          <div style={{marginTop: '20px', overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid #dee2e6'}}>
              <thead>
                <tr style={{backgroundColor: '#f8f9fa'}}>
                  <th style={{padding: '12px', textAlign: isRTL ? 'right' : 'left', borderBottom: '1px solid #dee2e6'}}>{t('date')}</th>
                  <th style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', borderBottom: '1px solid #dee2e6'}}>{t('price')}</th>
                  <th style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', borderBottom: '1px solid #dee2e6'}}>{t('volume')}</th>
                </tr>
              </thead>
              <tbody>
                {priceData.slice(-10).reverse().map((point, index) => (
                  <tr key={index} style={{borderBottom: '1px solid #dee2e6'}}>
                    <td style={{padding: '12px'}}>{point.time}</td>
                    <td style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', fontWeight: 'bold'}}>
                      {formatCurrency(point.price)}
                    </td>
                    <td style={{padding: '12px', textAlign: isRTL ? 'left' : 'right'}}>
                      {point.volume.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('chartInfo')}</h4>
        <p>{t('chartDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('chartNote1')}</li>
          <li>{t('chartNote2')}</li>
          <li>{t('chartNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
