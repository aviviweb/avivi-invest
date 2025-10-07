import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function SocialTrading() {
  const { t, isRTL } = useLanguage()
  const [traders, setTraders] = useState([])
  const [followedTraders, setFollowedTraders] = useState([])
  const [socialFeed, setSocialFeed] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generateTraders()
    generateSocialFeed()
    generateLeaderboard()
  }, [])

  const generateTraders = () => {
    const mockTraders = [
      {
        id: 1,
        name: 'אלכס גולדמן',
        username: '@alex_goldman',
        avatar: '👨‍💼',
        followers: 1250,
        following: 89,
        totalReturn: 24.5,
        winRate: 78.3,
        totalTrades: 156,
        riskLevel: 'medium',
        isFollowing: false,
        verified: true
      },
      {
        id: 2,
        name: 'שרה כהן',
        username: '@sarah_cohen',
        avatar: '👩‍💼',
        followers: 890,
        following: 45,
        totalReturn: 18.7,
        winRate: 72.1,
        totalTrades: 98,
        riskLevel: 'low',
        isFollowing: true,
        verified: true
      },
      {
        id: 3,
        name: 'מיכאל לוי',
        username: '@michael_levi',
        avatar: '👨‍💻',
        followers: 2100,
        following: 156,
        totalReturn: 31.2,
        winRate: 82.4,
        totalTrades: 203,
        riskLevel: 'high',
        isFollowing: false,
        verified: true
      },
      {
        id: 4,
        name: 'רחל אברהם',
        username: '@rachel_abraham',
        avatar: '👩‍💻',
        followers: 650,
        following: 23,
        totalReturn: 15.3,
        winRate: 68.9,
        totalTrades: 67,
        riskLevel: 'medium',
        isFollowing: true,
        verified: false
      }
    ]
    
    setTraders(mockTraders)
  }

  const generateSocialFeed = () => {
    const mockFeed = [
      {
        id: 1,
        trader: 'אלכס גולדמן',
        username: '@alex_goldman',
        avatar: '👨‍💼',
        action: 'opened_position',
        symbol: 'AAPL',
        side: 'buy',
        quantity: 100,
        price: 175.50,
        timestamp: new Date().toISOString(),
        likes: 23,
        comments: 5,
        isLiked: false
      },
      {
        id: 2,
        trader: 'שרה כהן',
        username: '@sarah_cohen',
        avatar: '👩‍💼',
        action: 'shared_analysis',
        content: 'ניתוח טכני של TSLA מראה סימנים חיוביים. אני מצפה לעלייה של 15% בחודש הקרוב.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 45,
        comments: 12,
        isLiked: true
      },
      {
        id: 3,
        trader: 'מיכאל לוי',
        username: '@michael_levi',
        avatar: '👨‍💻',
        action: 'closed_position',
        symbol: 'GOOGL',
        side: 'sell',
        quantity: 50,
        price: 142.30,
        profit: 1250,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        likes: 67,
        comments: 8,
        isLiked: false
      }
    ]
    
    setSocialFeed(mockFeed)
  }

  const generateLeaderboard = () => {
    const mockLeaderboard = [
      { rank: 1, name: 'מיכאל לוי', return: 31.2, trades: 203, followers: 2100 },
      { rank: 2, name: 'אלכס גולדמן', return: 24.5, trades: 156, followers: 1250 },
      { rank: 3, name: 'שרה כהן', return: 18.7, trades: 98, followers: 890 },
      { rank: 4, name: 'רחל אברהם', return: 15.3, trades: 67, followers: 650 },
      { rank: 5, name: 'דוד ישראלי', return: 12.8, trades: 45, followers: 420 }
    ]
    
    setLeaderboard(mockLeaderboard)
  }

  const toggleFollow = (traderId) => {
    setTraders(prev => prev.map(trader => 
      trader.id === traderId 
        ? { ...trader, isFollowing: !trader.isFollowing }
        : trader
    ))
  }

  const toggleLike = (postId) => {
    setSocialFeed(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return '#28a745'
      case 'medium': return '#ffc107'
      case 'high': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return t('justNow')
    if (diffInHours < 24) return `${diffInHours}h`
    return `${Math.floor(diffInHours / 24)}d`
  }

  return (
    <section>
      <h2>{t('socialTrading')}</h2>

      {/* Leaderboard */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('leaderboard')}</h3>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('rank')}</th>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('trader')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('return')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('trades')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('followers')}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map(trader => (
                <tr key={trader.rank}>
                  <td style={{textAlign: isRTL ? 'right' : 'left', fontWeight: 'bold'}}>
                    {getRankIcon(trader.rank)}
                  </td>
                  <td style={{textAlign: isRTL ? 'right' : 'left', fontWeight: 'bold'}}>
                    {trader.name}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right', color: '#28a745'}}>
                    {formatPercentage(trader.return)}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    {trader.trades}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    {trader.followers.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Traders */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('topTraders')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
          {traders.map(trader => (
            <div key={trader.id} style={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              backgroundColor: '#fafafa',
              position: 'relative'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#0ea5a4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {trader.avatar}
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <h4 style={{margin: 0, fontSize: '16px'}}>{trader.name}</h4>
                    {trader.verified && <span style={{color: '#0ea5a4'}}>✓</span>}
                  </div>
                  <p style={{margin: '5px 0', color: '#6c757d', fontSize: '14px'}}>
                    {trader.username}
                  </p>
                </div>
                <button
                  onClick={() => toggleFollow(trader.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: trader.isFollowing ? '#dc3545' : '#0ea5a4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  {trader.isFollowing ? t('unfollow') : t('follow')}
                </button>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '15px'}}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '18px', fontWeight: 'bold', color: '#28a745'}}>
                    {formatPercentage(trader.totalReturn)}
                  </div>
                  <div style={{fontSize: '12px', color: '#6c757d'}}>{t('totalReturn')}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '18px', fontWeight: 'bold', color: '#0ea5a4'}}>
                    {formatPercentage(trader.winRate)}
                  </div>
                  <div style={{fontSize: '12px', color: '#6c757d'}}>{t('winRate')}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '18px', fontWeight: 'bold', color: '#6c757d'}}>
                    {trader.totalTrades}
                  </div>
                  <div style={{fontSize: '12px', color: '#6c757d'}}>{t('trades')}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: getRiskColor(trader.riskLevel)
                  }}>
                    {t(trader.riskLevel)}
                  </div>
                  <div style={{fontSize: '12px', color: '#6c757d'}}>{t('riskLevel')}</div>
                </div>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6c757d'}}>
                <span>{trader.followers.toLocaleString()} {t('followers')}</span>
                <span>{trader.following} {t('following')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Feed */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('socialFeed')}</h3>
        <div style={{display: 'grid', gap: '20px'}}>
          {socialFeed.map(post => (
            <div key={post.id} style={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              backgroundColor: '#fafafa'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#0ea5a4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {post.avatar}
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <h4 style={{margin: 0, fontSize: '14px'}}>{post.trader}</h4>
                    <span style={{color: '#6c757d', fontSize: '12px'}}>{post.username}</span>
                  </div>
                  <p style={{margin: '5px 0', color: '#6c757d', fontSize: '12px'}}>
                    {formatTime(post.timestamp)}
                  </p>
                </div>
              </div>
              
              {post.action === 'opened_position' && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#e7f3ff',
                  borderRadius: '8px',
                  border: '1px solid #b3d9ff'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{fontSize: '20px'}}>📈</span>
                    <span style={{fontWeight: 'bold'}}>{t('openedPosition')}</span>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px'}}>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('symbol')}</div>
                      <div style={{fontWeight: 'bold'}}>{post.symbol}</div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('side')}</div>
                      <div style={{fontWeight: 'bold', color: post.side === 'buy' ? '#28a745' : '#dc3545'}}>
                        {t(post.side)}
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('quantity')}</div>
                      <div style={{fontWeight: 'bold'}}>{post.quantity}</div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('price')}</div>
                      <div style={{fontWeight: 'bold'}}>{formatCurrency(post.price)}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {post.action === 'shared_analysis' && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{fontSize: '20px'}}>📊</span>
                    <span style={{fontWeight: 'bold'}}>{t('sharedAnalysis')}</span>
                  </div>
                  <p style={{margin: 0, lineHeight: '1.5'}}>{post.content}</p>
                </div>
              )}
              
              {post.action === 'closed_position' && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#d4edda',
                  borderRadius: '8px',
                  border: '1px solid #c3e6cb'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                    <span style={{fontSize: '20px'}}>💰</span>
                    <span style={{fontWeight: 'bold'}}>{t('closedPosition')}</span>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px'}}>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('symbol')}</div>
                      <div style={{fontWeight: 'bold'}}>{post.symbol}</div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('side')}</div>
                      <div style={{fontWeight: 'bold', color: post.side === 'buy' ? '#28a745' : '#dc3545'}}>
                        {t(post.side)}
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('quantity')}</div>
                      <div style={{fontWeight: 'bold'}}>{post.quantity}</div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('price')}</div>
                      <div style={{fontWeight: 'bold'}}>{formatCurrency(post.price)}</div>
                    </div>
                    <div>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{t('profit')}</div>
                      <div style={{fontWeight: 'bold', color: '#28a745'}}>
                        {formatCurrency(post.profit)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '1px solid #dee2e6'
              }}>
                <div style={{display: 'flex', gap: '20px'}}>
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 10px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: post.isLiked ? '#dc3545' : '#6c757d'
                    }}
                  >
                    <span>{post.isLiked ? '❤️' : '🤍'}</span>
                    <span>{post.likes}</span>
                  </button>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 10px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6c757d'
                  }}>
                    <span>💬</span>
                    <span>{post.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Trading Info */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('socialTradingInfo')}</h4>
        <p>{t('socialTradingDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('socialTradingNote1')}</li>
          <li>{t('socialTradingNote2')}</li>
          <li>{t('socialTradingNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
