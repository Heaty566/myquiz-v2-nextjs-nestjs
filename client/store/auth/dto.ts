export interface UserLoginDto {
        username: string;
        password: string;
}

export interface UserRegisterDto {
        username: string;
        password: string;
        fullName: string;
        confirmPassword: string;
}
