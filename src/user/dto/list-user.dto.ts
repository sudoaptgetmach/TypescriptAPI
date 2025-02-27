import {IsNumber, IsString} from "class-validator";
import {User} from "../entities/user.entity";
import {CreateDateColumn, UpdateDateColumn} from "typeorm";

export class ListUserDto {
    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}