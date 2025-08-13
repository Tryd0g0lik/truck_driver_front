/**
 * src\interfaces.ts
 */
const APP_HOST = process.env.APP_HOST || "127.0.0.1";
const APP_PORT  = process.env.APP_PORT || "8000";
const APP_PROTOCOL = process.env.HTTP || "http";

export const APP_URL = !APP_PORT ? `${APP_PROTOCOL}://${APP_HOST}` : `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`;
 /* COMMON */
 export interface PageMeta {
    page: {
        title: string,
        description: string,
        keywords: Array<string>,
        pathName: string,
    }

 }
export enum TokenKeys {
    TOKEN_ACCESS_KEY = "access_token",
    TOKEN_REFRESH_KEY = "refresh_token",
    TOKEN_CSRF = "csrftoken"
}

export enum APIPerson {
    API__POST_REGISTERATION = "/api/auth/register/",
    API__POST_LOGIN = "/",
    API__POST_LOGOUT = "/",
    API__POST_GET_USER = "/",
    API__POST_GET_USERS = "/",
    API__POST_GET_USERS_BY_ID = "/"
}

/*** Person, it's basis proparties for User */
export type BasisData = {
    username: string,
    password: string,
    email?: string,
}
export interface DataForDAPI extends BasisData {
    is_active?: boolean,
    is_staff?: boolean,
    is_superuser?: boolean,
    date_joined?: string,
    created_at?: string,
    is_verified?: boolean,
    updated_at?: string,
    is_sent?: boolean,
    balance?: number
}

export type HandlerApiProps = {
    api: {
        url: string,
        method: string,
        body:FormData
    }

}

/* NEW TYPE REDUX */
/**
 * This is intarface for User.status
 */
export enum UserStatus {
  STATUS_ADMIN = "ADMIN",
  STATUS_USER = "USER",
  STATUS_SUPER_ADMIN = "SUPER_ADMIN",
  STATUS_ANONYMOUSUSER = "ANONYMOUSUSER"
}

export interface StatePerson extends DataForDAPI {
    "status": string
}
