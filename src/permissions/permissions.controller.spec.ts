import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Permissions } from './permissions.entity';
import { PermissionsResponseDto } from './dto/permissions-response.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

describe('PermissionsController', () => {
  let permissionsController: PermissionsController;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Permissions])],
      controllers: [PermissionsController],
      providers: [PermissionsService],
    }).compile();
    permissionsController = moduleRef.get<PermissionsController>(
      PermissionsController,
    );
    permissionsService = moduleRef.get<PermissionsService>(PermissionsService);
  });

  describe('findAll', () => {
    it('should return an array of permissions', async () => {
      const permissions: Permissions[] = [
        {
          permissionsId: 1,
          description: 'listar-productos',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'ariel_s',
          updatedBy: 'ariel_s',
          status: true,
        },
        {
          permissionsId: 2,
          description: 'crear-productos',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'ariel_s',
          updatedBy: 'ariel_s',
          status: true,
        },
        {
          permissionsId: 1,
          description: 'modificar-productos',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'ariel_s',
          updatedBy: 'ariel_s',
          status: true,
        },
      ];
      const result: PermissionsResponseDto[] = permissions.map(
        (x: Permissions) => new PermissionsResponseDto(x),
      );
      jest
        .spyOn(permissionsService, 'getAll')
        .mockImplementation(async () => result);
      const responseEndpoint: PermissionsResponseDto[] =
        await permissionsController.getAll();
      expect(responseEndpoint).toBe(result)
    });
  });
});
