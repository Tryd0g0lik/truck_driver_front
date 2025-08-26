/**
 * src\interfaces.ts
 */
const APP_HOST = process.env.APP_HOST || "83.166.245.209";
const APP_PORT  = process.env.APP_PORT || "8000";
const APP_PROTOCOL = process.env.HTTP || "http";

export const APP_URL = !APP_PORT ? `${APP_PROTOCOL}://${APP_HOST}` : `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`;

 /* COMMON */
 export interface PageMeta {
    page: {
        title: string,
        description: string,
        keywords: Array<string>,
        pathName: string
    }
 };

export enum TokenKeys {
    TOKEN_ACCESS_KEY = "access_token",
    TOKEN_REFRESH_KEY = "refresh_token",
    TOKEN_CSRF = "csrftoken"
};

/** Statice pathname of API & pages */
export enum APIPerson {
    API__POST_REGISTERATION = "/api/auth/person/",
    API__POST_LOGIN = "/api/auth/person/0/active/",
    API__POST_LOGOUT = "/",
    API__POST_GET_USER = "/",
    API__POST_GET_USERS = "/",
    API__POST_GET_USERS_BY_ID = "/"
};

/*** Person, it's basis proparties for User */
export type BasisData = {
    username: string,
    password: string,
    email?: string,
    category: string
};

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
};

export type HandlerApiProps = {
    api: {
        url: string,
        method: string,
        body:FormData
    }

};

/* NEW TYPE REDUX */
/**
 * This is intarface for User's status roles
 */
export enum UserStatus {
  CATEGORY_BASE = "BASE",
  CATEGORY_DRIVER = "DRIVER",
  CATEGORY_MANAGER = "MANAGER",
  CATEGORY_CLIENT = "CLIENT",
  CATEGORY_ADMIN = "ADMIN"
};

export interface StatePerson extends DataForDAPI {
    "status": string
};
declare interface Window {
  google: typeof google;
}

/* USER MAPS */
export enum TruckStatus {
    CURRENT = "Current location",
    PICKUP = "Pick-up location",
    DROPOFF = "Drop-off location",
    OffDUTY = "Off Duty",
    SLEEPER_BERTHER = "Sleeper Berther",
    DRIWING = "Driwing",
    OnDUTY = "On Duty"
};

export enum TruckTimer {
    PM = "PM",
    AM = "AM",
};

export type TokenAccessType = {
    "token_access": string,
    "live_time": number,
} ;
export type TokenTokenrefreshType = {
    "token_refresh": string,
    "live_time": number,
};
type UserType = {
    "id": number;
    "last_login": string;
    "is_superuser": boolean;
    "username": string;
    "first_name": string;
};
export interface ActiveUser {
    "data": [
        {
            "access":TokenAccessType,
            "refresh":TokenTokenrefreshType,
            "user": UserType
        }
    ]
};
