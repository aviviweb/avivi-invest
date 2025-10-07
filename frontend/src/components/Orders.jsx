import React, {useState} from 'react'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'

export default function Orders(){
  const { t, isRTL } = useLanguage()
  const [symbol, setSymbol] = useState('AAPL')
  const [qty, setQty] = useState(1)
  const [side, setSide] = useState('buy')
  const [orderType, setOrderType] = useState('market')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState(null)

  const fetchQuote = async () => {
    if (!symbol.trim()) return
    
    try {
      const response = await axios.get(`/api/fetch_quote?ticker=${symbol.toUpperCase()}`)
      setQuote(response.data)
    } catch (error) {
      console.error('Error fetching quote:', error)
      setQuote(null)
    }
  }

  const placeOrder = async () => {
    if (!symbol.trim() || qty <= 0) {
      setStatus({error: 'Please enter valid symbol and quantity'})
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const orderData = {
        symbol: symbol.toUpperCase(),
        qty: parseFloat(qty),
        side: side,
        type: orderType,
        time_in_force: 'day'
      }

      const response = await axios.post('/api/create_order', orderData)
      setStatus({success: true, order: response.data})
      
      // Reset form
      setQty(1)
    } catch (error) {
      setStatus({
        error: error.response?.data?.detail || error.message || 'Order failed'
      })
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

  return (
    <section>
      <h2>{t('placeOrder')}</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px'}}>
        <div>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>{t('symbol')}</label>
          <div style={{display: 'flex', gap: '5px'}}>
            <input 
              value={symbol} 
              onChange={e => setSymbol(e.target.value.toUpperCase())}
              placeholder={t('symbolPlaceholder')}
              style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
            <button 
              onClick={fetchQuote}
              style={{padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
            >
              {t('quote')}
            </button>
          </div>
        </div>

        <div>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>{t('quantity')}</label>
          <input 
            type="number" 
            value={qty} 
            onChange={e => setQty(Math.max(0, parseFloat(e.target.value) || 0))}
            min="0"
            step="0.01"
            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
          />
        </div>

        <div>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>{t('side')}</label>
          <select 
            value={side} 
            onChange={e => setSide(e.target.value)}
            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
          >
            <option value="buy">{t('buy')}</option>
            <option value="sell">{t('sell')}</option>
          </select>
        </div>

        <div>
          <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>{t('orderType')}</label>
          <select 
            value={orderType} 
            onChange={e => setOrderType(e.target.value)}
            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
          >
            <option value="market">{t('market')}</option>
            <option value="limit">{t('limit')}</option>
          </select>
        </div>
      </div>

      {quote && (
        <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
          <h4 style={{margin: '0 0 10px 0'}}>{t('quote')}: {quote.symbol}</h4>
          <p style={{margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {formatCurrency(quote.price)}
          </p>
          <p style={{margin: '5px 0 0 0', fontSize: '12px', color: '#6c757d'}}>
            Last updated: {new Date(quote.timestamp).toLocaleString()}
          </p>
        </div>
      )}

      <div style={{marginBottom: '20px'}}>
        <button 
          onClick={placeOrder}
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: side === 'buy' ? '#28a745' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? t('placingOrder') : `${side === 'buy' ? t('buy') : t('sell')} ${qty} ${symbol}`}
        </button>
      </div>

      {status && (
        <div style={{
          padding: '15px',
          borderRadius: '8px',
          backgroundColor: status.error ? '#f8d7da' : '#d4edda',
          border: `1px solid ${status.error ? '#f5c6cb' : '#c3e6cb'}`,
          color: status.error ? '#721c24' : '#155724'
        }}>
          {status.error ? (
            <div>
              <strong>❌ {t('orderFailed')}:</strong><br />
              {status.error}
            </div>
          ) : (
            <div>
              <strong>✅ {t('orderSuccess')}</strong><br />
              <pre style={{margin: '10px 0 0 0', fontSize: '12px', backgroundColor: 'rgba(0,0,0,0.1)', padding: '10px', borderRadius: '4px'}}>
                {JSON.stringify(status.order, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
        <h4>{t('orderInfo')}</h4>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li><strong>{t('market')}:</strong> {t('marketOrders')}</li>
          <li><strong>{t('limit')}:</strong> {t('limitOrders')}</li>
          <li><strong>Day:</strong> {t('dayOrders')}</li>
          <li><strong>Paper:</strong> {t('paperTrading')}</li>
        </ul>
      </div>
    </section>
  )
}
