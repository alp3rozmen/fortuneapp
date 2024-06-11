import BaseModel  from "model/BaseModel";

export default interface UserDetailModel extends BaseModel {
    user_id?: number;
    profile_image?: string;
    gender?: string;
    age?: string;
    bio?: string;
    balance?: string;
    fal_type?: string;
    cost?: string;
}

interface UserCommentModel extends BaseModel {
    comment?: number;
    comment_stars?: number;
    created_at?: string;
}


export  { UserDetailModel, UserCommentModel }