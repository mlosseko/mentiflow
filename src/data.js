export const COLORS = ['#6af0c8', '#f06a9f', '#f0c86a', '#6a9ff0', '#c86af0', '#f09f6a']

export const TYPE_LABEL = {
  poll: '📊 Abstimmung',
  word: '☁️ Wortwolke',
  scale: '⭐ Skala',
  qa: '❓ Q&A',
}

export const BADGE_CLASS = {
  poll: 'badge-poll',
  word: 'badge-word',
  scale: 'badge-scale',
  qa: 'badge-qa',
}

export const INITIAL_SLIDES = [
  {
    id: 1,
    type: 'poll',
    question: 'Wie bewerten Sie die heutige Veranstaltung?',
    options: ['Hervorragend 🌟', 'Gut 👍', 'Okay 😐', 'Schlecht 👎'],
    votes: [14, 9, 3, 1],
    userVote: null,
  },
  {
    id: 2,
    type: 'word',
    question: 'Beschreiben Sie unsere Marke in einem Wort',
    words: [
      { text: 'Innovativ', count: 8 },
      { text: 'Modern', count: 6 },
      { text: 'Kreativ', count: 7 },
      { text: 'Schnell', count: 4 },
      { text: 'Stark', count: 2 },
    ],
  },
  {
    id: 3,
    type: 'scale',
    question: 'Wie wahrscheinlich würden Sie uns weiterempfehlen?',
    min: 1,
    max: 10,
    votes: [0, 1, 0, 1, 2, 3, 5, 8, 12, 7],
    userVote: null,
  },
  {
    id: 4,
    type: 'qa',
    question: 'Welche Fragen haben Sie?',
    questions: [
      { id: 101, text: 'Wann kommt Version 2.0?', votes: 7, voted: false, answered: false },
      { id: 102, text: 'Gibt es eine mobile App?', votes: 5, voted: false, answered: false },
    ],
  },
]
