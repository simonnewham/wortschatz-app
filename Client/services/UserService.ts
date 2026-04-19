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
}

// Export a singleton instance
const userService = new UserService();
export default userService;