
import { baseService } from "network/BaseService.ts";

export const UserFals = {

    insertUserFalRequest : async ( 
        req_user_id : any,
        req_formdata : any,
        req_formanswer : any,
        req_fal_user_id : any, 
        req_appointment_id : any,
        req_app_taken_user_id : any,
        req_app_date : any,
        req_app_time : any,
        req_start_hour : any,
        req_end_hour : any,
        req_fal_type : any,
    ) => {
        try {
            var response = await baseService.post<any[]>("insertUserFalRequest", {
                user_id : req_user_id,
                formdata : req_formdata,
                formanswer : req_formanswer,
                fal_user_id : req_fal_user_id, 
                appointment_id : req_appointment_id,
                app_taken_user_id : req_app_taken_user_id,
                app_date : req_app_date,
                app_time : req_app_time,
                start_hour : req_start_hour,
                end_hour : req_end_hour,
                fal_type : req_fal_type,
            });
            return response;
        }
        catch (error) {
            console.log("/api/insertFalDesign - UserFals insertUserFalRequest", error); 
            throw error;
        }
    },
    getWaitingFals : async (puser_id : any) => {
        try {
            var response = await baseService.post<any[]>("userWaitingFals" , {user_id : puser_id});
            return response;
        }
        catch (error) {
            console.log("/api/userWaitingFals - UserFals getWaitingFals", error); 
            throw error;
        }
    },

    getPersonalWaitingFals : async (puser_id : any) => {
        try {
            var response = await baseService.post<any[]>("personalWaitingFals" , {user_id : puser_id});
            return response;
        }
        catch (error) {
            console.log("/api/userWaitingFals - UserFals getWaitingFals", error); 
            throw error;
        }
    }
}

