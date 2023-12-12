export interface EmailOptionTypes {
    email: string;
    subject: string;
    template: string;
    data: {[key: string]: any};
}
