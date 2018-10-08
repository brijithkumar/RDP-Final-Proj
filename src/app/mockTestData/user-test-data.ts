import { User } from "../model/user.component";

export function getTestUsers(): User[] {
    return [
        {
            userId: 1, firstName: 'Test First', lastName: 'Test Second',
            employeeId: 123
        },
        {
            userId: 2, firstName: 'Test T', lastName: 'Test ST',
            employeeId: 124
        }
    ];
}
