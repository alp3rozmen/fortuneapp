import { UserDetail } from "model/user_details.ts";
import { baseService } from "network/BaseService.ts";

export const userDetailService = {

    getAll: async ()  => {
        try {
            var response = await baseService.post<UserDetail[]>("users", {user_role : 0 , fortuner_type : 0});
            return response;

        } catch (error) {
            console.log("/api/users - CategoryService getAll", error);
            throw error;
        }
    },
    getByRoleAndType: async (role : any, type : any) => {
        try {
            var response = await baseService.post<UserDetail>("users", {user_role : role, fortuner_type : type});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getByUsername: async (url ,username : any) => {
        try {
            var response = await baseService.getWithData<UserDetail>(url, {user_name : username});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getByUserId: async (url ,userid, model : any) => {
        try {
            var response = await baseService.getById<typeof model>(url, {id : userid});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getUserAppointments: async (url , userid : any) => {
        try {
            var response = await baseService.postWithData(url, {userid : userid});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

