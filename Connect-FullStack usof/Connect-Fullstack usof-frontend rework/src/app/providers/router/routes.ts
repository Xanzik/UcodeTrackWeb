export const routes = {
  home: {
    path: "/",
  },
  login: { path: "/Login" },
  register: {
    path: "/Register",
  },
  activateAccount: {
    path: `/activate/:token`,
  },
} as const;
