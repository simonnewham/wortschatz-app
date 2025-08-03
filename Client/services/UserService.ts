import { IUserInfo } from "@/models/IUserInfo";
import dataService from "./DataService";

class UserService {
    constructor() {
    }

    public async getUserInfo(): Promise<IUserInfo | null> {
        const response = await dataService.Get('User/getUserInfo');

        if (response.ok) {
            const data = await response.json();
            return {
                userName: data.userName,
                firstName: data.firstName,
                lastName: data.lastName
            };
        }

       return null;
    }
}

// Export a singleton instance
const userService = new UserService();
export default userService;