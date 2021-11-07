import { HookNextFunction, model, Schema } from 'mongoose';

import { encryptionService } from '@core/services';

import { User, UserDocument } from './user.interfaces';

const attributes = {
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        select: false,
        type: String,
    },
    firstname: {
        required: true,
        type: String,
    },
    lastname: {
        required: true,
        type: String,
    },
};

const options = {};

const UserSchema = new Schema<User>(attributes, options);

UserSchema.index({ email: 1 }, { unique: true });

// Encrypt password
UserSchema.pre<UserDocument>('save', function (next: HookNextFunction) {
    if (this.isModified('password')) {
        this.password = encryptionService.encrypt(this.password);
    }
    next();
});

export const UserModel = model<UserDocument>('User', UserSchema);
