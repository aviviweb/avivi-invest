import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'

export default function Analytics() {
  const { t, isRTL } = useLanguage()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      // Simulate analytics data (in real app, fetch from backend)
      const mockAnalytics = generateMockAnalytics()
      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockAnalytics = () => {
    const baseValue = 10000
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    
    const performance = []
    let currentValue = baseValue
    
    for (let i = 0; i < days; i++) {
      const change = (Math.random() - 0.5) * 200 // Random daily change
      currentValue += change
      performance.push({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: Math.round(currentValue * 100) / 100,
        change: Math.round(change * 100) / 100
      })
    }

    const totalReturn = ((currentValue - baseValue) / baseValue) * 100
    const maxValue = Math.max(...performance.map(p => p.value))
    const minValue = Math.min(...performance.map(p => p.value))
    const maxDrawdown = ((maxValue - minValue) / maxValue) * 100

    return {
      performance,
      totalReturn,
      maxDrawdown,
      sharpeRatio: Math.random() * 2 + 0.5,
      winRate: Math.random() * 0.4 + 0.5,
      totalTrades: Math.floor(Math.random() * 50) + 20,
      avgTradeReturn: Math.random() * 0.1 - 0.05,
      volatility: Math.random() * 0.3 + 0.1
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`
  }

  const getPerformanceColor = (value) => {
    return value >= 0 ? '#28a745' : '#dc3545'
  }

  if (loading) {
    return (
      <section>
        <h2>{t('analytics')}</h2>
        <div style={{textAlign: 'center', padding: '40px'}}>
          <div className="loading-spinner" style={{margin: '0 auto'}}></div>
          <p>{t('loading')}</p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>{t('analytics')}</h2>
        <select 
          value={timeRange} 
          onChange={e => setTimeRange(e.target.value)}
          style={{padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px'}}
        >
          <option value="7d">{t('last7Days')}</option>
          <option value="30d">{t('last30Days')}</option>
          <option value="90d">{t('last90Days')}</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px'}}>
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('totalReturn')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: getPerformanceColor(analytics.totalReturn)}}>
            {formatPercentage(analytics.totalReturn / 100)}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('maxDrawdown')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#dc3545'}}>
            {formatPercentage(analytics.maxDrawdown / 100)}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('sharpeRatio')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {analytics.sharpeRatio.toFixed(2)}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('winRate')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#28a745'}}>
            {formatPercentage(analytics.winRate)}
          </p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="chart-container">
        <h3>{t('performanceChart')}</h3>
        <div style={{height: '300px', display: 'flex', alignItems: 'end', gap: '2px', marginBottom: '20px'}}>
          {analytics.performance.map((point, index) => {
            const maxValue = Math.max(...analytics.performance.map(p => p.value))
            const minValue = Math.min(...analytics.performance.map(p => p.value))
            const height = ((point.value - minValue) / (maxValue - minValue)) * 250
            
            return (
              <div 
                key={index}
                style={{
                  width: '20px',
                  height: `${height}px`,
                  backgroundColor: point.change >= 0 ? '#28a745' : '#dc3545',
                  borderRadius: '2px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                title={`${point.date}: ${formatCurrency(point.value)} (${formatPercentage(point.change / 100)})`}
              />
            )
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6c757d'}}>
          <span>{analytics.performance[0]?.date}</span>
          <span>{analytics.performance[analytics.performance.length - 1]?.date}</span>
        </div>
      </div>

      {/* Detailed Stats */}
      <div style={{marginTop: '30px'}}>
        <h3>{t('detailedStats')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
          <div className="card">
            <h4>{t('tradingStats')}</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{padding: '8px 0', borderBottom: '1px solid #eee'}}>
                <strong>{t('totalTrades')}:</strong> {analytics.totalTrades}
              </li>
              <li style={{padding: '8px 0', borderBottom: '1px solid #eee'}}>
                <strong>{t('avgTradeReturn')}:</strong> 
                <span style={{color: getPerformanceColor(analytics.avgTradeReturn * 100)}}>
                  {formatPercentage(analytics.avgTradeReturn)}
                </span>
              </li>
              <li style={{padding: '8px 0'}}>
                <strong>{t('volatility')}:</strong> {formatPercentage(analytics.volatility)}
              </li>
            </ul>
          </div>

          <div className="card">
            <h4>{t('riskMetrics')}</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{padding: '8px 0', borderBottom: '1px solid #eee'}}>
                <strong>{t('maxDrawdown')}:</strong> 
                <span style={{color: '#dc3545'}}>
                  {formatPercentage(analytics.maxDrawdown / 100)}
                </span>
              </li>
              <li style={{padding: '8px 0', borderBottom: '1px solid #eee'}}>
                <strong>{t('sharpeRatio')}:</strong> {analytics.sharpeRatio.toFixed(2)}
              </li>
              <li style={{padding: '8px 0'}}>
                <strong>{t('volatility')}:</strong> {formatPercentage(analytics.volatility)}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div style={{marginTop: '30px'}}>
        <h3>{t('dailyPerformance')}</h3>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('date')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('value')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('change')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('changePercent')}</th>
              </tr>
            </thead>
            <tbody>
              {analytics.performance.slice(-10).reverse().map((point, index) => (
                <tr key={index}>
                  <td>{point.date}</td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', fontWeight: 'bold'}}>
                    {formatCurrency(point.value)}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', color: getPerformanceColor(point.change * 100)}}>
                    {formatCurrency(point.change)}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', color: getPerformanceColor(point.change * 100)}}>
                    {formatPercentage(point.change / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('analyticsInfo')}</h4>
        <p>{t('analyticsDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('analyticsNote1')}</li>
          <li>{t('analyticsNote2')}</li>
          <li>{t('analyticsNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
