export function as<T>(that: any): T {
    return that as T;
}

export function logoutIf401(axiosErr: any) {
    if (axiosErr != null && axiosErr.response != null && axiosErr.response.status === 401) {
        logout();
    }
}

export function logout() {
    localStorage.removeItem('sessionToken');
    window.location.assign('/login');
}
