export const routes = {
  home: {
    path: "/",
  },
  login: { path: "/login" },
  register: {
    path: "/register",
  },
  activateAccount: {
    path: `/activate/:token`,
  },
  users: { path: "/users" },
  profile: { path: "/profile" },
} as const;
