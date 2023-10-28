export const colors = [
  {
    bg: '#FFD2CC',
    text: '#FF5630',
  },
  {
    bg: '#F8E6A0',
    text: '#FFAB00',
  },
  {
    bg: '#BAF3DB',
    text: '#36B37E',
  },
  {
    bg: '#C1F0F5',
    text: '#00B8D9',
  },
  {
    bg: '#CCE0FF',
    text: '#0052CC',
  },
  {
    bg: '#DFD8FD',
    text: '#6554C0',
  }
];

export function getColor(symbol?: string) {
  function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  if (symbol) {
    const hash = hashCode(symbol);
    const index = hash % colors.length;
    return colors[Math.abs(index)];
  } else {
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
