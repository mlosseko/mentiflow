import { useState } from 'react'
import SlideContent from './components/slides/SlideContent'
import AddModal from './components/AddModal'
import WordCloud from './components/WordCloud'
import { INITIAL_SLIDES, TYPE_LABEL, BADGE_CLASS } from './data'
import styles from './App.module.css'

export default function App() {
  const [slides, setSlides] = useState(INITIAL_SLIDES)
  const [activeId, setActiveId] = useState(1)
  const [tab, setTab] = useState('editor')
  const [presenting, setPresenting] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  const active = slides.find(s => s.id === activeId)
  const update = (updated) => setSlides(prev => prev.map(s => s.id === updated.id ? updated : s))
  const del = (id) => {
    setSlides(prev => prev.filter(s => s.id !== id))
    if (activeId === id && slides.length > 1) setActiveId(slides.find(s => s.id !== id)?.id)
  }
  const add = (slide) => { setSlides(prev => [...prev, slide]); setActiveId(slide.id) }
  const totalAnswers = slides.reduce((acc, s) =>
    acc + (s.votes?.reduce((a, b) => a + b, 0) || s.questions?.length || s.words?.length || 0), 0)

  return (
    <div className={styles.wrap}>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>menti<span>flow</span></div>
        <div className={styles.headerRight}>
          <span className={styles.dot} />
          <span className={styles.participants}>27 live</span>
          <button className="btn-primary btn-sm" onClick={() => setPresenting(true)}>▶ Live</button>
        </div>
      </header>

      {/* Tabs */}
      <nav className={styles.tabs}>
        {[
          { id: 'editor', icon: '✏️', label: 'Editor' },
          { id: 'audience', icon: '👥', label: 'Publikum' },
          { id: 'results', icon: '📈', label: 'Ergebnisse' },
        ].map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className={styles.tabIcon}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Page */}
      <main className={styles.page}>

        {/* EDITOR */}
        {tab === 'editor' && (
          <>
            <div className={styles.statRow}>
              <div className={styles.statCard}>
                <div className={styles.statNum} style={{ color: 'var(--a1)' }}>27</div>
                <div className={styles.statLabel}>Live</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum} style={{ color: 'var(--a4)' }}>{slides.length}</div>
                <div className={styles.statLabel}>Folien</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNum} style={{ color: 'var(--a3)' }}>{totalAnswers}</div>
                <div className={styles.statLabel}>Antworten</div>
              </div>
            </div>

            <div className={styles.slidesHeader}>
              <span className={styles.slidesTitle}>Folien</span>
              <button className="btn-primary btn-sm" onClick={() => setShowAdd(true)}>+ Neue Folie</button>
            </div>

            <div className={styles.slideGrid}>
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  className={`${styles.slideThumb} ${s.id === activeId ? styles.slideThumbActive : ''}`}
                  onClick={() => setActiveId(s.id)}
                >
                  <div>
                    <span className={`badge ${BADGE_CLASS[s.type]}`}>{TYPE_LABEL[s.type]}</span>
                    <div className={styles.slideQuestion}>{s.question}</div>
                  </div>
                  <div className={styles.slideFooter}>
                    <span className={styles.slideNum}>#{i + 1}</span>
                    <button
                      className="btn-danger btn-sm"
                      onClick={e => { e.stopPropagation(); del(s.id) }}
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>

            {active && (
              <div className={styles.previewCard}>
                <div className={styles.previewTitle}>{active.question}</div>
                <div className={styles.previewType}>{TYPE_LABEL[active.type]}</div>
                <SlideContent slide={active} onUpdate={update} />
              </div>
            )}
          </>
        )}

        {/* PUBLIKUM */}
        {tab === 'audience' && active && (
          <div>
            <div className={styles.audienceCard}>
              <div className={styles.audienceHeader}>
                <div className={styles.joinCode}>
                  Code: <span className={styles.joinCodeValue}>MENTI-42</span>
                </div>
                <h2 className={styles.audienceQuestion}>{active.question}</h2>
              </div>
              <SlideContent slide={active} onUpdate={update} />
            </div>
            <div className={styles.slideNav}>
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  className={`btn-sm ${s.id === activeId ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveId(s.id)}
                >#{i + 1}</button>
              ))}
            </div>
          </div>
        )}

        {/* ERGEBNISSE */}
        {tab === 'results' && slides.map((s, i) => {
          const total = s.votes?.reduce((a, b) => a + b, 0) || 0
          return (
            <div key={s.id} className={styles.resultCard}>
              <div className={styles.resultTitle}>#{i + 1} — {s.question}</div>
              <div className={styles.resultType}>{TYPE_LABEL[s.type]}</div>

              {s.type === 'poll' && s.options.map((opt, j) => {
                const pct = total ? Math.round((s.votes[j] / total) * 100) : 0
                return (
                  <div key={j} className={styles.rBar}>
                    <div className={styles.rBarLabel}>
                      <span>{opt}</span><span style={{ color: 'var(--a1)', fontFamily: "'DM Mono',monospace" }}>{pct}%</span>
                    </div>
                    <div className={styles.rBarTrack}><div className={styles.rBarFill} style={{ width: pct + '%' }} /></div>
                  </div>
                )
              })}

              {s.type === 'word' && <WordCloud words={s.words} />}

              {s.type === 'scale' && (() => {
                const t = s.votes.reduce((a, b) => a + b, 0)
                const avg = t ? (s.votes.reduce((sm, v, k) => sm + v * (k + 1), 0) / t).toFixed(1) : '—'
                const mx = Math.max(...s.votes, 1)
                return (
                  <div>
                    <div className={styles.rAvg}><span className={styles.rAvgNum}>{avg}</span><span className={styles.rAvgLabel}>Ø Wert</span></div>
                    {s.votes.map((v, k) => (
                      <div key={k} className={styles.rScaleRow}>
                        <span className={styles.rScaleN}>{k + 1}</span>
                        <div className={styles.rScaleTrack}><div className={styles.rScaleFill} style={{ width: (v / mx * 100) + '%' }} /></div>
                        <span className={styles.rScaleV}>{v}</span>
                      </div>
                    ))}
                  </div>
                )
              })()}

              {s.type === 'qa' && (
                <div className={styles.rQaList}>
                  {[...s.questions].sort((a, b) => b.votes - a.votes).map(q => (
                    <div key={q.id} className={`${styles.rQaItem} ${q.answered ? styles.rQaAnswered : ''}`}>
                      <div className={styles.rQaVotes}>
                        <span>▲</span><span>{q.votes}</span>
                      </div>
                      <div className={styles.rQaText}>
                        {q.text}
                        {q.answered && <span className={styles.rQaCheck}> ✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </main>

      {/* Presenter */}
      {presenting && active && (
        <div className={styles.presenter}>
          <button className="btn-secondary btn-sm" style={{ position: 'fixed', top: 14, right: 14, zIndex: 101 }} onClick={() => setPresenting(false)}>✕ Schließen</button>
          <div className={styles.presenterType}>{TYPE_LABEL[active.type]}</div>
          <div className={styles.presenterQuestion}>{active.question}</div>
          <div className={styles.presenterContent}><SlideContent slide={active} onUpdate={update} /></div>
          <div className={styles.presenterNav}>
            {slides.map((s, i) => (
              <button key={s.id} className={`btn-sm ${s.id === activeId ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveId(s.id)}>#{i + 1}</button>
            ))}
          </div>
          <div className={styles.joinBadge}>
            <div><div className={styles.joinBadgeLabel}>mentiflow.de</div></div>
            <div className={styles.joinBadgeDivider} />
            <div><div className={styles.joinBadgeLabel}>Code</div><div className={styles.joinBadgeCode}>MENTI-42</div></div>
          </div>
        </div>
      )}

      {showAdd && <AddModal onClose={() => setShowAdd(false)} onAdd={add} />}
    </div>
  )
}
