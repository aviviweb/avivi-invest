import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function RiskManagement() {
  const { t, isRTL } = useLanguage()
  const [riskSettings, setRiskSettings] = useState({
    maxPositionSize: 10,
    maxPortfolioRisk: 20,
    stopLossPercentage: 5,
    takeProfitPercentage: 10,
    maxDrawdown: 15,
    correlationLimit: 0.7,
    volatilityLimit: 30,
    maxLeverage: 2,
    dailyLossLimit: 5,
    weeklyLossLimit: 10
  })
  
  const [riskMetrics, setRiskMetrics] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generateRiskMetrics()
    generateAlerts()
  }, [])

  const generateRiskMetrics = () => {
    // Mock risk metrics
    const mockMetrics = {
      portfolioValue: 100000,
      totalRisk: 12.5,
      maxDrawdown: 8.2,
      sharpeRatio: 1.8,
      beta: 1.2,
      volatility: 18.5,
      var95: 2.8,
      var99: 4.1,
      expectedShortfall: 3.5,
      correlationMatrix: generateCorrelationMatrix(),
      positionRisks: generatePositionRisks(),
      stressTestResults: generateStressTestResults()
    }
    
    setRiskMetrics(mockMetrics)
  }

  const generateCorrelationMatrix = () => {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']
    const matrix = {}
    
    symbols.forEach(symbol1 => {
      matrix[symbol1] = {}
      symbols.forEach(symbol2 => {
        if (symbol1 === symbol2) {
          matrix[symbol1][symbol2] = 1.0
        } else {
          matrix[symbol1][symbol2] = Math.random() * 0.8 - 0.4
        }
      })
    })
    
    return matrix
  }

  const generatePositionRisks = () => {
    return [
      { symbol: 'AAPL', position: 5000, risk: 2.1, beta: 1.1, volatility: 22.3 },
      { symbol: 'GOOGL', position: 3000, risk: 1.8, beta: 1.3, volatility: 25.7 },
      { symbol: 'MSFT', position: 4000, risk: 1.5, beta: 0.9, volatility: 18.2 },
      { symbol: 'TSLA', position: 2000, risk: 3.2, beta: 1.8, volatility: 35.4 },
      { symbol: 'AMZN', position: 1500, risk: 2.8, beta: 1.4, volatility: 28.9 }
    ]
  }

  const generateStressTestResults = () => {
    return [
      { scenario: t('marketCrash'), impact: -15.2, probability: 5 },
      { scenario: t('recession'), impact: -8.7, probability: 15 },
      { scenario: t('volatilitySpike'), impact: -12.3, probability: 10 },
      { scenario: t('sectorRotation'), impact: -6.1, probability: 25 },
      { scenario: t('interestRateHike'), impact: -4.8, probability: 30 }
    ]
  }

  const generateAlerts = () => {
    const mockAlerts = [
      {
        id: 1,
        type: 'warning',
        message: t('highCorrelationAlert'),
        timestamp: new Date().toISOString(),
        severity: 'medium'
      },
      {
        id: 2,
        type: 'info',
        message: t('volatilityIncreaseAlert'),
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        severity: 'low'
      },
      {
        id: 3,
        type: 'error',
        message: t('drawdownLimitAlert'),
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        severity: 'high'
      }
    ]
    
    setAlerts(mockAlerts)
  }

  const updateRiskSetting = (key, value) => {
    setRiskSettings(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }))
  }

  const getRiskColor = (value, threshold) => {
    if (value <= threshold * 0.5) return '#28a745'
    if (value <= threshold * 0.8) return '#ffc107'
    return '#dc3545'
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return '🔴'
      case 'warning': return '🟡'
      case 'info': return '🔵'
      default: return '⚪'
    }
  }

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  if (!riskMetrics) {
    return (
      <section>
        <h2>{t('riskManagement')}</h2>
        <div style={{textAlign: 'center', padding: '40px'}}>
          <div className="loading-spinner" style={{margin: '0 auto'}}></div>
          <p>{t('loading')}</p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h2>{t('riskManagement')}</h2>

      {/* Risk Overview */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px'}}>
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('totalRisk')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: getRiskColor(riskMetrics.totalRisk, 20)}}>
            {formatPercentage(riskMetrics.totalRisk)}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('maxDrawdown')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: getRiskColor(riskMetrics.maxDrawdown, 15)}}>
            {formatPercentage(riskMetrics.maxDrawdown)}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('sharpeRatio')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {riskMetrics.sharpeRatio.toFixed(2)}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('volatility')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: getRiskColor(riskMetrics.volatility, 30)}}>
            {formatPercentage(riskMetrics.volatility)}
          </p>
        </div>
      </div>

      {/* Risk Settings */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('riskSettings')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('maxPositionSize')} (%)
            </label>
            <input 
              type="number"
              value={riskSettings.maxPositionSize}
              onChange={e => updateRiskSetting('maxPositionSize', e.target.value)}
              min="1"
              max="50"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('maxPortfolioRisk')} (%)
            </label>
            <input 
              type="number"
              value={riskSettings.maxPortfolioRisk}
              onChange={e => updateRiskSetting('maxPortfolioRisk', e.target.value)}
              min="5"
              max="50"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('stopLossPercentage')} (%)
            </label>
            <input 
              type="number"
              value={riskSettings.stopLossPercentage}
              onChange={e => updateRiskSetting('stopLossPercentage', e.target.value)}
              min="1"
              max="20"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('takeProfitPercentage')} (%)
            </label>
            <input 
              type="number"
              value={riskSettings.takeProfitPercentage}
              onChange={e => updateRiskSetting('takeProfitPercentage', e.target.value)}
              min="5"
              max="50"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
        </div>
      </div>

      {/* Position Risks */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('positionRisks')}</h3>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('symbol')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('position')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('risk')} (%)</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('beta')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('volatility')} (%)</th>
              </tr>
            </thead>
            <tbody>
              {riskMetrics.positionRisks.map((position, index) => (
                <tr key={index}>
                  <td style={{fontWeight: 'bold'}}>{position.symbol}</td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>{formatCurrency(position.position)}</td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', color: getRiskColor(position.risk, 5)}}>
                    {formatPercentage(position.risk)}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>{position.beta.toFixed(2)}</td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', color: getRiskColor(position.volatility, 30)}}>
                    {formatPercentage(position.volatility)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correlation Matrix */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('correlationMatrix')}</h3>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th></th>
                {Object.keys(riskMetrics.correlationMatrix).map(symbol => (
                  <th key={symbol} style={{textAlign: 'center'}}>{symbol}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(riskMetrics.correlationMatrix).map(([symbol1, correlations]) => (
                <tr key={symbol1}>
                  <td style={{fontWeight: 'bold'}}>{symbol1}</td>
                  {Object.entries(correlations).map(([symbol2, correlation]) => (
                    <td key={symbol2} style={{textAlign: 'center', color: getRiskColor(Math.abs(correlation), 0.7)}}>
                      {correlation.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stress Test Results */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('stressTestResults')}</h3>
        <div style={{display: 'grid', gap: '15px'}}>
          {riskMetrics.stressTestResults.map((test, index) => (
            <div key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
              <div>
                <strong>{test.scenario}</strong>
                <div style={{fontSize: '12px', color: '#6c757d'}}>
                  {t('probability')}: {test.probability}%
                </div>
              </div>
              <div style={{textAlign: isRTL ? 'left' : 'right'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: test.impact < 0 ? '#dc3545' : '#28a745'}}>
                  {formatPercentage(test.impact)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>
                  {t('impact')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Alerts */}
      <div className="card">
        <h3>{t('riskAlerts')}</h3>
        <div style={{display: 'grid', gap: '10px'}}>
          {alerts.map(alert => (
            <div key={alert.id} style={{
              padding: '15px',
              backgroundColor: alert.type === 'error' ? '#f8d7da' : alert.type === 'warning' ? '#fff3cd' : '#d1ecf1',
              border: `1px solid ${alert.type === 'error' ? '#f5c6cb' : alert.type === 'warning' ? '#ffeaa7' : '#bee5eb'}`,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{fontSize: '20px'}}>{getAlertIcon(alert.type)}</span>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 'bold'}}>{alert.message}</div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>
                  {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
              <div style={{
                padding: '4px 8px',
                backgroundColor: alert.severity === 'high' ? '#dc3545' : alert.severity === 'medium' ? '#ffc107' : '#28a745',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {t(alert.severity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Info */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('riskInfo')}</h4>
        <p>{t('riskDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('riskNote1')}</li>
          <li>{t('riskNote2')}</li>
          <li>{t('riskNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
