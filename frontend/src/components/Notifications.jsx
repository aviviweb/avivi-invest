import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Notifications() {
  const { t, isRTL } = useLanguage()
  const [notifications, setNotifications] = useState([])
  const [newNotification, setNewNotification] = useState('')

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('avivi-notifications')
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  // Save notifications to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('avivi-notifications', JSON.stringify(notifications))
  }, [notifications])

  const addNotification = () => {
    if (!newNotification.trim()) return

    const notification = {
      id: Date.now(),
      message: newNotification,
      timestamp: new Date().toLocaleString(),
      type: 'info',
      read: false
    }

    setNotifications(prev => [notification, ...prev])
    setNewNotification('')
  }

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      case 'info': return 'ℹ️'
      default: return '📢'
    }
  }

  return (
    <section>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>{t('notifications')}</h2>
        {unreadCount > 0 && (
          <span style={{
            backgroundColor: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {unreadCount}
          </span>
        )}
      </div>

      {/* Add Notification Form */}
      <div style={{marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
        <h3>{t('addNotification')}</h3>
        <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          <input 
            value={newNotification}
            onChange={e => setNewNotification(e.target.value)}
            placeholder={t('notificationPlaceholder')}
            style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', textAlign: isRTL ? 'right' : 'left'}}
          />
          <button 
            onClick={addNotification}
            style={{padding: '8px 16px', backgroundColor: '#0ea5a4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            {t('add')}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
          <h3>{t('allNotifications')} ({notifications.length})</h3>
          {notifications.length > 0 && (
            <button 
              onClick={clearAll}
              style={{padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'}}
            >
              {t('clearAll')}
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div style={{padding: '40px', textAlign: 'center', color: '#6c757d'}}>
            <div style={{fontSize: '48px', marginBottom: '10px'}}>📭</div>
            <p>{t('noNotifications')}</p>
          </div>
        ) : (
          <div style={{maxHeight: '400px', overflowY: 'auto'}}>
            {notifications.map(notification => (
              <div 
                key={notification.id}
                style={{
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: notification.read ? '#f8f9fa' : '#e7f3ff',
                  border: `1px solid ${notification.read ? '#dee2e6' : '#b3d9ff'}`,
                  borderRadius: '8px',
                  borderLeft: isRTL ? 'none' : `4px solid ${notification.read ? '#6c757d' : '#0ea5a4'}`,
                  borderRight: isRTL ? `4px solid ${notification.read ? '#6c757d' : '#0ea5a4'}` : 'none',
                  opacity: notification.read ? 0.7 : 1
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px'}}>
                      <span style={{fontSize: '16px'}}>{getNotificationIcon(notification.type)}</span>
                      <span style={{fontWeight: notification.read ? 'normal' : 'bold'}}>
                        {notification.message}
                      </span>
                    </div>
                    <div style={{fontSize: '12px', color: '#6c757d'}}>
                      {notification.timestamp}
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: '5px', marginLeft: '10px'}}>
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        style={{padding: '4px 8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'}}
                      >
                        {t('markRead')}
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      style={{padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'}}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Types Demo */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
        <h3>{t('notificationTypes')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px'}}>
          <button 
            onClick={() => {
              const notification = {
                id: Date.now(),
                message: t('successMessage'),
                timestamp: new Date().toLocaleString(),
                type: 'success',
                read: false
              }
              setNotifications(prev => [notification, ...prev])
            }}
            style={{padding: '10px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px', cursor: 'pointer'}}
          >
            ✅ {t('success')}
          </button>
          <button 
            onClick={() => {
              const notification = {
                id: Date.now(),
                message: t('warningMessage'),
                timestamp: new Date().toLocaleString(),
                type: 'warning',
                read: false
              }
              setNotifications(prev => [notification, ...prev])
            }}
            style={{padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px', cursor: 'pointer'}}
          >
            ⚠️ {t('warning')}
          </button>
          <button 
            onClick={() => {
              const notification = {
                id: Date.now(),
                message: t('errorMessage'),
                timestamp: new Date().toLocaleString(),
                type: 'error',
                read: false
              }
              setNotifications(prev => [notification, ...prev])
            }}
            style={{padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', cursor: 'pointer'}}
          >
            ❌ {t('error')}
          </button>
          <button 
            onClick={() => {
              const notification = {
                id: Date.now(),
                message: t('infoMessage'),
                timestamp: new Date().toLocaleString(),
                type: 'info',
                read: false
              }
              setNotifications(prev => [notification, ...prev])
            }}
            style={{padding: '10px', backgroundColor: '#e7f3ff', border: '1px solid #b3d9ff', borderRadius: '4px', cursor: 'pointer'}}
          >
            ℹ️ {t('info')}
          </button>
        </div>
      </div>
    </section>
  )
}
