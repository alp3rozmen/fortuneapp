import { UserDetail } from "model/user_details.ts";
import { baseService } from "network/BaseService.ts";

export const userDetailService = {

    getAll: async ()  => {
        try {
            var response = await baseService.post<UserDetail[]>("users", {user_role : 0 , fortuner_type : 0 , isAdmin : 1});
            return response;

        } catch (error) {
            console.log("/api/users - CategoryService getAll", error);
            throw error;
        }
    },
    getByRoleAndType: async (role : any, type : any , adminReq : any) => {
        try {
            var response = await baseService.post<UserDetail>("users", {user_role : role, fortuner_type : type , isAdmin : adminReq});
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
    getUserAppointments: async (url , userid : any, faltype : any , selectedDate : any) => {
        try {
            var response = await baseService.postWithData(url, {userid : userid , faltype : faltype , pselectedDate : selectedDate});
            return response;
            

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    getUserFalTypesAndAppointments: async (url , username : any) => {
        try {
            var response = await baseService.postWithData(url, {username : username});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    // KULLANICIDA OLMAYAN FALTIPLERI
    getUserFalTypes : async (url , userid : any, isAddedfals : any) => {
        try {
            var response = await baseService.postWithData(url, {id : userid , isAddedfals : isAddedfals});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    InsertFalTypeToUser : async (data : any) => {
        try {
            var response = await baseService.postWithData('insertToUserFalType', {faltype_id : data.faltype_id, cost : data.cost,  userid : data.userid});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    DeleteFalTypeToUser : async (url,id : any) => {
        try {
            var response = await baseService.delete(url, id);
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    UpdateFalTypeToUser : async (data : any) => {
        try {
            var response = await baseService.update('updateUserFalType', data);
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    AddAppointmentUser : async (data : any) => {
        try {
            var response = await baseService.postWithData('addUserAppointment', data);
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    
    DeleteAppointmentToUser : async (url,id : any) => {
        try {
            var response = await baseService.delete(url, id);
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    UpdateUserAppointment : async (data : any) => {
        try {
            var response = await baseService.update('updateUserAppointment', data);
            return response;

        } catch (error) {
            console.log(error);
            throw error;    
        }
    },
    UpdateUserStatus : async (data : any) => {
        try {
            var response = await baseService.update('updateUserStatus', data);
            return response;

        } catch (error) {
            console.log(error);
            throw error;    
        }
    },
    UpdateUserProfilePicture : async (data : any) => {
        try {
            var response = await baseService.update('updateUserProfilePicture', data);
            return response;

        } catch (error) {
            console.log(error);
            throw error;    
        }
    }
}

