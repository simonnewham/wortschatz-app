import userService from "./UserService";

export interface ICredentials {
    email: string;
    password: string;
}

const Token_Key = 'authToken';

class AuthService {
    constructor() {
        this.baseUrl = process.env.EXPO_PUBLIC_WORTSCHATZ_API_URL;
    }

    public async isAuthenticated() {
        const user = await userService.getUserInfo();
        return user != null;
    }

    public async login(credentials: ICredentials) {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            this.setToken(data.accessToken);

            return {
                success: true,
                token: data.accessToken,
            };
        } catch (error: any) {
            return {
                success: false,
            };
        }
    }

    public async register(userDetails: ICredentials) {
        try {
            const response = await fetch(`${this.baseUrl}/User/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            return {
                success: true
            };
        } catch (error: any) {
            return {
                success: false,
            };
        }
    }

    public async logout() {
        this.clearToken();
    }

    // TODO: Only for web
    getToken() {
        return localStorage?.getItem(Token_Key) ?? undefined;
    }

    setToken(accessToken: string) {
        localStorage?.setItem(Token_Key, accessToken);
    }

    clearToken() {
        localStorage?.removeItem(Token_Key);
    }

    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }

    private readonly baseUrl;

}

// Export a singleton instance
const authService = new AuthService();
export default authService;