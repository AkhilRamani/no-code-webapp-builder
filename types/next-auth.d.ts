import 'next-auth';
import { UserRecord } from './db/user.types';

declare module 'next-auth' {
    interface Session {
        user: Omit<UserRecord, '_id'> & {
            id: string;
        }
    }

    interface User extends Omit<UserRecord, '_id'> {
        _id: string;
        email: string;
    }
}

declare module 'next-auth/jwt' {
    type JWT = Omit<UserRecord, '_id'> & {
        id: string;
    }
}