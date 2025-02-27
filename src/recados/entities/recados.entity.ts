import {IsBoolean, IsDate, IsInt, IsString} from "class-validator";
import {Type} from "class-transformer";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

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

    @ManyToOne(() => User, (user) => user.messagesSentList, { eager: true })
    sender: User;

    @ManyToOne(() => User, (user) => user.messagesReceivedList, { eager: true })
    receiver: User;

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