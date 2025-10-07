import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function AITradingAssistant() {
  const { t, isRTL } = useLanguage()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [assistantMode, setAssistantMode] = useState('general')
  const [conversationHistory, setConversationHistory] = useState([])

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage = {
      id: 1,
      type: 'assistant',
      content: t('aiWelcomeMessage'),
      timestamp: new Date().toISOString()
    }
    setMessages([welcomeMessage])
  }, [t])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const response = generateAIResponse(inputMessage)
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])
      setConversationHistory(prev => [...prev, userMessage, assistantMessage])
      
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    // Trading advice
    if (lowerMessage.includes('buy') || lowerMessage.includes('sell') || lowerMessage.includes('trade')) {
      return t('aiTradingAdvice')
    }
    
    // Portfolio questions
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('investment')) {
      return t('aiPortfolioAdvice')
    }
    
    // Risk management
    if (lowerMessage.includes('risk') || lowerMessage.includes('safe')) {
      return t('aiRiskAdvice')
    }
    
    // Market analysis
    if (lowerMessage.includes('market') || lowerMessage.includes('analysis')) {
      return t('aiMarketAnalysis')
    }
    
    // Technical analysis
    if (lowerMessage.includes('chart') || lowerMessage.includes('technical')) {
      return t('aiTechnicalAnalysis')
    }
    
    // General help
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return t('aiGeneralHelp')
    }
    
    // Default response
    return t('aiDefaultResponse')
  }

  const quickActions = [
    { label: t('analyzePortfolio'), action: () => setInputMessage(t('analyzeMyPortfolio')) },
    { label: t('marketOutlook'), action: () => setInputMessage(t('whatIsMarketOutlook')) },
    { label: t('riskAssessment'), action: () => setInputMessage(t('assessMyRisk')) },
    { label: t('tradingStrategy'), action: () => setInputMessage(t('suggestTradingStrategy')) },
    { label: t('taxOptimization'), action: () => setInputMessage(t('optimizeMyTaxes')) },
    { label: t('complianceCheck'), action: () => setInputMessage(t('checkCompliance')) }
  ]

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <section>
      <h2>{t('aiTradingAssistant')}</h2>

      {/* Assistant Mode Selector */}
      <div className="card" style={{marginBottom: '20px'}}>
        <h3>{t('assistantMode')}</h3>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          {[
            { value: 'general', label: t('general'), icon: '💬' },
            { value: 'trading', label: t('trading'), icon: '📈' },
            { value: 'analysis', label: t('analysis'), icon: '🔍' },
            { value: 'risk', label: t('risk'), icon: '🛡️' },
            { value: 'tax', label: t('tax'), icon: '💰' }
          ].map(mode => (
            <button
              key={mode.value}
              onClick={() => setAssistantMode(mode.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid',
                borderColor: assistantMode === mode.value ? '#0ea5a4' : '#ddd',
                backgroundColor: assistantMode === mode.value ? '#0ea5a4' : 'white',
                color: assistantMode === mode.value ? 'white' : '#333',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: '500'
              }}
            >
              <span>{mode.icon}</span>
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{marginBottom: '20px'}}>
        <h3>{t('quickActions')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px'}}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e9ecef'
                e.target.style.borderColor = '#0ea5a4'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f8f9fa'
                e.target.style.borderColor = '#ddd'
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="card" style={{marginBottom: '20px'}}>
        <h3>{t('chatWithAssistant')}</h3>
        
        {/* Messages */}
        <div style={{
          height: '400px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px',
          backgroundColor: '#fafafa'
        }}>
          {messages.map(message => (
            <div
              key={message.id}
              style={{
                marginBottom: '15px',
                display: 'flex',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: '10px'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: message.type === 'user' ? '#0ea5a4' : '#6c757d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {message.type === 'user' ? '👤' : '🤖'}
              </div>
              
              <div style={{
                maxWidth: '70%',
                padding: '10px 15px',
                borderRadius: '18px',
                backgroundColor: message.type === 'user' ? '#0ea5a4' : '#e9ecef',
                color: message.type === 'user' ? 'white' : '#333',
                position: 'relative'
              }}>
                <div style={{whiteSpace: 'pre-wrap'}}>{message.content}</div>
                <div style={{
                  fontSize: '11px',
                  opacity: 0.7,
                  marginTop: '5px',
                  textAlign: message.type === 'user' ? 'left' : 'right'
                }}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '15px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#6c757d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                🤖
              </div>
              <div style={{
                padding: '10px 15px',
                borderRadius: '18px',
                backgroundColor: '#e9ecef',
                color: '#333'
              }}>
                <div style={{display: 'flex', gap: '3px'}}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#6c757d',
                    animation: 'typing 1.4s infinite ease-in-out'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#6c757d',
                    animation: 'typing 1.4s infinite ease-in-out 0.2s'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#6c757d',
                    animation: 'typing 1.4s infinite ease-in-out 0.4s'
                  }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{display: 'flex', gap: '10px'}}>
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('typeYourMessage')}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: isRTL ? 'right' : 'left'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            style={{
              padding: '12px 20px',
              backgroundColor: '#0ea5a4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: inputMessage.trim() && !isTyping ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: 'bold',
              opacity: inputMessage.trim() && !isTyping ? 1 : 0.6
            }}
          >
            {t('send')}
          </button>
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="card" style={{marginBottom: '20px'}}>
        <h3>{t('aiCapabilities')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
          <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <h4 style={{margin: '0 0 10px 0', color: '#0ea5a4'}}>📊 {t('portfolioAnalysis')}</h4>
            <p style={{margin: 0, fontSize: '14px', color: '#6c757d'}}>
              {t('portfolioAnalysisDesc')}
            </p>
          </div>
          
          <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <h4 style={{margin: '0 0 10px 0', color: '#0ea5a4'}}>📈 {t('marketInsights')}</h4>
            <p style={{margin: 0, fontSize: '14px', color: '#6c757d'}}>
              {t('marketInsightsDesc')}
            </p>
          </div>
          
          <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <h4 style={{margin: '0 0 10px 0', color: '#0ea5a4'}}>🛡️ {t('riskAssessment')}</h4>
            <p style={{margin: 0, fontSize: '14px', color: '#6c757d'}}>
              {t('riskAssessmentDesc')}
            </p>
          </div>
          
          <div style={{padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <h4 style={{margin: '0 0 10px 0', color: '#0ea5a4'}}>💰 {t('taxOptimization')}</h4>
            <p style={{margin: 0, fontSize: '14px', color: '#6c757d'}}>
              {t('taxOptimizationDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* AI Info */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('aiInfo')}</h4>
        <p>{t('aiDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('aiNote1')}</li>
          <li>{t('aiNote2')}</li>
          <li>{t('aiNote3')}</li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
