import authService from "./AuthService";

class DataService {
    constructor() {
        this.baseUrl = process.env.EXPO_PUBLIC_WORTSCHATZ_API_URL || 'http://localhost:5153';
    }

    public async Get(endpoint: string, id?: string): Promise<Response> {
        const response = fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'GET',
            headers: authService.getAuthHeaders()
        });

        return response;
    }

    public async Delete(endpoint: string, id: string): Promise<Response> {
        const response = fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'Delete',
            headers: authService.getAuthHeaders()
        });

        return response;
    }

    public async Post(endpoint: string, body?: string): Promise<Response> {
        const response = fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: authService.getAuthHeaders(),
            body: body ? JSON.stringify(body) : undefined,
        });

        return response;
    }

    private readonly baseUrl;
}

const dataService = new DataService();
export default dataService;