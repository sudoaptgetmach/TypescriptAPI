import {Body, Injectable, NotFoundException, Param, ParseIntPipe} from '@nestjs/common';
import {CreateMessageDto} from "./dto/create-message.dto";
import {Recado} from './entities/recados.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../user/entities/user.entity";
import {UpdateMessageDto} from "./dto/update-message.dto";
import {ListMessageDto} from "./dto/list-message.dto";
import {ListUserDto} from "../user/dto/list-user.dto";

@Injectable()
export class RecadosService {

    constructor(
        @InjectRepository(Recado)
        private readonly recadoRepository: Repository<Recado>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    async listOne(@Param('id', ParseIntPipe) id: number) {
        const recado = await this.recadoRepository.findOne({
            where: { id },
            relations: ['sender', 'receiver'],
        });

        if (recado) return {
            ...new ListMessageDto(recado),
            sender: new ListUserDto(recado.sender),
            receiver: new ListUserDto(recado.receiver),
            createdAt: recado.createdAt,
            updatedAt: recado.updatedAt,
        };

        throw new NotFoundException("Recado não encontrado.");
    }

    async listAll() {
        const recados = await this.recadoRepository.find({
            relations: ['sender', 'receiver'],
        });

        if (!recados || recados.length === 0) {
            throw new NotFoundException("Nenhum recado foi encontrado.");
        }

        return recados.map(recado => ({
            ...new ListMessageDto(recado),
            sender: new ListUserDto(recado.sender),
            receiver: new ListUserDto(recado.receiver),
            createdAt: recado.createdAt,
            updatedAt: recado.updatedAt,
        }));
    }

    async createMessage(@Body() createMessageDto: CreateMessageDto) {
        const sender = await this.userRepository.findOne({where: {id: createMessageDto.senderId}});
        const receiver = await this.userRepository.findOne({where: {id: createMessageDto.receiverId}});

        if (!sender || !receiver) {
            throw new NotFoundException('Sender or receiver not found.');
        }

        const novoRecado = {
            ...createMessageDto,
            sender,
            receiver,
            read: false,
            data: new Date(),
        };

        const recadoCreation = this.recadoRepository.create(novoRecado);
        const recado = await this.recadoRepository.save(recadoCreation);

        return {
            ...new ListMessageDto(recado),
            sender: new ListUserDto(sender),
            receiver: new ListUserDto(receiver)
        };
    }

    async updateMessage(@Param('id', ParseIntPipe) id: number, @Body() updateMessageDto: UpdateMessageDto) {
        const recado = await this.recadoRepository.findOne({
            where: {id}
        });

        if (!recado) {
            throw new NotFoundException(`O recado de ID ${id} não foi encontrado.`);
        }

        await this.recadoRepository.update(id, {
            ...updateMessageDto,
            updatedAt: new Date()
        });

        return this.recadoRepository.findOne({
            where: {id}
        });
    }

    async deleteMessage(@Param('id', ParseIntPipe) id: number) {
        const recado = await this.recadoRepository.findOne({
            where: {
                id
            }
        });

        if (!recado) {
            throw new NotFoundException(`O recado de ID ${id} não foi encontrado.`);
        }
        return this.recadoRepository.delete(id);
    }
}
