'use client'

import { useEffect, useState } from 'react'
import { Mail, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function ContactsPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setSubmissions(data.submissions || [])
          setUnreadCount(data.submissions?.filter((s: any) => !s.read).length || 0)
        }
      })
      .catch(err => {
        console.error('Error fetching submissions:', err)
        setError('Failed to load submissions. Please refresh the page.')
      })
      .finally(() => setLoading(false))
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-white">Loading submissions...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Form Submissions</h1>
        <p className="text-balance-200">
          {error ? 'Unable to load submissions' : `${submissions.length} total submission${submissions.length !== 1 ? 's' : ''}${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="col-span-full text-center py-16 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30 mb-4">
          <div className="text-red-400 mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Submissions</h3>
          <p className="text-balance-200 mb-4">{error}</p>
          <p className="text-sm text-balance-300">Try restarting your development server</p>
        </div>
      )}

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!error && submissions.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-[#0A031B]/60 backdrop-blur-sm rounded-xl border border-balance-200/20">
            <Mail className="mx-auto h-16 w-16 text-balance-300/50 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No submissions yet</h3>
            <p className="text-balance-200">
              Contact form submissions will appear here.
            </p>
          </div>
        ) : !error ? (
          submissions.map((submission) => {
            const isExpanded = expandedIds.has(submission.id)
            const isLongMessage = submission.message.length > 200
            
            return (
              <Card
                key={submission.id}
                className={`bg-[#0A031B]/60 backdrop-blur-sm border transition-all ${
                  submission.read 
                    ? 'border-balance-200/20' 
                    : 'border-balance-300/50 ring-2 ring-balance-300/20'
                } ${isExpanded ? 'hover:shadow-lg hover:shadow-balance-300/10' : 'hover:shadow-lg hover:shadow-balance-300/10 hover:scale-[1.02]'}`}
              >
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate mb-1">
                        {submission.name}
                      </h3>
                      <a
                        href={`mailto:${submission.email}`}
                        className="text-sm text-balance-300 hover:text-balance-200 hover:underline inline-flex items-center gap-1 group"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="truncate">{submission.email}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                    {!submission.read && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-balance-300 text-white flex-shrink-0 ml-2">
                        New
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className={`${isExpanded ? '' : 'min-h-[80px]'}`}>
                    <p className={`text-balance-100 text-sm whitespace-pre-wrap transition-all ${
                      isExpanded ? '' : 'line-clamp-4'
                    }`}>
                      {submission.message}
                    </p>
                  </div>

                  {/* Expand Button */}
                  {isLongMessage && (
                    <button
                      onClick={() => toggleExpand(submission.id)}
                      className="flex items-center gap-2 text-xs text-balance-300 hover:text-balance-200 transition-colors font-medium"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          Read more
                        </>
                      )}
                    </button>
                  )}

                  {/* Footer */}
                  <div className="flex items-center gap-2 text-xs text-balance-200 pt-2 border-t border-balance-200/10">
                    <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">
                      {new Date(submission.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            )
          })
        ) : null}
      </div>
    </div>
  )
}

