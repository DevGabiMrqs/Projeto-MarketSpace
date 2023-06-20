import axios, { AxiosError } from "axios";

type PromiseType = {
    onFailure: (error: AxiosError) => void
}

export const api = axios.create({
    baseURL: "http://179.97.102.202:3333"
});