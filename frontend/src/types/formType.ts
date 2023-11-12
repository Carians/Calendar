
export interface FormType{
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password2: string
}

export interface FormErrorType{
    username: string | null,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
    password: string | null,
    password2: string | null
}
