import { UserStatus } from '../enums/user-status';
import { UserRole } from '../enums/user-role';

export class User {
    userId: number;
    userName: string;
    email: string;
    roleId: number;
    organizationId: number;
    firstName: string;
    lastName: string;
    phone: string;
    status: UserStatus;
    type: UserRole;

    constructor(user: any) {
        this.userId = user.userId;
        this.userName = user.userName;
        this.email = user.email;
        this.roleId = user.roleId;
        this.organizationId = user.orgId;
        this.status = user.status;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phone = user.phone;
        this.type = user.type;
    }
}
