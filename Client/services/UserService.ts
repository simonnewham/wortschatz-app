import { IUserInfo } from "@/models/IUserInfo";
import dataService from "./DataService";

class UserService {
    constructor() {
    }

    public async getUserInfo(): Promise<IUserInfo | null> {
        try {
            const response = await dataService.Get('User/getUserInfo');

            if (response.ok && response.status !== 401) {
                const data = await response.json();
                return {
                    id: data.id,
                    role: data.role,
                    userName: data.userName,
                    firstName: data.firstName,
                    lastName: data.lastName
                };
            }

            return null;
        }
        catch {

            return null;
        }
    }

    public async getActivity(): Promise<string[]> {
        try {
            // In a real scenario, this would call the API
            // const response = await dataService.Get('User/getActivity');
            // if (response.ok) return await response.json();

            // Stubbed data for the current month
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();

            return [
                new Date(year, month, 2).toISOString(),
                new Date(year, month, 5).toISOString(),
                new Date(year, month, 10).toISOString(),
                new Date(year, month, 12).toISOString(),
                new Date(year, month, 15).toISOString(),
                new Date(year, month, today.getDate()).toISOString(),
            ];
        } catch (error) {
            console.error(error, { logMessage: 'Error fetching user activity' });
            return [];
        }
    }

    public async getStreaks(): Promise<{ wordStreak: number; phraseStreak: number; }> {

        const response = await dataService.Get('User/getStreaks');
        if (response.ok) {
            const data = await response.json();

            return {
                wordStreak: data.wordStreak,
                phraseStreak: data.phraseStreak
            };
        }


        return { wordStreak: 0, phraseStreak: 0 };
    }
}

// Export a singleton instance
const userService = new UserService();
export default userService;