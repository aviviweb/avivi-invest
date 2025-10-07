import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navigation() {
  const { t, isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState('dashboard')

  const sections = [
    { id: 'dashboard', label: t('dashboard'), icon: '📊' },
    { id: 'portfolio', label: t('portfolio'), icon: '💼' },
    { id: 'orders', label: t('orders'), icon: '📋' },
    { id: 'chart', label: t('marketChart'), icon: '📈' },
    { id: 'advanced-charts', label: t('advancedCharts'), icon: '📊' },
    { id: 'realtime-data', label: t('realTimeData'), icon: '⚡' },
    { id: 'strategies', label: t('tradingStrategies'), icon: '🎯' },
    { id: 'risk-management', label: t('riskManagement'), icon: '🛡️' },
    { id: 'portfolio-optimization', label: t('portfolioOptimization'), icon: '⚖️' },
    { id: 'advanced-reporting', label: t('advancedReporting'), icon: '📊' },
    { id: 'ai-assistant', label: t('aiTradingAssistant'), icon: '🤖' },
    { id: 'social-trading', label: t('socialTrading'), icon: '👥' },
    { id: 'advanced-security', label: t('advancedSecurity'), icon: '🔒' },
    { id: 'analytics', label: t('analytics'), icon: '📊' },
    { id: 'notifications', label: t('notifications'), icon: '🔔' },
    { id: 'preferences', label: t('userPreferences'), icon: '⚙️' },
    { id: 'help', label: t('helpGuide'), icon: '❓' },
    { id: 'settings', label: t('settings'), icon: '🔧' }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      borderBottom: '1px solid #dee2e6',
      padding: '10px 0',
      marginBottom: '20px',
      zIndex: 100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeSection === section.id ? '#0ea5a4' : 'transparent',
              color: activeSection === section.id ? 'white' : '#333',
              border: '1px solid #dee2e6',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeSection === section.id ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== section.id) {
                e.target.style.backgroundColor = '#f8f9fa'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== section.id) {
                e.target.style.backgroundColor = 'transparent'
              }
            }}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
