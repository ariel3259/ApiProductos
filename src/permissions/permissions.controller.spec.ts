import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Permissions } from './permissions.entity';
import { PermissionsResponseDto } from './dto/permissions-response.dto';
import { PermissionsModule } from './permissions.module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PermissionsController', () => {
  let permissionsController: PermissionsController;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [PermissionsModule],
    })
      .overrideProvider(getRepositoryToken(Permissions))
      .useValue(jest.fn())
      .compile();
    permissionsController = moduleRef.get<PermissionsController>(
      PermissionsController,
    );
    permissionsService = moduleRef.get<PermissionsService>(PermissionsService);
  });

  describe('findAll', () => {
    it('should return an array of permissions', async () => {
      const username = 'ariel_s';
      const permissions: Permissions[] = [
        new Permissions(1, 'listar-productos', username),
        new Permissions(2, 'crear-productos', username),
        new Permissions(3, 'modificar-productos', username),
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
      expect(permissionsService.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
