import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type CursorMode = "default" | "view" | "explore" | "secret" | "connect";

interface CursorContextValue {
  mode: CursorMode;
  setMode: (mode: CursorMode) => void;
  label: string;
  setLabel: (label: string) => void;
  secretUnlocked: boolean;
  unlockSecret: () => void;
  bootComplete: boolean;
  setBootComplete: (v: boolean) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  const unlockSecret = useCallback(() => {
    setSecretUnlocked(true);
    setTimeout(() => setSecretUnlocked(false), 4000);
  }, []);

  return (
    <CursorContext.Provider
      value={{
        mode,
        setMode,
        label,
        setLabel,
        secretUnlocked,
        unlockSecret,
        bootComplete,
        setBootComplete,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
