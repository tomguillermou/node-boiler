import { Document, Types } from 'mongoose';

export interface UserDTO {
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface User {
    _id: Types.ObjectId;

    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export type UserDocument = User & Document;
