import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function getConfig(configService: ConfigService): TypeOrmModuleOptions {
  const entitiesPath: string = join(__dirname, '../**/*.entity{.ts,.js}');
  return {
    type: 'mssql',
    host: configService.get('HOST'),
    username: configService.get('USERNAME_DB'),
    password: configService.get('PASSWORD'),
    port: Number(`${configService.get('DB_PORT')}`),
    database: configService.get('DATABASE'),
    entities: [entitiesPath],
    synchronize: false,
    options: {
      trustServerCertificate: true,
    }
  };
}