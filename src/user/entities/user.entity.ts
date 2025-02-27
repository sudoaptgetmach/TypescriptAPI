import {Type} from "class-transformer";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsEmail, IsInt, IsString} from "class-validator";
import {Recado} from "../../recados/entities/recados.entity";

@Entity()
export class User {
    @Type(() => Number)
    @PrimaryGeneratedColumn("increment")
    @IsInt()
    id: number;

    @IsString()
    @Column({type: 'varchar', length: 255})
    name: string;

    @IsEmail()
    @Column({type: 'varchar', length: 255, unique: true})
    email: string;

    @IsString()
    @Column({type: 'varchar', length: 100})
    password: string;

    @OneToMany(() => Recado, (recado) => recado.sender, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    messagesSentList: Recado[];

    @OneToMany(() => Recado, (recado) => recado.receiver, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    messagesReceivedList: Recado[];

    @OneToMany(() => User, user => user.friendList)
    @Type(() => User)
    friendList: User[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
