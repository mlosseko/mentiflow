import { useState } from 'react'
import styles from './AddModal.module.css'

const TYPES = [
  { id: 'poll', icon: '📊', name: 'Abstimmung', desc: 'Multiple Choice' },
  { id: 'word', icon: '☁️', name: 'Wortwolke', desc: 'Freie Eingabe' },
  { id: 'scale', icon: '⭐', name: 'Skala', desc: '1–10 Bewertung' },
  { id: 'qa', icon: '❓', name: 'Q&A', desc: 'Fragen einreichen' },
]

export default function AddModal({ onClose, onAdd }) {
  const [type, setType] = useState('poll')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState('Option A\nOption B\nOption C')

  const submit = () => {
    if (!question.trim()) return
    const base = { id: Date.now(), type, question }

    if (type === 'poll') {
      const opts = options.split('\n').filter(o => o.trim())
      onAdd({ ...base, options: opts, votes: opts.map(() => 0), userVote: null })
    } else if (type === 'word') {
      onAdd({ ...base, words: [] })
    } else if (type === 'scale') {
      onAdd({ ...base, min: 1, max: 10, votes: Array(10).fill(0), userVote: null })
    } else if (type === 'qa') {
      onAdd({ ...base, questions: [] })
    }
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.handle} />
        <div className={styles.title}>Neue Folie</div>

        <div className={styles.typeGrid}>
          {TYPES.map(t => (
            <div
              key={t.id}
              className={`${styles.typeCard} ${type === t.id ? styles.typeCardActive : ''}`}
              onClick={() => setType(t.id)}
            >
              <div className={styles.typeIcon}>{t.icon}</div>
              <div className={styles.typeName}>{t.name}</div>
              <div className={styles.typeDesc}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Frage</label>
          <input
            className={styles.input}
            placeholder="Ihre Frage…"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </div>

        {type === 'poll' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Optionen (eine pro Zeile)</label>
            <textarea
              className={styles.input}
              style={{ resize: 'vertical', minHeight: 70 }}
              value={options}
              onChange={e => setOptions(e.target.value)}
            />
          </div>
        )}

        <div className={styles.actions}>
          <button className="btn-secondary" onClick={onClose}>Abbrechen</button>
          <button className="btn-primary" onClick={submit}>Erstellen</button>
        </div>
      </div>
    </div>
  )
}
