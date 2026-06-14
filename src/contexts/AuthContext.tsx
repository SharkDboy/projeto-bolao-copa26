import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { enterWithName as enterWithNameRequest } from "../services/playerAuth";

interface AuthContextValue {
  user: User | null;
  displayName: string | null;
  loading: boolean;
  enterWithName: (name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchDisplayName(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", userId)
    .maybeSingle();

  if (error) return null;
  return data?.display_name ?? null;
}

function displayNameFromUser(user: User): string | null {
  const meta = user.user_metadata?.display_name;
  return typeof meta === "string" && meta.length > 0 ? meta : null;
}

async function resolveDisplayName(user: User): Promise<string | null> {
  const fromDb = await fetchDisplayName(user.id);
  if (fromDb) return fromDb;
  return displayNameFromUser(user);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (currentUser: User) => {
    const name = await resolveDisplayName(currentUser);
    setDisplayName(name);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        loadProfile(currentUser).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        loadProfile(currentUser);
      } else {
        setDisplayName(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const enterWithName = useCallback(async (name: string) => {
    const resolvedName = await enterWithNameRequest(name);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setDisplayName(resolvedName);
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setDisplayName(null);
  }, []);

  const value = useMemo(
    () => ({ user, displayName, loading, enterWithName, signOut }),
    [user, displayName, loading, enterWithName, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
