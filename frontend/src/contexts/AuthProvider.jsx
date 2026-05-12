import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';

const SESSION_KEY = 'auth_token';
const REFRESH_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => sessionStorage.getItem(USER_KEY) || null);
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY) || null);

  const login = useCallback((username, accessToken, refreshToken) => {
    sessionStorage.setItem(SESSION_KEY, accessToken);
    sessionStorage.setItem(REFRESH_KEY, refreshToken);
    sessionStorage.setItem(USER_KEY, username);
    setToken(accessToken);
    setUser(username);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: !!token, login, logout }),
    [user, token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
