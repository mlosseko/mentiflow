import styles from './Slide.module.css'

export default function ScaleSlide({ slide, onUpdate }) {
  const total = slide.votes.reduce((a, b) => a + b, 0)
  const avg = total
    ? (slide.votes.reduce((s, v, i) => s + v * (i + 1), 0) / total).toFixed(1)
    : '—'

  const vote = (n) => {
    const votes = [...slide.votes]
    if (slide.userVote !== null) votes[slide.userVote - slide.min]--
    votes[n - slide.min]++
    onUpdate({ ...slide, votes, userVote: n })
  }

  return (
    <div>
      <div className={styles.scaleRow}>
        {Array.from({ length: slide.max - slide.min + 1 }, (_, k) => k + slide.min).map(n => (
          <button
            key={n}
            className={`${styles.scaleBtn} ${slide.userVote === n ? styles.scaleBtnActive : ''}`}
            onClick={() => vote(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className={styles.scaleLabels}>
        <span>Gar nicht</span>
        <span>Sehr gern</span>
      </div>
      <div className={styles.avg}>
        <div className={styles.avgNum}>{avg}</div>
        <div className={styles.avgLabel}>Ø · {total} Stimmen</div>
      </div>
    </div>
  )
}
