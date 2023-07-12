import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesModule } from './roles.module';
import { RolesPermissions } from '../roles-permissions/roles-permissions.entity';
import { Page } from '../dto/page';
import { RolesResponseDto } from './dto/roles-response.dto';
import { Response } from 'express';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RolesModule],
    })
      .overrideProvider(getRepositoryToken(Roles))
      .useValue(jest.fn())
      .overrideProvider(getRepositoryToken(RolesPermissions))
      .useValue(jest.fn)
      .compile();
    controller = moduleRef.get<RolesController>(RolesController);
    service = moduleRef.get<RolesService>(RolesService);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of roles response', async () => {
    //mocking object Response
    const mockRes: Partial<Response> = {
      set: jest.fn().mockReturnThis(),
    }
    //getAll service mock
    const resultPage: Page<RolesResponseDto> = {
      elements: [
        {
          rolesId: 1,
          description: 'Admin',
        },
        {
          rolesId: 1,
          description: 'usuario',
        },
        {
          rolesId: 1,
          description: 'empresa',
        },
        {
          rolesId: 1,
          description: 'vendedor',
        },
      ],
      totalItems: 10,
    };
    jest.spyOn(service, 'getAll').mockImplementation(async () => resultPage);
    const result: RolesResponseDto[] = await controller.getAll(
      '0',
      '10',
      mockRes as Response,
    );
    expect(result).toEqual(resultPage.elements);
    expect(mockRes.set).toHaveBeenCalledWith(
      'x-total-count',
      resultPage.totalItems.toString(),
    );
  })
})