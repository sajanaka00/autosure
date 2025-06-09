// Token management
export const tokenManager = {
  getToken: () => {
    try {
      return JSON.parse(sessionStorage.getItem('authToken'));
    } catch {
      return null;
    }
  },
  setToken: (token) => sessionStorage.setItem('authToken', JSON.stringify(token)),
  removeToken: () => sessionStorage.removeItem('authToken'),
  getUser: () => {
    try {
      return JSON.parse(sessionStorage.getItem('user'));
    } catch {
      return null;
    }
  },
  setUser: (user) => sessionStorage.setItem('user', JSON.stringify(user)),
  removeUser: () => sessionStorage.removeItem('user')
};