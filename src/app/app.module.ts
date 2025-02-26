import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RecadosModule} from '../recados/recados.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "../user/user.module";

@Module({
    imports: [ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USERNAME,
            database: process.env.POSTGRES_NAME,
            password: process.env.POSTGRES_PASSWORD,
            autoLoadEntities: true,
            synchronize: true
        }), RecadosModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}