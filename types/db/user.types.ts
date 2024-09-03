import { ObjectId } from "mongodb";

export interface UserRecord {
    _id: ObjectId;
    email: string;
    isVerified?: boolean;
    // isAcceptingMessages?: boolean;
    firstName: string;
    lastName: string;
    password: string
}