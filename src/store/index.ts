import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGlobalQuote = create(
  persist(
    (set, get) => ({
      quote: {},
      fetch: async (symbol: string) => {
        const response = await fetch(
          `/api/query?function=GLOBAL_QUOTE&symbol=${symbol}`
        );
        const data = await response.json();
        set({ quote: data['Global Quote'] });
      },
    }),
    {
      name: 'GROWW_GLOBAL_STORAGE',
    }
  )
);
