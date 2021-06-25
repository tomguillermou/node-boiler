import { Document } from 'mongoose';

export interface UserDTO {
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    position?: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface User {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    position: string;
}

export interface UserDocument extends User, Document {}
