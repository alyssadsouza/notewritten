import {
  useState,
  useMemo,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { login, User } from "../utils/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const getUser = () => {
	// check if token has been saved for current session
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user;
    }
    return null;
  };

  const [user, setUser] = useState<User | null>(getUser());
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const loginUser = async (username: string, password: string) => {
    login(username, password)
      .then((response) => {
        const user = response.data;
        setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login: loginUser,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
