import { string } from "yup";

export class AppError {
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}