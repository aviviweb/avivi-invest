import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'

export default function Portfolio(){
  const { t, isRTL } = useLanguage()
  const [positions, setPositions] = useState([])
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/portfolio')
      setPositions(response.data.positions || [])
      setAccount(response.data.account)
      setError(null)
    } catch (err) {
      setError(t('error'))
      console.error('Portfolio fetch error:', err)
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <section>
        <h2>{t('portfolio')}</h2>
        <p>{t('loading')}</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2>{t('portfolio')}</h2>
        <p style={{color: 'red'}}>{error}</p>
        <button onClick={fetchPortfolio}>{t('retry')}</button>
      </section>
    )
  }

  return (
    <section>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>{t('portfolio')}</h2>
        <button onClick={fetchPortfolio} style={{padding: '8px 16px', backgroundColor: '#0ea5a4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
          {t('refresh')}
        </button>
      </div>

      {account && (
        <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
          <h3>{t('accountSummary')}</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px'}}>
            <div>
              <strong>{t('portfolioValue')}:</strong><br />
              {formatCurrency(parseFloat(account.portfolio_value || 0))}
            </div>
            <div>
              <strong>{t('buyingPower')}:</strong><br />
              {formatCurrency(parseFloat(account.buying_power || 0))}
            </div>
            <div>
              <strong>{t('cash')}:</strong><br />
              {formatCurrency(parseFloat(account.cash || 0))}
            </div>
            <div>
              <strong>{t('equity')}:</strong><br />
              {formatCurrency(parseFloat(account.equity || 0))}
            </div>
          </div>
        </div>
      )}

      <div>
        <h3>{t('positions')} ({positions.length})</h3>
        {positions.length === 0 ? (
          <p style={{padding: '20px', textAlign: 'center', color: '#6c757d'}}>
            {t('noPositions')}
          </p>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid #dee2e6'}}>
              <thead>
                <tr style={{backgroundColor: '#f8f9fa'}}>
                  <th style={{padding: '12px', textAlign: isRTL ? 'right' : 'left', borderBottom: '1px solid #dee2e6'}}>{t('symbol')}</th>
                  <th style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', borderBottom: '1px solid #dee2e6'}}>{t('quantity')}</th>
                  <th style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', borderBottom: '1px solid #dee2e6'}}>{t('marketValue')}</th>
                  <th style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', borderBottom: '1px solid #dee2e6'}}>{t('unrealizedPL')}</th>
                  <th style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', borderBottom: '1px solid #dee2e6'}}>{t('unrealizedPLPercent')}</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position, index) => (
                  <tr key={index} style={{borderBottom: '1px solid #dee2e6'}}>
                    <td style={{padding: '12px', fontWeight: 'bold'}}>{position.symbol}</td>
                    <td style={{padding: '12px', textAlign: isRTL ? 'left' : 'right'}}>{parseFloat(position.qty || 0).toFixed(2)}</td>
                    <td style={{padding: '12px', textAlign: isRTL ? 'left' : 'right'}}>{formatCurrency(parseFloat(position.market_value || 0))}</td>
                    <td style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', color: parseFloat(position.unrealized_pl || 0) >= 0 ? '#28a745' : '#dc3545'}}>
                      {formatCurrency(parseFloat(position.unrealized_pl || 0))}
                    </td>
                    <td style={{padding: '12px', textAlign: isRTL ? 'left' : 'right', color: parseFloat(position.unrealized_plpc || 0) >= 0 ? '#28a745' : '#dc3545'}}>
                      {formatPercentage(parseFloat(position.unrealized_plpc || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
