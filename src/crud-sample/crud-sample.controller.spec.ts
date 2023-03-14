import { Test, TestingModule } from '@nestjs/testing';
import { CrudSampleController } from './crud-sample.controller';
import { CrudSampleService } from './crud-sample.service';

describe('CrudSampleController', () => {
  let controller: CrudSampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudSampleController],
      providers: [CrudSampleService],
    }).compile();

    controller = module.get<CrudSampleController>(CrudSampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
