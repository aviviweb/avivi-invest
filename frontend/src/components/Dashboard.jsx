import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'

export default function Dashboard(){
  const { t, isRTL } = useLanguage()
  const [account, setAccount] = useState(null)
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolioData()
  }, [])

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get('/api/portfolio')
      setAccount(response.data.account)
      setPositions(response.data.positions || [])
    } catch (error) {
      console.error('Error fetching portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalValue = () => {
    if (!account) return 0
    return parseFloat(account.portfolio_value || 0)
  }

  const calculateUnrealizedPL = () => {
    return positions.reduce((total, pos) => {
      return total + parseFloat(pos.unrealized_pl || 0)
    }, 0)
  }

  if (loading) {
    return (
      <section>
        <h2>{t('dashboard')}</h2>
        <p>{t('loading')}</p>
      </section>
    )
  }

  return (
    <section>
      <h2>{t('dashboard')}</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px'}}>
        <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef'}}>
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('totalValue')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            ${calculateTotalValue().toLocaleString()}
          </p>
        </div>
        
        <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef'}}>
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('unrealizedPL')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: calculateUnrealizedPL() >= 0 ? '#28a745' : '#dc3545'}}>
            ${calculateUnrealizedPL().toLocaleString()}
          </p>
        </div>
        
        <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef'}}>
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('buyingPower')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            ${account ? parseFloat(account.buying_power || 0).toLocaleString() : '0'}
          </p>
        </div>
        
        <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef'}}>
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('positions')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {positions.length}
          </p>
        </div>
      </div>

      <div style={{marginTop: '20px'}}>
        <h3>{t('recentActivity')}</h3>
        <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
          <p>📈 {t('portfolioPerformance')}</p>
          <p>📊 {t('realTimeData')}</p>
          <p>⚡ {t('automatedTrading')}</p>
          <p>🛡️ {t('riskManagement')}</p>
        </div>
      </div>
    </section>
  )
}
