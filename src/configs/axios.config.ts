import ax, { AxiosError } from "axios";

export const environment = process.env.NODE_ENV as "production" | "development";
export type ErrorWithMessage = AxiosError<WithMessage>;
export interface WithMessage {
  message: string;
}

const sanitizeDomain = (domain: string) =>
  domain.at(-1) === "/" ? domain.slice(0, -1) + "/api" : domain + "/api";

export const backendDomains = {
  production: "https://westrance-production.up.railway.app",
  development: "http://localhost:4001",
};

export const url = sanitizeDomain(backendDomains[environment]);

export const axios = ax.create({
  baseURL: url,
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);