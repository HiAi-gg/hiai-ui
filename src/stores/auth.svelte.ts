export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

let user = $state<User | null>(null);
let loading = $state(true);

export const authStore = {
  get user() { return user; },
  get loading() { return loading; },
  get isAdmin() { return user?.role === 'super_admin'; },

  async init(sessionEndpoint = '/api/auth/get-session') {
    try {
      const res = await fetch(sessionEndpoint, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json() as { user?: User };
        user = data.user || null;
      }
    } catch {
      user = null;
    } finally {
      loading = false;
    }
  },

  setUser(u: User | null) {
    user = u;
  },

  async logout(loginPath = '/login') {
    try {
      await fetch('/api/auth/sign-out', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // logout locally even if the server is unreachable
    }
    user = null;
    if (typeof window !== 'undefined') {
      window.location.href = loginPath;
    }
  },
};
