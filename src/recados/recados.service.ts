import {Body, Injectable, NotFoundException, Param, ParseIntPipe} from '@nestjs/common';
import {CreateMessageDto} from "./dto/CreateMessageDto";
import {UpdateMessageDto} from "./dto/UpdateMessageDto";
import {Recado} from './entities/recados.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class RecadosService {

    constructor(
        @InjectRepository(Recado)
        private readonly recadoRepository: Repository<Recado>
    ) {
    }

    async listOne(@Param('id', ParseIntPipe) id: number) {
        const recado = await this.recadoRepository.findOne({
            where: {
                id,
            }
        });

        if (recado) return recado;

        throw new NotFoundException("Recado não encontrado.");
    }

    async listAll() {
        const recados = await this.recadoRepository.find();
        if (!recados || recados.length === 0) {
            throw new NotFoundException("Nenhum recado foi encontrado.");
        }
        return recados;
    }

    async createMessage(@Body() createMessageDto: CreateMessageDto) {
        const novoRecado = {
            ...createMessageDto,
            read: false,
            data: new Date(),
        };

        const recado = this.recadoRepository.create(novoRecado);
        return this.recadoRepository.save(recado);
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
