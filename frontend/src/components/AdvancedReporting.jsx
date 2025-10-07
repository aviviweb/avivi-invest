import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function AdvancedReporting() {
  const { t, isRTL } = useLanguage()
  const [reportSettings, setReportSettings] = useState({
    reportType: 'performance',
    timeRange: '1Y',
    includeCharts: true,
    includeDetails: true,
    format: 'pdf',
    email: '',
    schedule: 'none'
  })
  
  const [reports, setReports] = useState([])
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    generateSampleReports()
    generateReportData()
  }, [])

  const generateSampleReports = () => {
    const sampleReports = [
      {
        id: 1,
        name: t('monthlyPerformanceReport'),
        type: 'performance',
        date: new Date().toISOString(),
        status: 'completed',
        size: '2.3 MB',
        pages: 15
      },
      {
        id: 2,
        name: t('riskAnalysisReport'),
        type: 'risk',
        date: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed',
        size: '1.8 MB',
        pages: 12
      },
      {
        id: 3,
        name: t('taxReport'),
        type: 'tax',
        date: new Date(Date.now() - 172800000).toISOString(),
        status: 'completed',
        size: '3.1 MB',
        pages: 25
      },
      {
        id: 4,
        name: t('complianceReport'),
        type: 'compliance',
        date: new Date(Date.now() - 259200000).toISOString(),
        status: 'generating',
        size: '0 MB',
        pages: 0
      }
    ]
    
    setReports(sampleReports)
  }

  const generateReportData = () => {
    const mockData = {
      performance: {
        totalReturn: 15.7,
        annualizedReturn: 12.3,
        volatility: 18.5,
        sharpeRatio: 0.85,
        maxDrawdown: 8.2,
        winRate: 68.5,
        profitFactor: 1.8,
        trades: 156,
        avgTrade: 2.3,
        bestTrade: 12.5,
        worstTrade: -5.8
      },
      risk: {
        var95: 2.8,
        var99: 4.1,
        expectedShortfall: 3.5,
        beta: 1.2,
        correlation: 0.65,
        concentration: 0.22,
        leverage: 1.1,
        margin: 0.85
      },
      tax: {
        realizedGains: 12500,
        realizedLosses: 3200,
        netGains: 9300,
        taxOwed: 2325,
        washSales: 450,
        carryForward: 1200
      },
      compliance: {
        tradesExecuted: 156,
        ordersRejected: 3,
        complianceScore: 98.5,
        violations: 0,
        alerts: 2,
        lastAudit: new Date().toISOString()
      }
    }
    
    setReportData(mockData)
  }

  const generateReport = async () => {
    setGenerating(true)
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const newReport = {
        id: reports.length + 1,
        name: `${t('report')} ${new Date().toLocaleDateString()}`,
        type: reportSettings.reportType,
        date: new Date().toISOString(),
        status: 'completed',
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        pages: Math.floor(Math.random() * 30 + 10)
      }
      
      setReports(prev => [newReport, ...prev])
      
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setGenerating(false)
    }
  }

  const updateReportSetting = (key, value) => {
    setReportSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getReportIcon = (type) => {
    switch (type) {
      case 'performance': return '📊'
      case 'risk': return '🛡️'
      case 'tax': return '💰'
      case 'compliance': return '📋'
      default: return '📄'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745'
      case 'generating': return '#ffc107'
      case 'failed': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <section>
      <h2>{t('advancedReporting')}</h2>

      {/* Report Generation */}
      <div className="card" style={{marginBottom: '30px'}}>
        <h3>{t('generateReport')}</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('reportType')}
            </label>
            <select 
              value={reportSettings.reportType}
              onChange={e => updateReportSetting('reportType', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="performance">{t('performanceReport')}</option>
              <option value="risk">{t('riskReport')}</option>
              <option value="tax">{t('taxReport')}</option>
              <option value="compliance">{t('complianceReport')}</option>
              <option value="custom">{t('customReport')}</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('timeRange')}
            </label>
            <select 
              value={reportSettings.timeRange}
              onChange={e => updateReportSetting('timeRange', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="1M">{t('1Month')}</option>
              <option value="3M">{t('3Months')}</option>
              <option value="6M">{t('6Months')}</option>
              <option value="1Y">{t('1Year')}</option>
              <option value="2Y">{t('2Years')}</option>
              <option value="5Y">{t('5Years')}</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('format')}
            </label>
            <select 
              value={reportSettings.format}
              onChange={e => updateReportSetting('format', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="html">HTML</option>
            </select>
          </div>
          
          <div>
            <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
              {t('schedule')}
            </label>
            <select 
              value={reportSettings.schedule}
              onChange={e => updateReportSetting('schedule', e.target.value)}
              style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
            >
              <option value="none">{t('none')}</option>
              <option value="daily">{t('daily')}</option>
              <option value="weekly">{t('weekly')}</option>
              <option value="monthly">{t('monthly')}</option>
            </select>
          </div>
        </div>
        
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <input 
              type="checkbox" 
              checked={reportSettings.includeCharts}
              onChange={e => updateReportSetting('includeCharts', e.target.checked)}
            />
            {t('includeCharts')}
          </label>
          
          <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <input 
              type="checkbox" 
              checked={reportSettings.includeDetails}
              onChange={e => updateReportSetting('includeDetails', e.target.checked)}
            />
            {t('includeDetails')}
          </label>
        </div>
        
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <button 
            onClick={generateReport}
            disabled={generating}
            style={{
              padding: '12px 24px',
              backgroundColor: '#0ea5a4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: generating ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {generating ? t('generating') : t('generateReport')}
          </button>
        </div>
      </div>

      {/* Report Data Preview */}
      {reportData && (
        <div className="card" style={{marginBottom: '30px'}}>
          <h3>{t('reportPreview')}</h3>
          
          {/* Performance Metrics */}
          <div style={{marginBottom: '20px'}}>
            <h4>{t('performanceMetrics')}</h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px'}}>
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#28a745'}}>
                  {formatPercentage(reportData.performance.totalReturn)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('totalReturn')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#0ea5a4'}}>
                  {formatPercentage(reportData.performance.annualizedReturn)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('annualizedReturn')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#dc3545'}}>
                  {formatPercentage(reportData.performance.volatility)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('volatility')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#ffc107'}}>
                  {reportData.performance.sharpeRatio.toFixed(2)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('sharpeRatio')}</div>
              </div>
            </div>
          </div>

          {/* Risk Metrics */}
          <div style={{marginBottom: '20px'}}>
            <h4>{t('riskMetrics')}</h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px'}}>
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#dc3545'}}>
                  {formatPercentage(reportData.risk.var95)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>VaR 95%</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#dc3545'}}>
                  {formatPercentage(reportData.risk.var99)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>VaR 99%</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#ffc107'}}>
                  {reportData.risk.beta.toFixed(2)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('beta')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#6c757d'}}>
                  {formatPercentage(reportData.risk.concentration * 100)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('concentrationRisk')}</div>
              </div>
            </div>
          </div>

          {/* Tax Information */}
          <div style={{marginBottom: '20px'}}>
            <h4>{t('taxInformation')}</h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px'}}>
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#28a745'}}>
                  {formatCurrency(reportData.tax.realizedGains)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('realizedGains')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#dc3545'}}>
                  {formatCurrency(reportData.tax.realizedLosses)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('realizedLosses')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#0ea5a4'}}>
                  {formatCurrency(reportData.tax.netGains)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('netGains')}</div>
              </div>
              
              <div style={{textAlign: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#ffc107'}}>
                  {formatCurrency(reportData.tax.taxOwed)}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d'}}>{t('taxOwed')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports List */}
      <div className="card">
        <h3>{t('reportsHistory')}</h3>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th style={{textAlign: isRTL ? 'right' : 'left'}}>{t('name')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('type')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('date')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('status')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('size')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('pages')}</th>
                <th style={{textAlign: isRTL ? 'left' : 'right'}}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id}>
                  <td style={{fontWeight: 'bold'}}>
                    <span style={{marginRight: '8px'}}>{getReportIcon(report.type)}</span>
                    {report.name}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    {t(report.type + 'Report')}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    <span style={{
                      color: getStatusColor(report.status),
                      fontWeight: 'bold'
                    }}>
                      {t(report.status)}
                    </span>
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    {report.size}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    {report.pages}
                  </td>
                  <td style={{textAlign: isRTL ? 'left' : 'right'}}>
                    <button 
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#0ea5a4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      {t('download')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reporting Info */}
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px', border: '1px solid #b3d9ff'}}>
        <h4>{t('reportingInfo')}</h4>
        <p>{t('reportingDescription')}</p>
        <ul style={{margin: '10px 0', paddingLeft: isRTL ? '0' : '20px', paddingRight: isRTL ? '20px' : '0'}}>
          <li>{t('reportingNote1')}</li>
          <li>{t('reportingNote2')}</li>
          <li>{t('reportingNote3')}</li>
        </ul>
      </div>
    </section>
  )
}
