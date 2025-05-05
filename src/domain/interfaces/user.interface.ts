export interface UserInterface {
    id: string;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    birthdate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
