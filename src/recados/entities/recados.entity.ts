import {IsBoolean, IsDate, IsInt, IsString} from "class-validator";
import {Type} from "class-transformer";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Recado {

    @Type(() => Number)
    @PrimaryGeneratedColumn("increment")
    @IsInt()
    id: number;

    @IsString()
    @Column({type: 'varchar', length: 255})
    name: string;

    @IsString()
    @Column({type: 'varchar', length: 255})
    description: string;

    @IsString()
    @Column({type: 'varchar', length: 255})
    sender: string;

    @IsString()
    @Column({type: 'varchar', length: 255})
    receiver: string;

    @IsBoolean()
    @Column({default: false, type: 'boolean'})
    read: boolean;

    @IsDate()
    @Type(() => Date)
    data: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date
}