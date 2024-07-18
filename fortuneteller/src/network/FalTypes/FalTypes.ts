
import { FalTypeAndCost } from "model/falTypeAndCost";
import { baseService } from "network/BaseService.ts";

export const FalTypes = {

    getAll: async ()  => {
        try {
            var response = await baseService.get<any[]>("getFalTypes");
            return response;

        } catch (error) {
            console.log("/api/getFalTypes - FalTypes getAll", error);
            throw error;
        }
    },
    AddFalType : async (name : any) => {
        try {
            var response = await baseService.post<any[]>("InsertFalType", {fal_name : name});
            return response;

        } catch (error) {
            console.log("/api/InsertFalType - FalTypes AddFalType", error);
            throw error;
        }
    },
    DelFalType : async (id : any) => {
        try {
            var response = await baseService.post<any[]>("DeleteFalType", {fal_id : id});
            return response;
        }
        catch (error) {
            console.log("/api/DeleteFalType - FalTypes DelFalType", error); 
            throw error;
        }
    },
    getByRoleAndType: async (role : any, type : any) => {
        try {
            var response = await baseService.post<FalTypeAndCost>("users", {user_role : role, fortuner_type : type});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getByUsername: async (url ,username : any) => {
        try {
            var response = await baseService.getWithData<FalTypeAndCost>(url, {user_name : username});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getByUserId: async (url , id : any) => {
        try {
            var response = await baseService.getById<FalTypeAndCost>(url, {id : id});
            return response;

        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    updateById: async (url , id : any) => {
        try {
            var response = await baseService.update(url , id);
            return response;
        }   
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}

