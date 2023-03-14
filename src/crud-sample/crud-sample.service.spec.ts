import { Test, TestingModule } from '@nestjs/testing';
import { CrudSampleService } from './crud-sample.service';

describe('CrudSampleService', () => {
  let service: CrudSampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudSampleService],
    }).compile();

    service = module.get<CrudSampleService>(CrudSampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
