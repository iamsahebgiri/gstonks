export const colors = [
  {
    bg: "#FFD2CC",
    text: "#AE2A19",
  },
  {
    bg: "#F8E6A0",
    text: "#7F5F01",
  },
  {
    bg: "#BAF3DB",
    text: "#216E4E",
  },
  {
    bg: "#C1F0F5",
    text: "#206B74",
  },
  {
    bg: "#CCE0FF",
    text: "#0055CC",
  },
  {
    bg: "#DFD8FD",
    text: "#5E4DB2",
  },
  {
    bg: "#FDD0EC",
    text: "#943D73",
  },
];

export function getColor(topic?: string) {
  function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  if (topic) {
    const hash = hashCode(topic);
    const index = hash % colors.length;
    return colors[Math.abs(index)];
  } else {
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
