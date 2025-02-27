import {Module} from '@nestjs/common';
import {Recado} from './entities/recados.entity';
import {RecadosService} from './recados.service';
import {RecadosController} from './recados.controller';
import {UserModule} from '../user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Recado]), UserModule],
    providers: [RecadosService],
    controllers: [RecadosController]
})
export class RecadosModule {}