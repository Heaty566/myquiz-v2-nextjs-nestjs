export interface UserLoginDto {
        username: string;
        password: string;
}

export interface UserRegisterDto {
        username: string;
        password: string;
        name: string;
        confirmPassword: string;
}
