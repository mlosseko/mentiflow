import styles from './Slide.module.css'

export default function PollSlide({ slide, onUpdate }) {
  const total = slide.votes.reduce((a, b) => a + b, 0)

  const vote = (i) => {
    const votes = [...slide.votes]
    if (slide.userVote !== null) votes[slide.userVote]--
    votes[i]++
    onUpdate({ ...slide, votes, userVote: i })
  }

  return (
    <div>
      <div className={styles.voteGrid}>
        {slide.options.map((opt, i) => (
          <button
            key={i}
            className={`${styles.voteBtn} ${slide.userVote === i ? styles.voted : ''}`}
            onClick={() => vote(i)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className={styles.bars}>
        {slide.options.map((opt, i) => {
          const pct = total ? Math.round((slide.votes[i] / total) * 100) : 0
          return (
            <div key={i} className={styles.bar}>
              <div className={styles.barLabel}>
                <span className={styles.barText}>{opt}</span>
                <span className={styles.barPct}>{pct}% ({slide.votes[i]})</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: pct + '%' }} />
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.meta}>{total} Stimmen</div>
    </div>
  )
}
