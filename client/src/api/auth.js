const attemptGetLoginWithJWT = async () => {
    const token = window.localStorage.getItem('token');

    if (token) {
        const response = await fetch(`/api/auth/register/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const loginResult = await response.json();
        if (response.ok) {
            return loginResult;
        } else {
            window.localStorage.removeItem('token');
            return {};
        }
    }
};

export { attemptGetLoginWithJWT };