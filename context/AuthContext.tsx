import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert } from "react-native";

import {
  getActiveUsername,
  getStoredUsers,
  saveUsers,
  setActiveUsername,
} from "@/utils/storage";

interface AuthContextValue {
  currentUser: StoredUser | null;
  isAuthLoading: boolean;
  users: StoredUser[];
  login: (username: string, pin: string) => Promise<void>;
  signUp: (username: string, pin: string) => Promise<void>;
  logout: () => Promise<void>;
  switchAccount: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const normalizeUsername = (value: string) => value.trim().toLowerCase();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [storedUsers, activeUsername] = await Promise.all([
          getStoredUsers(),
          getActiveUsername(),
        ]);
        setUsers(storedUsers);
        if (activeUsername) {
          const existingUser = storedUsers.find(
            (user) => normalizeUsername(user.username) === normalizeUsername(activeUsername)
          );
          if (existingUser) {
            setCurrentUser(existingUser);
          }
        }
      } catch (error) {
        console.error("Failed to load saved users", error);
        Alert.alert("Error", "Unable to load saved users.");
      } finally {
        setIsAuthLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = useCallback(async (username: string, pin: string) => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !pin) {
      throw new Error("Username and PIN are required.");
    }

    const normalized = normalizeUsername(trimmedUsername);
    const existingUser = users.find(
      (user) => normalizeUsername(user.username) === normalized
    );

    if (!existingUser || existingUser.pin !== pin) {
      throw new Error("Invalid credentials. Please try again.");
    }

    setCurrentUser(existingUser);
    await setActiveUsername(existingUser.username);
  }, [users]);

  const signUp = useCallback(async (username: string, pin: string) => {
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3) {
      throw new Error("Username must have at least 3 characters.");
    }
    if (pin.length < 4) {
      throw new Error("PIN must have at least 4 digits.");
    }

    const normalized = normalizeUsername(trimmedUsername);
    const exists = users.some(
      (user) => normalizeUsername(user.username) === normalized
    );

    if (exists) {
      throw new Error("Username already exists. Choose another one.");
    }

    const newUser: StoredUser = {
      username: trimmedUsername,
      pin,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);

    await Promise.all([
      saveUsers(updatedUsers),
      setActiveUsername(newUser.username),
    ]);
  }, [users]);

  const logout = useCallback(async () => {
    setCurrentUser(null);
    await setActiveUsername(null);
  }, []);

  const switchAccount = useCallback(
    async (username: string) => {
      if (!currentUser) {
        throw new Error("You must be logged in to switch accounts.");
      }

      const normalized = normalizeUsername(username);
      const existingUser = users.find(
        (user) => normalizeUsername(user.username) === normalized
      );

      if (!existingUser) {
        throw new Error("Account not found on this device.");
      }

      if (currentUser?.username === existingUser.username) {
        return;
      }

      setCurrentUser(existingUser);
      await setActiveUsername(existingUser.username);
    },
    [currentUser, users]
  );

  const value = useMemo(
    () => ({ currentUser, isAuthLoading, users, login, signUp, logout, switchAccount }),
    [currentUser, isAuthLoading, users, login, signUp, logout, switchAccount]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
