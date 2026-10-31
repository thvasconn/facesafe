import React, { createContext, useContext, useState, ReactNode } from 'react';

type Plan = 'free' | 'full';

type AppContextValue = {
  plan: Plan;
  setPlan: (plan: Plan) => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  sosOpen: boolean;
  openSos: () => void;
  closeSos: () => void;
  lockOpen: boolean;
  openLock: () => void;
  closeLock: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>('free');
  const [isFavorite, setIsFavorite] = useState(true);
  const [sosOpen, setSosOpen] = useState(false);
  const [lockOpen, setLockOpen] = useState(false);

  const value: AppContextValue = {
    plan,
    setPlan,
    isFavorite,
    toggleFavorite: () => setIsFavorite((v) => !v),
    sosOpen,
    openSos: () => setSosOpen(true),
    closeSos: () => setSosOpen(false),
    lockOpen,
    openLock: () => setLockOpen(true),
    closeLock: () => setLockOpen(false),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
