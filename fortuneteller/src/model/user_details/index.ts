import { BaseModel } from "model/BaseModel";

export interface UserDetail extends BaseModel {
    user_id?: number;
    profile_image?: string;
    gender?: string;
    age?: string;
    bio?: string;
    balance?: string;
    fal_type?: string;
    cost?: string;
}