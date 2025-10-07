import React, { useEffect } from 'react'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import Portfolio from './components/Portfolio'
import Orders from './components/Orders'
import MarketChart from './components/MarketChart'
import AdvancedCharts from './components/AdvancedCharts'
import RealTimeData from './components/RealTimeData'
import TradingStrategies from './components/TradingStrategies'
import RiskManagement from './components/RiskManagement'
import PortfolioOptimization from './components/PortfolioOptimization'
import AdvancedReporting from './components/AdvancedReporting'
import AITradingAssistant from './components/AITradingAssistant'
import SocialTrading from './components/SocialTrading'
import AdvancedSecurity from './components/AdvancedSecurity'
import Analytics from './components/Analytics'
import Notifications from './components/Notifications'
import UserPreferences from './components/UserPreferences'
import HelpGuide from './components/HelpGuide'
import Settings from './components/Settings'

function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useLanguage()
  
  return (
    <div className="language-switcher">
      <button 
        className={language === 'he' ? 'active' : ''}
        onClick={() => language !== 'he' && toggleLanguage()}
      >
        {t('hebrew')}
      </button>
      <button 
        className={language === 'en' ? 'active' : ''}
        onClick={() => language !== 'en' && toggleLanguage()}
      >
        {t('english')}
      </button>
    </div>
  )
}

function AppContent() {
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    // Apply RTL class to body
    if (isRTL) {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }, [isRTL])

  return (
    <div style={{fontFamily: 'Arial, sans-serif', padding: 20}}>
      <LanguageSwitcher />
      
      <header style={{display:'flex', alignItems:'center', gap:12}}>
        <img src="/src/assets/logo.svg" alt={t('appTitle')} width="48" />
        <h1>{t('appTitle')} — Demo</h1>
      </header>

      <Navigation />
      
      <main style={{marginTop:20}}>
        <div id="dashboard">
          <Dashboard />
        </div>
        <hr />
        <div id="portfolio">
          <Portfolio />
        </div>
        <hr />
        <div id="orders">
          <Orders />
        </div>
        <hr />
        <div id="chart">
          <MarketChart />
        </div>
        <hr />
        <div id="advanced-charts">
          <AdvancedCharts />
        </div>
        <hr />
        <div id="realtime-data">
          <RealTimeData />
        </div>
        <hr />
        <div id="strategies">
          <TradingStrategies />
        </div>
        <hr />
        <div id="risk-management">
          <RiskManagement />
        </div>
        <hr />
        <div id="portfolio-optimization">
          <PortfolioOptimization />
        </div>
        <hr />
        <div id="advanced-reporting">
          <AdvancedReporting />
        </div>
        <hr />
        <div id="ai-assistant">
          <AITradingAssistant />
        </div>
        <hr />
        <div id="social-trading">
          <SocialTrading />
        </div>
        <hr />
        <div id="advanced-security">
          <AdvancedSecurity />
        </div>
        <hr />
        <div id="analytics">
          <Analytics />
        </div>
        <hr />
        <div id="notifications">
          <Notifications />
        </div>
        <hr />
        <div id="preferences">
          <UserPreferences />
        </div>
        <hr />
        <div id="help">
          <HelpGuide />
        </div>
        <hr />
        <div id="settings">
          <Settings />
        </div>
      </main>
    </div>
  )
}

export default function App(){
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
