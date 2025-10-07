import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Settings(){
  const { t, language, toggleLanguage } = useLanguage()

  return (
    <section>
      <h2>{t('settings')}</h2>
      
      <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
        <h3>{t('language')}</h3>
        <div className="language-switcher" style={{position: 'static', margin: '10px 0'}}>
          <button 
            className={language === 'he' ? 'active' : ''}
            onClick={() => language !== 'he' && toggleLanguage()}
            style={{
              background: language === 'he' ? '#0ea5a4' : 'transparent',
              color: language === 'he' ? 'white' : '#333',
              border: '1px solid #ddd',
              padding: '8px 16px',
              margin: '0 5px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {t('hebrew')}
          </button>
          <button 
            className={language === 'en' ? 'active' : ''}
            onClick={() => language !== 'en' && toggleLanguage()}
            style={{
              background: language === 'en' ? '#0ea5a4' : 'transparent',
              color: language === 'en' ? 'white' : '#333',
              border: '1px solid #ddd',
              padding: '8px 16px',
              margin: '0 5px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {t('english')}
          </button>
        </div>
      </div>

      <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h3>מצב נייר / Paper Mode</h3>
        <p>{t('paperModeEnabled')}</p>
        <div style={{marginTop: '10px', padding: '10px', backgroundColor: '#d4edda', borderRadius: '4px', border: '1px solid #c3e6cb'}}>
          <strong>✅ בטוח לשימוש:</strong> כל ההזמנות מדומות ואין סיכון לכסף אמיתי
        </div>
      </div>

      <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
        <h3>מידע על המערכת</h3>
        <ul style={{margin: '10px 0', paddingLeft: '20px'}}>
          <li><strong>גרסה:</strong> 1.0.0</li>
          <li><strong>מצב:</strong> פיתוח / Demo</li>
          <li><strong>API:</strong> Alpaca Markets</li>
          <li><strong>מסד נתונים:</strong> PostgreSQL</li>
          <li><strong>Cache:</strong> Redis</li>
        </ul>
      </div>

      <div style={{padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7'}}>
        <h3>⚠️ אזהרה חשובה</h3>
        <p>זוהי מערכת דמו למטרות למידה ופיתוח בלבד. לפני שימוש במסחר אמיתי:</p>
        <ul style={{margin: '10px 0', paddingLeft: '20px'}}>
          <li>בדוק את הקוד בקפידה</li>
          <li>בצע בדיקות מקיפות</li>
          <li>התחל עם סכומים קטנים</li>
          <li>הבן את הסיכונים</li>
        </ul>
      </div>
    </section>
  )
}
