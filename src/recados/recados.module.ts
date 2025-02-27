import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from '../user/user.module';
import { Recado } from './entities/recados.entity';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';

@Module({
    imports: [TypeOrmModule.forFeature([Recado]), UserModule],
    providers: [RecadosService],
    controllers: [RecadosController]
})
export class RecadosModule {}