import { COLORS } from '../data'
import styles from './WordCloud.module.css'

export default function WordCloud({ words }) {
  const max = Math.max(...words.map(w => w.count), 1)
  return (
    <div className={styles.cloud}>
      {[...words].sort((a, b) => b.count - a.count).map((w, i) => {
        const c = COLORS[i % COLORS.length]
        const size = 11 + (w.count / max) * 20
        return (
          <span
            key={w.text}
            className={styles.tag}
            style={{
              background: c + '22',
              color: c,
              border: `1px solid ${c}44`,
              fontSize: size + 'px',
            }}
          >
            {w.text}
          </span>
        )
      })}
    </div>
  )
}
