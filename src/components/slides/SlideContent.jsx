import PollSlide from './PollSlide'
import WordSlide from './WordSlide'
import ScaleSlide from './ScaleSlide'
import QASlide from './QASlide'

export default function SlideContent({ slide, onUpdate }) {
  if (!slide) return null
  if (slide.type === 'poll') return <PollSlide slide={slide} onUpdate={onUpdate} />
  if (slide.type === 'word') return <WordSlide slide={slide} onUpdate={onUpdate} />
  if (slide.type === 'scale') return <ScaleSlide slide={slide} onUpdate={onUpdate} />
  if (slide.type === 'qa') return <QASlide slide={slide} onUpdate={onUpdate} />
  return null
}
