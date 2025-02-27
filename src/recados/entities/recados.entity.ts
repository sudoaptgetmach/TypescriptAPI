import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../../user/entities/user.entity";

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

    @ManyToOne(() => User, (user) => user.messagesSentList, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'sender'})
    sender: User;

    @ManyToOne(() => User, (user) => user.messagesReceivedList, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'receiver'})
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