import {IsNumber, IsString} from "class-validator";
import {User} from "../entities/user.entity";

export class ListUserDto {
    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;
}