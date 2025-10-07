import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function AdvancedSecurity() {
  const { t, isRTL } = useLanguage()
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: [],
    emailNotifications: true,
    smsNotifications: false,
    securityQuestions: [],
    passwordExpiry: 90,
    autoLogout: true
  })
  
  const [securityEvents, setSecurityEvents] = useState([])
  const [loginHistory, setLoginHistory] = useState([])
  const [securityScore, setSecurityScore] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generateSecurityEvents()
    generateLoginHistory()
    calculateSecurityScore()
  }, [])

  const generateSecurityEvents = () => {
    const mockEvents = [
      {
        id: 1,
        type: 'login',
        description: t('successfulLogin'),
        ip: '192.168.1.100',
        location: 'תל אביב, ישראל',
        timestamp: new Date().toISOString(),
        severity: 'info'
      },
      {
        id: 2,
        type: 'failed_login',
        description: t('failedLoginAttempt'),
        ip: '192.168.1.101',
        location: 'חיפה, ישראל',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        severity: 'warning'
      },
      {
        id: 3,
        type: 'password_change',
        description: t('passwordChanged'),
        ip: '192.168.1.100',
        location: 'תל אביב, ישראל',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        severity: 'info'
      },
      {
        id: 4,
        type: 'suspicious_activity',
        description: t('suspiciousActivityDetected'),
        ip: '192.168.1.102',
        location: 'ירושלים, ישראל',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        severity: 'error'
      }
    ]
    
    setSecurityEvents(mockEvents)
  }

  const generateLoginHistory = () => {
    const mockHistory = [
      {
        id: 1,
        timestamp: new Date().toISOString(),
        ip: '192.168.1.100',
        location: 'תל אביב, ישראל',
        device: 'Chrome on Windows',
        status: 'success'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        ip: '192.168.1.100',
        location: 'תל אביב, ישראל',
        device: 'Chrome on Windows',
        status: 'success'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        ip: '192.168.1.101',
        location: 'חיפה, ישראל',
        device: 'Safari on iPhone',
        status: 'success'
      },
      {
        id: 4,
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        ip: '192.168.1.102',
        location: 'ירושלים, ישראל',
        device: 'Firefox on Linux',
        status: 'failed'
      }
    ]
    
    setLoginHistory(mockHistory)
  }

  const calculateSecurityScore = () => {
    let score = 0
    const maxScore = 100
    
    // Two-factor authentication
    if (securitySettings.twoFactorAuth) score += 25
    
    // Biometric authentication
    if (securitySettings.biometricAuth) score += 20
    
    // Session timeout
    if (securitySettings.sessionTimeout <= 30) score += 15
    else if (securitySettings.sessionTimeout <= 60) score += 10
    
    // Max login attempts
    if (securitySettings.maxLoginAttempts <= 3) score += 15
    else if (securitySettings.maxLoginAttempts <= 5) score += 10
    
    // Password expiry
    if (securitySettings.passwordExpiry <= 30) score += 15
    else if (securitySettings.passwordExpiry <= 90) score += 10
    
    // Auto logout
    if (securitySettings.autoLogout) score += 10
    
    setSecurityScore(score)
  }

  const updateSecuritySetting = (key, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'info': return '#17a2b8'
      case 'warning': return '#ffc107'
      case 'error': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'info': return 'ℹ️'
      case 'warning': return '⚠️'
      case 'error': return '🚨'
      default: return '⚪'
    }
  }

  const getStatusColor = (status) => {
    return status === 'success' ? '#28a745' : '#dc3545'
  }

  const getStatusIcon = (status) => {
    return status === 'success' ? '✅' : '❌'
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const getSecurityLevel = (score) => {
    if (score >= 80) return { level: t('excellent'), color: '#28a745' }
    if (score >= 60) return { level: t('good'), color: '#ffc107' }
    if (score >= 40) return { level: t('fair'), color: '#fd7e14' }
    return { level: t('poor'), color: '#dc3545' }
  }

  const securityLevel = getSecurityLevel(securityScore)

  return (
    <section>
      <h2>{t('advancedSecurity')}</h2>

      {/* Security Overview */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px'}}>
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('securityScore')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: securityLevel.color}}>
            {securityScore}/100
          </p>
          <p style={{margin: '5px 0 0 0', fontSize: '14px', color: securityLevel.color}}>
            {securityLevel.level}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('twoFactorAuth')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: securitySettings.twoFactorAuth ? '#28a745' : '#dc3545'}}>
            {securitySettings.twoFactorAuth ? t('enabled') : t('disabled')}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('biometricAuth')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: securitySettings.biometricAuth ? '#28a745' : '#dc3545'}}>
            {securitySettings.biometricAuth ? t('enabled') : t('disabled')}
          </p>
        </div>
        
        <div className="card">
          <h3 style={{margin: '0 0 10px 0', color: '#495057'}}>{t('activeSessions')}</h3>
          <p style={{margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0ea5a4'}}>
            {loginHistory.filter(session => session.status === 'success').length}
          </p>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('securitySettings')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
          <div>
            <label style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <input 
                type="checkbox" 
                checked={securitySettings.twoFactorAuth}
                onChange={e => updateSecuritySetting('twoFactorAuth', e.target.checked)}
              />
              <span style={{fontWeight: 'bold'}}>{t('twoFactorAuth')}</span>
            </label>
            <p style={{margin: '5px 0', fontSize: '12px', color: '#6c757d'}}>
              {t('twoFactorAuthDesc')}
            </p>
          </div>
          
          <div>
            <label style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <input 
                type="checkbox" 
                checked={securitySettings.biometricAuth}
                onChange={e => updateSecuritySetting('biometricAuth', e.target.checked)}
              />
              <span style={{fontWeight: 'bold'}}>{t('biometricAuth')}</span>
            </label>
            <p style={{margin: '5px 0', fontSize: '12px', color: '#6c757d'}}>
              {t('biometricAuthDesc')}
            </p>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('sessionTimeout')} (דקות)
            </label>
            <input 
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={e => updateSecuritySetting('sessionTimeout', parseInt(e.target.value))}
              min="5"
              max="480"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('maxLoginAttempts')}
            </label>
            <input 
              type="number"
              value={securitySettings.maxLoginAttempts}
              onChange={e => updateSecuritySetting('maxLoginAttempts', parseInt(e.target.value))}
              min="3"
              max="10"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('passwordExpiry')} (ימים)
            </label>
            <input 
              type="number"
              value={securitySettings.passwordExpiry}
              onChange={e => updateSecuritySetting('passwordExpiry', parseInt(e.target.value))}
              min="30"
              max="365"
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
            />
          </div>
          
          <div>
            <label style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <input 
                type="checkbox" 
                checked={securitySettings.autoLogout}
                onChange={e => updateSecuritySetting('autoLogout', e.target.checked)}
              />
              <span style={{fontWeight: 'bold'}}>{t('autoLogout')}</span>
            </label>
            <p style={{margin: '5px 0', fontSize: '12px', color: '#6c757d'}}>
              {t('autoLogoutDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Security Events */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('securityEvents')}</h3>
        <div style={{display: 'grid', gap: '15px'}}>
          {securityEvents.map(event => (
            <div key={event.id} style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{fontSize: '20px'}}>
                {getSeverityIcon(event.severity)}
              </div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 'bold', marginBottom: '5px'}}>
                  {event.description}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>
                  {event.ip} • {event.location} • {formatTime(event.timestamp)}
                </div>
              </div>
              <div style={{
                padding: '4px 8px',
                backgroundColor: getSeverityColor(event.severity),
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {t(event.severity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('loginHistory')}</h3>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('timestamp')}</th>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('ip')}</th>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('location')}</th>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('device')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map(session => (
                <tr key={session.id}>
                  <td style={{textAlign: isRTL ? 'right' : 'left'}}>
                    {formatTime(session.timestamp)}
                  </td>
                  <td style={{textAlign: isRTL ? 'right' : 'left'}}>
                    {session.ip}
                  </td>
                  <td style={{textAlign: isRTL ? 'right' : 'left'}}>
                    {session.location}
                  </td>
                  <td style={{textAlign: isRTL ? 'right' : 'left'}}>
                    {session.device}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    <span style={{color: getStatusColor(session.status)}}>
                      {getStatusIcon(session.status)} {t(session.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('securityRecommendations')}</h3>
        <div style={{display: 'grid', gap: '15px'}}>
          {!securitySettings.twoFactorAuth && (
            <div style={{
              padding: '15px',
              backgroundColor: '#fff3cd',
              borderRadius: '8px',
              border: '1px solid #ffeaa7',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{fontSize: '20px'}}>🔐</span>
              <div>
                <div style={{fontWeight: 'bold'}}>{t('enableTwoFactorAuth')}</div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>
                  {t('enableTwoFactorAuthDesc')}
                </div>
              </div>
            </div>
          )}
          
          {securitySettings.passwordExpiry > 90 && (
            <div style={{
              padding: '15px',
              backgroundColor: '#fff3cd',
              borderRadius: '8px',
              border: '1px solid #ffeaa7',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{fontSize: '20px'}}>🔑</span>
              <div>
                <div style={{fontWeight: 'bold'}}>{t('shortenPasswordExpiry')}</div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>
                  {t('shortenPasswordExpiryDesc')}
                </div>
              </div>
            </div>
          )}
          
          {securitySettings.sessionTimeout > 60 && (
            <div style={{
              padding: '15px',
              backgroundColor: '#fff3cd',
              borderRadius: '8px',
              border: '1px solid #ffeaa7',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{fontSize: '20px'}}>⏰</span>
              <div>
                <div style={{fontWeight: 'bold'}}>{t('shortenSessionTimeout')}</div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>
                  {t('shortenSessionTimeoutDesc')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Info */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('securityInfo')}</h4>
        <p>{t('securityDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('securityNote1')}</li>
          <li>{t('securityNote2')}</li>
          <li>{t('securityNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
