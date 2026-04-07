import { useState } from 'react'
import WordCloud from '../WordCloud'
import styles from './Slide.module.css'

export default function WordSlide({ slide, onUpdate }) {
  const [val, setVal] = useState('')

  const submit = () => {
    if (!val.trim()) return
    const words = [...slide.words]
    const existing = words.find(w => w.text.toLowerCase() === val.toLowerCase())
    if (existing) existing.count++
    else words.push({ text: val, count: 1 })
    onUpdate({ ...slide, words })
    setVal('')
  }

  return (
    <div>
      <WordCloud words={slide.words} />
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          placeholder="Dein Wort…"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <button className="btn-primary" onClick={submit}>Senden</button>
      </div>
    </div>
  )
}
