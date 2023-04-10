import {
  useState,
  useMemo,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { login, User } from "../utils/api";

interface AuthContextType {
  token: string | null;
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
  const getToken = () => {
	// check if token has been saved for current session
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return null;
  };

  const [token, setToken] = useState<string | null>(getToken());
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const loginUser = async (username: string, password: string) => {
    login(username, password)
      .then((response) => {
        const { access_token } = response.data;
        setToken(access_token);
          localStorage.setItem("token", access_token);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const memoedValue = useMemo(
    () => ({
      token,
      loading,
      error,
      login: loginUser,
      logout,
    }),
    [token, loading, error]
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
