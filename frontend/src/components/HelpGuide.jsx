import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function HelpGuide() {
  const { t, isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState('getting-started')

  const tabs = [
    { id: 'getting-started', label: t('gettingStarted'), icon: '🚀' },
    { id: 'trading', label: t('tradingGuide'), icon: '📈' },
    { id: 'portfolio', label: t('portfolioGuide'), icon: '💼' },
    { id: 'analytics', label: t('analyticsGuide'), icon: '📊' },
    { id: 'settings', label: t('settingsGuide'), icon: '⚙️' },
    { id: 'faq', label: t('faq'), icon: '❓' }
  ]

  const helpContent = {
    'getting-started': {
      title: t('gettingStarted'),
      content: (
        <div>
          <h3>{t('welcomeToAvivi')}</h3>
          <p>{t('welcomeDescription')}</p>
          
          <h4>{t('firstSteps')}</h4>
          <ol style={{paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
            <li>{t('step1')}</li>
            <li>{t('step2')}</li>
            <li>{t('step3')}</li>
            <li>{t('step4')}</li>
          </ol>

          <h4>{t('importantNotes')}</h4>
          <ul style={{paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
            <li>{t('note1')}</li>
            <li>{t('note2')}</li>
            <li>{t('note3')}</li>
          </ul>
        </div>
      )
    },
    'trading': {
      title: t('tradingGuide'),
      content: (
        <div>
          <h3>{t('howToTrade')}</h3>
          <p>{t('tradingDescription')}</p>
          
          <h4>{t('orderTypes')}</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
            <div className="card">
              <h5>{t('marketOrder')}</h5>
              <p>{t('marketOrderDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('limitOrder')}</h5>
              <p>{t('limitOrderDesc')}</p>
            </div>
          </div>

          <h4>{t('tradingSteps')}</h4>
          <ol style={{paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
            <li>{t('tradingStep1')}</li>
            <li>{t('tradingStep2')}</li>
            <li>{t('tradingStep3')}</li>
            <li>{t('tradingStep4')}</li>
          </ol>
        </div>
      )
    },
    'portfolio': {
      title: t('portfolioGuide'),
      content: (
        <div>
          <h3>{t('understandingPortfolio')}</h3>
          <p>{t('portfolioDescription')}</p>
          
          <h4>{t('portfolioMetrics')}</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
            <div className="card">
              <h5>{t('totalValue')}</h5>
              <p>{t('totalValueDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('unrealizedPL')}</h5>
              <p>{t('unrealizedPLDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('buyingPower')}</h5>
              <p>{t('buyingPowerDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('positions')}</h5>
              <p>{t('positionsDesc')}</p>
            </div>
          </div>
        </div>
      )
    },
    'analytics': {
      title: t('analyticsGuide'),
      content: (
        <div>
          <h3>{t('understandingAnalytics')}</h3>
          <p>{t('analyticsDescription')}</p>
          
          <h4>{t('keyMetrics')}</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
            <div className="card">
              <h5>{t('totalReturn')}</h5>
              <p>{t('totalReturnDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('maxDrawdown')}</h5>
              <p>{t('maxDrawdownDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('sharpeRatio')}</h5>
              <p>{t('sharpeRatioDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('winRate')}</h5>
              <p>{t('winRateDesc')}</p>
            </div>
          </div>
        </div>
      )
    },
    'settings': {
      title: t('settingsGuide'),
      content: (
        <div>
          <h3>{t('customizingSettings')}</h3>
          <p>{t('settingsDescription')}</p>
          
          <h4>{t('preferenceCategories')}</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
            <div className="card">
              <h5>{t('languageSettings')}</h5>
              <p>{t('languageSettingsDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('tradingSettings')}</h5>
              <p>{t('tradingSettingsDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('displaySettings')}</h5>
              <p>{t('displaySettingsDesc')}</p>
            </div>
            <div className="card">
              <h5>{t('notificationSettings')}</h5>
              <p>{t('notificationSettingsDesc')}</p>
            </div>
          </div>
        </div>
      )
    },
    'faq': {
      title: t('faq'),
      content: (
        <div>
          <h3>{t('frequentlyAskedQuestions')}</h3>
          
          <div style={{display: 'grid', gap: '15px'}}>
            <div className="card">
              <h5>{t('faq1')}</h5>
              <p>{t('faq1Answer')}</p>
            </div>
            <div className="card">
              <h5>{t('faq2')}</h5>
              <p>{t('faq2Answer')}</p>
            </div>
            <div className="card">
              <h5>{t('faq3')}</h5>
              <p>{t('faq3Answer')}</p>
            </div>
            <div className="card">
              <h5>{t('faq4')}</h5>
              <p>{t('faq4Answer')}</p>
            </div>
            <div className="card">
              <h5>{t('faq5')}</h5>
              <p>{t('faq5Answer')}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <section>
      <h2>{t('helpGuide')}</h2>
      
      {/* Tab Navigation */}
      <div style={{marginBottom: '20px'}}>
        <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '20px'}}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 15px',
                backgroundColor: activeTab === tab.id ? '#0ea5a4' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#333',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="card">
        <h3>{helpContent[activeTab].title}</h3>
        {helpContent[activeTab].content}
      </div>

      {/* Quick Actions */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('quickActions')}</h4>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <button 
            onClick={() => setActiveTab('getting-started')}
            style={{padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            {t('startTrading')}
          </button>
          <button 
            onClick={() => setActiveTab('faq')}
            style={{padding: '8px 16px', backgroundColor: '#0ea5a4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            {t('viewFAQ')}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            style={{padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            {t('customizeSettings')}
          </button>
        </div>
      </div>
    </section>
  )
}
