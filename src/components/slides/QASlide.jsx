import { useState } from 'react'
import styles from './Slide.module.css'

export default function QASlide({ slide, onUpdate }) {
  const [val, setVal] = useState('')

  const submit = () => {
    if (!val.trim()) return
    onUpdate({
      ...slide,
      questions: [
        ...slide.questions,
        { id: Date.now(), text: val, votes: 0, voted: false, answered: false },
      ],
    })
    setVal('')
  }

  const upvote = (id) => {
    onUpdate({
      ...slide,
      questions: slide.questions.map(q =>
        q.id === id ? { ...q, votes: q.voted ? q.votes - 1 : q.votes + 1, voted: !q.voted } : q
      ),
    })
  }

  const markAnswered = (id) => {
    onUpdate({
      ...slide,
      questions: slide.questions.map(q =>
        q.id === id ? { ...q, answered: !q.answered } : q
      ),
    })
  }

  const sorted = [...slide.questions].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <div className={styles.inputRow} style={{ marginBottom: 12 }}>
        <input
          className={styles.input}
          placeholder="Deine Frage…"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <button className="btn-primary" onClick={submit}>Senden</button>
      </div>
      <div className={styles.qaList}>
        {sorted.map(q => (
          <div key={q.id} className={`${styles.qaItem} ${q.answered ? styles.qaAnswered : ''}`}>
            <div className={styles.qaVote}>
              <button
                className={`${styles.qaUpvote} ${q.voted ? styles.qaUpvoteActive : ''}`}
                onClick={() => upvote(q.id)}
              >▲</button>
              <span className={styles.qaCount}>{q.votes}</span>
            </div>
            <div className={styles.qaText}>
              {q.text}
              {q.answered && <span className={styles.qaCheck}>✓ Beantwortet</span>}
            </div>
            <button className={styles.qaAnswerBtn} onClick={() => markAnswered(q.id)}>
              {q.answered ? '↩' : '✓'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
