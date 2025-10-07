import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function PortfolioOptimization() {
  const { t, isRTL } = useLanguage()
  const [optimizationSettings, setOptimizationSettings] = useState({
    targetReturn: 12,
    maxRisk: 15,
    rebalanceFrequency: 'monthly',
    minWeight: 1,
    maxWeight: 30,
    transactionCost: 0.1,
    taxRate: 25
  })
  
  const [currentPortfolio, setCurrentPortfolio] = useState([])
  const [optimizedPortfolio, setOptimizedPortfolio] = useState(null)
  const [optimizationResults, setOptimizationResults] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generateCurrentPortfolio()
  }, [])

  const generateCurrentPortfolio = () => {
    const mockPortfolio = [
      { symbol: 'AAPL', weight: 25, expectedReturn: 12.5, risk: 18.2, currentValue: 25000 },
      { symbol: 'GOOGL', weight: 20, expectedReturn: 15.3, risk: 22.1, currentValue: 20000 },
      { symbol: 'MSFT', weight: 18, expectedReturn: 11.8, risk: 16.7, currentValue: 18000 },
      { symbol: 'TSLA', weight: 15, expectedReturn: 18.7, risk: 28.9, currentValue: 15000 },
      { symbol: 'AMZN', weight: 12, expectedReturn: 13.2, risk: 20.4, currentValue: 12000 },
      { symbol: 'META', weight: 10, expectedReturn: 14.6, risk: 24.3, currentValue: 10000 }
    ]
    
    setCurrentPortfolio(mockPortfolio)
  }

  const runOptimization = async () => {
    setLoading(true)
    
    try {
      // Simulate optimization calculation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const optimized = generateOptimizedPortfolio()
      setOptimizedPortfolio(optimized)
      
      const results = generateOptimizationResults()
      setOptimizationResults(results)
      
    } catch (error) {
      console.error('Error running optimization:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateOptimizedPortfolio = () => {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'SPY']
    const optimized = []
    
    let remainingWeight = 100
    symbols.forEach((symbol, index) => {
      const weight = index === symbols.length - 1 ? remainingWeight : Math.random() * remainingWeight * 0.3
      remainingWeight -= weight
      
      optimized.push({
        symbol,
        weight: Math.round(weight * 100) / 100,
        expectedReturn: 8 + Math.random() * 15,
        risk: 15 + Math.random() * 20,
        currentValue: Math.random() * 50000
      })
    })
    
    return optimized
  }

  const generateOptimizationResults = () => {
    return {
      expectedReturn: 13.7,
      expectedRisk: 16.2,
      sharpeRatio: 0.85,
      maxDrawdown: 12.3,
      diversificationRatio: 0.78,
      concentrationRisk: 0.22,
      rebalanceCost: 1250,
      taxImpact: 3125,
      improvement: 2.3
    }
  }

  const updateOptimizationSetting = (key, value) => {
    setOptimizationSettings(prev => ({
      ...prev,
      [key]: value
    }))
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

  const getWeightColor = (weight) => {
    if (weight < 5) return '#dc3545'
    if (weight < 15) return '#ffc107'
    return '#28a745'
  }

  return (
    <section>
      <h2>{t('portfolioOptimization')}</h2>

      {/* Optimization Settings */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('optimizationSettings')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('targetReturn')} (%)
            </label>
            <input 
              type="number"
              value={optimizationSettings.targetReturn}
              onChange={e => updateOptimizationSetting('targetReturn', parseFloat(e.target.value))}
              min="5"
              max="30"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('maxRisk')} (%)
            </label>
            <input 
              type="number"
              value={optimizationSettings.maxRisk}
              onChange={e => updateOptimizationSetting('maxRisk', parseFloat(e.target.value))}
              min="5"
              max="50"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('rebalanceFrequency')}
            </label>
            <select 
              value={optimizationSettings.rebalanceFrequency}
              onChange={e => updateOptimizationSetting('rebalanceFrequency', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="daily">{t('daily')}</option>
              <option value="weekly">{t('weekly')}</option>
              <option value="monthly">{t('monthly')}</option>
              <option value="quarterly">{t('quarterly')}</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('transactionCost')} (%)
            </label>
            <input 
              type="number"
              value={optimizationSettings.transactionCost}
              onChange={e => updateOptimizationSetting('transactionCost', parseFloat(e.target.value))}
              min="0"
              max="2"
              step="0.1"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
        </div>
        
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <button 
            onClick={runOptimization}
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: '#0ea5a4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {loading ? t('optimizing') : t('runOptimization')}
          </button>
        </div>
      </div>

      {/* Current Portfolio */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('currentPortfolio')}</h3>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('symbol')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('weight')} (%)</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('expectedReturn')} (%)</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('risk')} (%)</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('value')}</th>
              </tr>
            </thead>
            <tbody>
              {currentPortfolio.map((position, index) => (
                <tr key={index}>
                  <td style={{fontWeight: 'bold'}}>{position.symbol}</td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', color: getWeightColor(position.weight)}}>
                    {formatPercentage(position.weight)}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', color: '#28a745'}}>
                    {formatPercentage(position.expectedReturn)}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', color: '#dc3545'}}>
                    {formatPercentage(position.risk)}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    {formatCurrency(position.currentValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optimization Results */}
      {optimizationResults && (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px'}}>
          <div className="card">
            <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('expectedReturn')}</h3>
            <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#28a745'}}>
              {formatPercentage(optimizationResults.expectedReturn)}
            </p>
          </div>
          
          <div className="card">
            <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('expectedRisk')}</h3>
            <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#dc3545'}}>
              {formatPercentage(optimizationResults.expectedRisk)}
            </p>
          </div>
          
          <div className="card">
            <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('sharpeRatio')}</h3>
            <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
              {optimizationResults.sharpeRatio.toFixed(2)}
            </p>
          </div>
          
          <div className="card">
            <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('improvement')}</h3>
            <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#28a745'}}>
              +{formatPercentage(optimizationResults.improvement)}
            </p>
          </div>
        </div>
      )}

      {/* Optimized Portfolio */}
      {optimizedPortfolio && (
        <div className="card" style={{marginBottom: '30px'}}>
          <h3>{t('optimizedPortfolio')}</h3>
          <div style={{overflowX: 'auto'}}>
            <table>
              <thead>
                <tr>
                  <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('symbol')}</th>
                  <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('weight')} (%)</th>
                  <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('expectedReturn')} (%)</th>
                  <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('risk')} (%)</th>
                  <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('value')}</th>
                  <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('change')}</th>
                </tr>
              </thead>
              <tbody>
                {optimizedPortfolio.map((position, index) => {
                  const currentPosition = currentPortfolio.find(p => p.symbol === position.symbol)
                  const change = currentPosition ? position.weight - currentPosition.weight : position.weight
                  
                  return (
                    <tr key={index}>
                      <td style={{fontWeight: 'bold'}}>{position.symbol}</td>
                      <td style={{textAlign: isRTL ? 'left' : 'right', color: getWeightColor(position.weight)}}>
                        {formatPercentage(position.weight)}
                      </td>
                      <td style={{textAlign: isRTL ? 'left' : 'right', color: '#28a745'}}>
                        {formatPercentage(position.expectedReturn)}
                      </td>
                      <td style={{textAlign: isRTL ? 'left' : 'right', color: '#dc3545'}}>
                        {formatPercentage(position.risk)}
                      </td>
                      <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                        {formatCurrency(position.currentValue)}
                      </td>
                      <td style={{textAlign: isRTL ? 'left' : 'right', color: change > 0 ? '#28a745' : change < 0 ? '#dc3545' : '#6c757d'}}>
                        {change > 0 ? '+' : ''}{formatPercentage(change)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Optimization Details */}
      {optimizationResults && (
        <div className="card" style={{marginBottom: '30px'}}>
          <h3>{t('optimizationDetails')}</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
            <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
              <div style={{fontSize: '18px', fontWeight: 'bold', color: '#0ea5a4'}}>
                {optimizationResults.diversificationRatio.toFixed(2)}
              </div>
              <div style={{fontSize: '12px', color: '#6c757d'}}>{t('diversificationRatio')}</div>
            </div>
            
            <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
              <div style={{fontSize: '18px', fontWeight: 'bold', color: '#dc3545'}}>
                {formatPercentage(optimizationResults.concentrationRisk)}
              </div>
              <div style={{fontSize: '12px', color: '#6c757d'}}>{t('concentrationRisk')}</div>
            </div>
            
            <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
              <div style={{fontSize: '18px', fontWeight: 'bold', color: '#ffc107'}}>
                {formatCurrency(optimizationResults.rebalanceCost)}
              </div>
              <div style={{fontSize: '12px', color: '#6c757d'}}>{t('rebalanceCost')}</div>
            </div>
            
            <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
              <div style={{fontSize: '18px', fontWeight: 'bold', color: '#6c757d'}}>
                {formatCurrency(optimizationResults.taxImpact)}
              </div>
              <div style={{fontSize: '12px', color: '#6c757d'}}>{t('taxImpact')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Info */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('optimizationInfo')}</h4>
        <p>{t('optimizationDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('optimizationNote1')}</li>
          <li>{t('optimizationNote2')}</li>
          <li>{t('optimizationNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
