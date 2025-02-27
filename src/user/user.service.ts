import {
    BadRequestException,
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {ListUserDto} from "./dto/list-user.dto";
import {PaginationDto} from "../common/dto/pagination.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const newUserData = {
                name: createUserDto.name,
                password: createUserDto.password,
                email: createUserDto.email
            }

            const newUser = this.userRepository.create(newUserData);
            await this.userRepository.save(newUser);

            return newUser;
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('O E-mail já está cadastrado.');
            }

            throw e;
        }
    }

    async findAll(paginationDto?: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto || {};

        const users = await this.userRepository.find({
            take: limit,
            skip: offset,
            order: {
                id: 'asc',
            },
        });
        if (!users || users.length === 0) {
            throw new NotFoundException("Nenhum usuário foi encontrado.");
        }

        return users.map(user => ({
            ...new ListUserDto(user),
            createdAt: user.createdAt?.toDateString(),
            updatedAt: user.updatedAt?.toDateString()
        }));
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id,
            }
        });

        if (user) return {
            ...new ListUserDto(user),
            createdAt: user.createdAt?.toDateString(),
            updatedAt: user.updatedAt?.toDateString()
        };

        throw new NotFoundException("Usuário não encontrado.");
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            if (Object.values(updateUserDto).every(value => value === undefined)) {
                throw new BadRequestException('A requisição não pode estar vazia.');
            }

            const user = await this.userRepository.findOne({where: {id}});

            if (!user) {
                throw new NotFoundException(`Usuário com o ID ${id} não foi encontrado.`);
            }

            const updatedData = {
                ...updateUserDto,
                updatedAt: new Date()
            }

            await this.userRepository.update(id, updatedData);

            const updatedUser = await this.userRepository.findOne({where: {id}});

            if (!updatedUser) {
                throw new InternalServerErrorException('Erro ao atualizar o usuário.');
            }

            return new ListUserDto(updatedUser);
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }

            if (e.code === '23505') {
                throw new ConflictException("O E-mail informado já está em uso.");
            }

            throw new InternalServerErrorException("Um erro inesperado ocorreu.");
        }
    }


    async remove(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundException(`O usuário de ID ${id} não foi encontrado.`);
        }
        return this.userRepository.delete(id);
    }
}
