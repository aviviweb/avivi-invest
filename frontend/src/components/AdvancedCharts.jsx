import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function AdvancedCharts() {
  const { t, isRTL } = useLanguage()
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')
  const [chartType, setChartType] = useState('candlestick')
  const [timeframe, setTimeframe] = useState('1D')
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(false)

  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'SPY']
  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y']
  const chartTypes = ['candlestick', 'line', 'volume', 'rsi', 'macd']

  useEffect(() => {
    generateChartData()
  }, [selectedSymbol, timeframe])

  const generateChartData = () => {
    setLoading(true)
    
    // Simulate chart data generation
    setTimeout(() => {
      const data = generateMockChartData()
      setChartData(data)
      setLoading(false)
    }, 1000)
  }

  const generateMockChartData = () => {
    const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90
    const basePrice = 150 + Math.random() * 100
    
    const data = []
    let currentPrice = basePrice
    
    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.5) * 10
      const open = currentPrice
      const close = currentPrice + change
      const high = Math.max(open, close) + Math.random() * 5
      const low = Math.min(open, close) - Math.random() * 5
      const volume = Math.floor(Math.random() * 1000000) + 100000
      
      currentPrice = close
      
      data.push({
        time: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toISOString(),
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
        volume: volume
      })
    }

    // Calculate technical indicators
    const rsi = calculateRSI(data.map(d => d.close))
    const macd = calculateMACD(data.map(d => d.close))
    
    return {
      candlestick: data,
      line: data.map(d => ({ time: d.time, value: d.close })),
      volume: data.map(d => ({ time: d.time, volume: d.volume })),
      rsi: data.map((d, i) => ({ time: d.time, value: rsi[i] || 50 })),
      macd: data.map((d, i) => ({ 
        time: d.time, 
        macd: macd[i]?.macd || 0,
        signal: macd[i]?.signal || 0,
        histogram: macd[i]?.histogram || 0
      }))
    }
  }

  const calculateRSI = (prices, period = 14) => {
    const rsi = []
    for (let i = period; i < prices.length; i++) {
      const gains = []
      const losses = []
      
      for (let j = i - period + 1; j <= i; j++) {
        const change = prices[j] - prices[j - 1]
        if (change > 0) gains.push(change)
        else losses.push(Math.abs(change))
      }
      
      const avgGain = gains.reduce((a, b) => a + b, 0) / period
      const avgLoss = losses.reduce((a, b) => a + b, 0) / period
      
      const rs = avgGain / (avgLoss || 0.001)
      const rsiValue = 100 - (100 / (1 + rs))
      
      rsi.push(rsiValue)
    }
    
    return new Array(period).fill(50).concat(rsi)
  }

  const calculateMACD = (prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) => {
    const emaFast = calculateEMA(prices, fastPeriod)
    const emaSlow = calculateEMA(prices, slowPeriod)
    
    const macdLine = emaFast.map((fast, i) => fast - emaSlow[i])
    const signalLine = calculateEMA(macdLine, signalPeriod)
    const histogram = macdLine.map((macd, i) => macd - signalLine[i])
    
    return macdLine.map((macd, i) => ({
      macd: macd,
      signal: signalLine[i],
      histogram: histogram[i]
    }))
  }

  const calculateEMA = (prices, period) => {
    const ema = []
    const multiplier = 2 / (period + 1)
    
    ema[0] = prices[0]
    for (let i = 1; i < prices.length; i++) {
      ema[i] = (prices[i] * multiplier) + (ema[i - 1] * (1 - multiplier))
    }
    
    return ema
  }

  const renderCandlestickChart = () => {
    if (!chartData?.candlestick) return null
    
    const maxPrice = Math.max(...chartData.candlestick.map(d => d.high))
    const minPrice = Math.min(...chartData.candlestick.map(d => d.low))
    const range = maxPrice - minPrice
    
    return (
      <div style={{height: '400px', display: 'flex', alignItems: 'end', gap: '2px', marginBottom: '20px'}}>
        {chartData.candlestick.map((candle, index) => {
          const height = ((candle.high - candle.low) / range) * 350
          const bodyHeight = ((Math.abs(candle.close - candle.open)) / range) * 350
          const isGreen = candle.close > candle.open
          
          return (
            <div key={index} style={{position: 'relative', width: '20px'}}>
              {/* High-Low line */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: `${((maxPrice - candle.high) / range) * 350}px`,
                width: '1px',
                height: `${height}px`,
                backgroundColor: '#666',
                transform: 'translateX(-50%)'
              }} />
              
              {/* Body */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: `${((maxPrice - Math.max(candle.open, candle.close)) / range) * 350}px`,
                width: '12px',
                height: `${Math.max(bodyHeight, 1)}px`,
                backgroundColor: isGreen ? '#28a745' : '#dc3545',
                transform: 'translateX(-50%)',
                borderRadius: '1px'
              }} />
            </div>
          )
        })}
      </div>
    )
  }

  const renderLineChart = () => {
    if (!chartData?.line) return null
    
    const maxValue = Math.max(...chartData.line.map(d => d.value))
    const minValue = Math.min(...chartData.line.map(d => d.value))
    const range = maxValue - minValue
    
    const pathData = chartData.line.map((point, index) => {
      const x = (index / (chartData.line.length - 1)) * 100
      const y = 100 - ((point.value - minValue) / range) * 100
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    return (
      <div style={{height: '400px', marginBottom: '20px'}}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={pathData} stroke="#0ea5a4" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
    )
  }

  const renderVolumeChart = () => {
    if (!chartData?.volume) return null
    
    const maxVolume = Math.max(...chartData.volume.map(d => d.volume))
    
    return (
      <div style={{height: '200px', display: 'flex', alignItems: 'end', gap: '2px', marginBottom: '20px'}}>
        {chartData.volume.map((bar, index) => {
          const height = (bar.volume / maxVolume) * 180
          return (
            <div 
              key={index}
              style={{
                width: '20px',
                height: `${height}px`,
                backgroundColor: '#6c757d',
                borderRadius: '1px'
              }}
            />
          )
        })}
      </div>
    )
  }

  const renderRSIChart = () => {
    if (!chartData?.rsi) return null
    
    return (
      <div style={{height: '200px', marginBottom: '20px'}}>
        <div style={{display: 'flex', alignItems: 'end', gap: '2px', height: '100%'}}>
          {chartData.rsi.map((point, index) => {
            const height = (point.value / 100) * 180
            const color = point.value > 70 ? '#dc3545' : point.value < 30 ? '#28a745' : '#0ea5a4'
            
            return (
              <div 
                key={index}
                style={{
                  width: '20px',
                  height: `${height}px`,
                  backgroundColor: color,
                  borderRadius: '1px'
                }}
              />
            )
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
          <div style={{borderTop: '1px dashed #dc3545', width: '30%', textAlign: 'center'}}>70</div>
          <div style={{borderTop: '1px dashed #28a745', width: '30%', textAlign: 'center'}}>30</div>
        </div>
      </div>
    )
  }

  const renderMACDChart = () => {
    if (!chartData?.macd) return null
    
    const maxValue = Math.max(...chartData.macd.map(d => Math.max(d.macd, d.signal)))
    const minValue = Math.min(...chartData.macd.map(d => Math.min(d.macd, d.signal)))
    const range = maxValue - minValue
    
    return (
      <div style={{height: '200px', marginBottom: '20px'}}>
        <div style={{display: 'flex', alignItems: 'end', gap: '2px', height: '100%'}}>
          {chartData.macd.map((point, index) => {
            const macdHeight = ((point.macd - minValue) / range) * 180
            const signalHeight = ((point.signal - minValue) / range) * 180
            const histogramHeight = Math.abs(point.histogram) * 50
            
            return (
              <div key={index} style={{position: 'relative', width: '20px'}}>
                {/* MACD Line */}
                <div style={{
                  position: 'absolute',
                  left: '25%',
                  top: `${180 - macdHeight}px`,
                  width: '1px',
                  height: '2px',
                  backgroundColor: '#0ea5a4'
                }} />
                
                {/* Signal Line */}
                <div style={{
                  position: 'absolute',
                  left: '75%',
                  top: `${180 - signalHeight}px`,
                  width: '1px',
                  height: '2px',
                  backgroundColor: '#ffc107'
                }} />
                
                {/* Histogram */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: `${180 - histogramHeight}px`,
                  width: '8px',
                  height: `${histogramHeight}px`,
                  backgroundColor: point.histogram >= 0 ? '#28a745' : '#dc3545',
                  transform: 'translateX(-50%)'
                }} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderChart = () => {
    switch (chartType) {
      case 'candlestick':
        return renderCandlestickChart()
      case 'line':
        return renderLineChart()
      case 'volume':
        return renderVolumeChart()
      case 'rsi':
        return renderRSIChart()
      case 'macd':
        return renderMACDChart()
      default:
        return renderCandlestickChart()
    }
  }

  return (
    <section>
      <h2>{t('advancedCharts')}</h2>
      
      {/* Controls */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px'}}>
        <div>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
            {t('symbol')}
          </label>
          <select 
            value={selectedSymbol}
            onChange={e => setSelectedSymbol(e.target.value)}
            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
          >
            {symbols.map(symbol => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
            {t('timeframe')}
          </label>
          <select 
            value={timeframe}
            onChange={e => setTimeframe(e.target.value)}
            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
          >
            {timeframes.map(tf => (
              <option key={tf} value={tf}>{tf}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
            {t('chartType')}
          </label>
          <select 
            value={chartType}
            onChange={e => setChartType(e.target.value)}
            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
          >
            <option value="candlestick">{t('candlestick')}</option>
            <option value="line">{t('lineChart')}</option>
            <option value="volume">{t('volume')}</option>
            <option value="rsi">{t('rsi')}</option>
            <option value="macd">{t('macd')}</option>
          </select>
        </div>
        
        <div style={{display: 'flex', alignItems: 'end'}}>
          <button 
            onClick={generateChartData}
            disabled={loading}
            style={{width: '100%', padding: '8px', backgroundColor: '#0ea5a4', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer'}}
          >
            {loading ? t('loading') : t('refresh')}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <h3>{t('chartTitle')}: {selectedSymbol} - {timeframe}</h3>
        {loading ? (
          <div style={{textAlign: 'center', padding: '40px'}}>
            <div className="loading-spinner" style={{margin: '0 auto'}}></div>
            <p>{t('loading')}</p>
          </div>
        ) : (
          renderChart()
        )}
      </div>

      {/* Chart Info */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('chartInfo')}</h4>
        <p>{t('chartDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li><strong>{t('candlestick')}:</strong> {t('candlestickDesc')}</li>
          <li><strong>{t('lineChart')}:</strong> {t('lineChartDesc')}</li>
          <li><strong>{t('volume')}:</strong> {t('volumeDesc')}</li>
          <li><strong>{t('rsi')}:</strong> {t('rsiDesc')}</li>
          <li><strong>{t('macd')}:</strong> {t('macdDesc')}</li>
        </ul>
      </div>
    </section>
  )
}
