export const SERVER_URL = process.env.SERVER_URL ? process.env.SERVER_URL : 'http://localhost:3000';
export const PIPE_API = process.env.PIPE_API ? process.env.PIPE_API : 'http://localhost:4000'
export const LOG_DATA = 'log_data'

export const USERS = process.env.USERS
export const JWT_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : "key"
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION ? process.env.JWT_EXPIRATION : 3600

export const LOGIN_ROUTE = "/login"
export const HOME_ROUTE = "/"

export const PUBLIC_ROUTES = [
    LOGIN_ROUTE,
    "/api/login"
]
