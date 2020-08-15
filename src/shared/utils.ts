import {Role} from '../permissions/permission.enum';

export const matchRoles = (roles: string[], userRole: string): boolean => {
    return roles.includes(userRole);
};
