import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function TradingStrategies() {
  const { t, isRTL } = useLanguage()
  const [strategies, setStrategies] = useState([])
  const [activeStrategy, setActiveStrategy] = useState(null)
  const [loading, setLoading] = useState(false)
  const [strategyPerformance, setStrategyPerformance] = useState({})

  useEffect(() => {
    loadStrategies()
  }, [])

  const loadStrategies = () => {
    // Mock strategies data
    const mockStrategies = [
      {
        id: 'momentum',
        name: t('momentumStrategy'),
        description: t('momentumStrategyDesc'),
        riskLevel: 'medium',
        expectedReturn: 12.5,
        maxDrawdown: 8.2,
        sharpeRatio: 1.8,
        winRate: 65,
        isActive: false,
        parameters: {
          lookbackPeriod: 20,
          threshold: 0.02,
          stopLoss: 0.05,
          takeProfit: 0.10
        }
      },
      {
        id: 'mean-reversion',
        name: t('meanReversionStrategy'),
        description: t('meanReversionStrategyDesc'),
        riskLevel: 'low',
        expectedReturn: 8.3,
        maxDrawdown: 5.1,
        sharpeRatio: 2.1,
        winRate: 72,
        isActive: false,
        parameters: {
          lookbackPeriod: 14,
          threshold: 0.03,
          stopLoss: 0.03,
          takeProfit: 0.06
        }
      },
      {
        id: 'breakout',
        name: t('breakoutStrategy'),
        description: t('breakoutStrategyDesc'),
        riskLevel: 'high',
        expectedReturn: 18.7,
        maxDrawdown: 15.3,
        sharpeRatio: 1.4,
        winRate: 58,
        isActive: false,
        parameters: {
          lookbackPeriod: 10,
          threshold: 0.05,
          stopLoss: 0.08,
          takeProfit: 0.15
        }
      },
      {
        id: 'arbitrage',
        name: t('arbitrageStrategy'),
        description: t('arbitrageStrategyDesc'),
        riskLevel: 'low',
        expectedReturn: 6.2,
        maxDrawdown: 2.8,
        sharpeRatio: 2.8,
        winRate: 85,
        isActive: false,
        parameters: {
          lookbackPeriod: 5,
          threshold: 0.01,
          stopLoss: 0.02,
          takeProfit: 0.04
        }
      }
    ]
    
    setStrategies(mockStrategies)
  }

  const toggleStrategy = async (strategyId) => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStrategies(prev => prev.map(strategy => 
        strategy.id === strategyId 
          ? { ...strategy, isActive: !strategy.isActive }
          : strategy
      ))
      
      // Generate mock performance data
      const performance = generateMockPerformance(strategyId)
      setStrategyPerformance(prev => ({
        ...prev,
        [strategyId]: performance
      }))
      
    } catch (error) {
      console.error('Error toggling strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockPerformance = (strategyId) => {
    const baseReturn = Math.random() * 20 - 5
    const volatility = Math.random() * 10 + 5
    
    return {
      totalReturn: baseReturn,
      volatility: volatility,
      sharpeRatio: baseReturn / volatility,
      maxDrawdown: Math.random() * 15 + 5,
      winRate: Math.random() * 30 + 50,
      totalTrades: Math.floor(Math.random() * 100) + 20,
      avgTradeReturn: baseReturn / 10,
      lastUpdate: new Date().toISOString()
    }
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return '#28a745'
      case 'medium': return '#ffc107'
      case 'high': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return '🟢'
      case 'medium': return '🟡'
      case 'high': return '🔴'
      default: return '⚪'
    }
  }

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <section>
      <h2>{t('tradingStrategies')}</h2>
      
      {/* Strategy Overview */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px'}}>
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('totalStrategies')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {strategies.length}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('activeStrategies')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#28a745'}}>
            {strategies.filter(s => s.isActive).length}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('avgReturn')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {formatPercentage(strategies.reduce((sum, s) => sum + s.expectedReturn, 0) / strategies.length)}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('avgSharpe')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {(strategies.reduce((sum, s) => sum + s.sharpeRatio, 0) / strategies.length).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Strategies List */}
      <div style={{display: 'grid', gap: '20px'}}>
        {strategies.map(strategy => (
          <div key={strategy.id} className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px'}}>
              <div>
                <h3 style={{margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '10px'}}>
                  {strategy.name}
                  <span style={{color: getRiskColor(strategy.riskLevel)}}>
                    {getRiskIcon(strategy.riskLevel)} {t(strategy.riskLevel)}
                  </span>
                </h3>
                <p style={{margin: '0 0 15px 0', color: '#6c757d'}}>
                  {strategy.description}
                </p>
              </div>
              
              <button 
                onClick={() => toggleStrategy(strategy.id)}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  backgroundColor: strategy.isActive ? '#dc3545' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {loading ? t('loading') : strategy.isActive ? t('deactivate') : t('activate')}
              </button>
            </div>

            {/* Strategy Metrics */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '15px'}}>
              <div style={{textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#28a745'}}>
                  {formatPercentage(strategy.expectedReturn)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('expectedReturn')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#dc3545'}}>
                  {formatPercentage(strategy.maxDrawdown)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('maxDrawdown')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#0ea5a4'}}>
                  {strategy.sharpeRatio.toFixed(2)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('sharpeRatio')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#28a745'}}>
                  {strategy.winRate}%
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('winRate')}</div>
              </div>
            </div>

            {/* Strategy Parameters */}
            <div style={{marginBottom: '15px'}}>
              <h4>{t('strategyParameters')}</h4>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px'}}>
                {Object.entries(strategy.parameters).map(([key, value]) => (
                  <div key={key} style={{textAlign: 'center', padding: '8px', backgroundColor: '#e9ecef', borderRadius: '4px'}}>
                    <div style={{fontSize: '14px', fontWeight: 'bold'}}>{value}</div>
                    <div style={{fontSize: '12px', color: '#6c757d'}}>{t(key)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            {strategyPerformance[strategy.id] && (
              <div style={{marginTop: '15px'}}>
                <h4>{t('performanceChart')}</h4>
                <div style={{height: '100px', display: 'flex', alignItems: 'end', gap: '2px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px'}}>
                  {Array.from({length: 30}, (_, i) => {
                    const height = Math.random() * 80 + 10
                    const color = Math.random() > 0.5 ? '#28a745' : '#dc3545'
                    return (
                      <div 
                        key={i}
                        style={{
                          width: '8px',
                          height: `${height}px`,
                          backgroundColor: color,
                          borderRadius: '1px'
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {/* Status Indicator */}
            <div style={{marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px'}}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: strategy.isActive ? '#28a745' : '#6c757d'
              }} />
              <span style={{fontSize: '14px', color: '#6c757d'}}>
                {strategy.isActive ? t('strategyActive') : t('strategyInactive')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Info */}
      <div style={{marginTop: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('strategyInfo')}</h4>
        <p>{t('strategyDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('strategyNote1')}</li>
          <li>{t('strategyNote2')}</li>
          <li>{t('strategyNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
