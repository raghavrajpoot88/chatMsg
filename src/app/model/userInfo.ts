export interface userInfo
{
    Email:string|null,
    Name:string|null,
    Password:string|null,
}
export interface loginInfo{
    Email:string,
    Password:string,
    token:any,
}
export interface userList{
    userId: string;
    email: string;
    name: string;
    passwordHash: string;
    passwordSalt: string;
}