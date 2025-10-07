import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function UserPreferences() {
  const { t, isRTL, language, setLanguage } = useLanguage()
  const [preferences, setPreferences] = useState({
    theme: 'light',
    currency: 'USD',
    timezone: 'Asia/Jerusalem',
    notifications: true,
    soundEnabled: false,
    autoRefresh: true,
    refreshInterval: 30,
    defaultOrderType: 'market',
    defaultQuantity: 1,
    riskTolerance: 'medium',
    language: 'he'
  })

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('avivi-preferences')
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [])

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem('avivi-preferences', JSON.stringify(preferences))
  }, [preferences])

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetPreferences = () => {
    const defaultPrefs = {
      theme: 'light',
      currency: 'USD',
      timezone: 'Asia/Jerusalem',
      notifications: true,
      soundEnabled: false,
      autoRefresh: true,
      refreshInterval: 30,
      defaultOrderType: 'market',
      defaultQuantity: 1,
      riskTolerance: 'medium',
      language: 'he'
    }
    setPreferences(defaultPrefs)
    localStorage.setItem('avivi-preferences', JSON.stringify(defaultPrefs))
  }

  const exportPreferences = () => {
    const dataStr = JSON.stringify(preferences, null, 2)
    const dataBlob = new Blob([dataStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'avivi-preferences.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importPreferences = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedPrefs = JSON.parse(e.target.result)
          setPreferences(importedPrefs)
          localStorage.setItem('avivi-preferences', JSON.stringify(importedPrefs))
        } catch (error) {
          alert(t('importError'))
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <section>
      <h2>{t('userPreferences')}</h2>

      {/* Language Settings */}
      <div className="card" style={{marginBottom: '20px'}}>
        <h3>{t('languageSettings')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('language')}
            </label>
            <select 
              value={preferences.language}
              onChange={e => {
                updatePreference('language', e.target.value)
                setLanguage(e.target.value)
              }}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="he">{t('hebrew')}</option>
              <option value="en">{t('english')}</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('timezone')}
            </label>
            <select 
              value={preferences.timezone}
              onChange={e => updatePreference('timezone', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="Asia/Jerusalem">{t('jerusalem')}</option>
              <option value="America/New_York">{t('newYork')}</option>
              <option value="Europe/London">{t('london')}</option>
              <option value="Asia/Tokyo">{t('tokyo')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trading Settings */}
      <div className="card" style={{marginBottom: '20px'}}>
        <h3>{t('tradingSettings')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('defaultOrderType')}
            </label>
            <select 
              value={preferences.defaultOrderType}
              onChange={e => updatePreference('defaultOrderType', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="market">{t('market')}</option>
              <option value="limit">{t('limit')}</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('defaultQuantity')}
            </label>
            <input 
              type="number"
              value={preferences.defaultQuantity}
              onChange={e => updatePreference('defaultQuantity', parseInt(e.target.value))}
              min="1"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('riskTolerance')}
            </label>
            <select 
              value={preferences.riskTolerance}
              onChange={e => updatePreference('riskTolerance', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="low">{t('low')}</option>
              <option value="medium">{t('medium')}</option>
              <option value="high">{t('high')}</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('currency')}
            </label>
            <select 
              value={preferences.currency}
              onChange={e => updatePreference('currency', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="ILS">ILS</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="card" style={{marginBottom: '20px'}}>
        <h3>{t('displaySettings')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('theme')}
            </label>
            <select 
              value={preferences.theme}
              onChange={e => updatePreference('theme', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="light">{t('light')}</option>
              <option value="dark">{t('dark')}</option>
              <option value="auto">{t('auto')}</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('refreshInterval')} (seconds)
            </label>
            <input 
              type="number"
              value={preferences.refreshInterval}
              onChange={e => updatePreference('refreshInterval', parseInt(e.target.value))}
              min="10"
              max="300"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card" style={{marginBottom: '20px'}}>
        <h3>{t('notificationSettings')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <input 
              type="checkbox"
              checked={preferences.notifications}
              onChange={e => updatePreference('notifications', e.target.checked)}
              style={{transform: 'scale(1.2)'}}
            />
            <label style={{fontWeight: 'bold'}}>{t('enableNotifications')}</label>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <input 
              type="checkbox"
              checked={preferences.soundEnabled}
              onChange={e => updatePreference('soundEnabled', e.target.checked)}
              style={{transform: 'scale(1.2)'}}
            />
            <label style={{fontWeight: 'bold'}}>{t('enableSound')}</label>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <input 
              type="checkbox"
              checked={preferences.autoRefresh}
              onChange={e => updatePreference('autoRefresh', e.target.checked)}
              style={{transform: 'scale(1.2)'}}
            />
            <label style={{fontWeight: 'bold'}}>{t('autoRefresh')}</label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="card">
        <h3>{t('preferencesActions')}</h3>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <button 
            onClick={resetPreferences}
            style={{padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            {t('resetPreferences')}
          </button>
          
          <button 
            onClick={exportPreferences}
            style={{padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            {t('exportPreferences')}
          </button>
          
          <label style={{padding: '10px 20px', backgroundColor: '#0ea5a4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'inline-block'}}>
            {t('importPreferences')}
            <input 
              type="file"
              accept=".json"
              onChange={importPreferences}
              style={{display: 'none'}}
            />
          </label>
        </div>
      </div>

      {/* Current Preferences Summary */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
        <h3>{t('currentPreferences')}</h3>
        <pre style={{backgroundColor: 'white', padding: '15px', borderRadius: '4px', overflow: 'auto'}}>
          {JSON.stringify(preferences, null, 2)}
        </pre>
      </div>
    </section>
  )
}
