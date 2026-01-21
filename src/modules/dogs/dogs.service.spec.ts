import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsRepository } from './dogs.repository';
import { mockDogs } from '../../../test/fixtures/test-data';

describe('DogsService', () => {
    let service: DogsService;
    let repository: DogsRepository;
    let cacheManager: any;

    const mockDogsRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
    };

    const mockCacheManager = {
        get: jest.fn(),
        set: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DogsService,
                {
                    provide: DogsRepository,
                    useValue: mockDogsRepository,
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: mockCacheManager,
                },
            ],
        }).compile();

        service = module.get<DogsService>(DogsService);
        repository = module.get<DogsRepository>(DogsRepository);
        cacheManager = module.get(CACHE_MANAGER);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return paginated dogs', async () => {
            const query = { page: 1, limit: 10 };
            const mockDogsWithRelations = mockDogs.map((dog) => ({
                ...dog,
                breed: { id: 1, name: 'Golden Retriever', temperament: 'Friendly' },
                image: { id: 1, url: 'https://example.com/image.jpg' },
            }));
            mockCacheManager.get.mockResolvedValue(null);
            mockDogsRepository.findAll.mockResolvedValue([mockDogsWithRelations, mockDogs.length]);

            const result = await service.findAll(query);

            expect(result.data).toHaveLength(mockDogs.length);
            expect(mockDogsRepository.findAll).toHaveBeenCalled();
        });

        it('should filter dogs by breed_id', async () => {
            const query = { page: 1, limit: 10, breed_id: 1 };
            mockCacheManager.get.mockResolvedValue(null);
            mockDogsRepository.findAll.mockResolvedValue([[], 0]);

            await service.findAll(query);

            expect(mockDogsRepository.findAll).toHaveBeenCalledWith({ breed_id: 1 }, 0, 10);
        });

        it('should filter dogs by size', async () => {
            const query = { page: 1, limit: 10, size: 'large' };
            mockCacheManager.get.mockResolvedValue(null);
            mockDogsRepository.findAll.mockResolvedValue([[], 0]);

            await service.findAll(query);

            expect(mockDogsRepository.findAll).toHaveBeenCalledWith({ size: 'large' }, 0, 10);
        });
    });

    describe('findOne', () => {
        it('should return a dog by id', async () => {
            const mockDogWithRelations = {
                ...mockDogs[0],
                breed: { id: 1, name: 'Golden Retriever', temperament: 'Friendly' },
                image: { id: 1, url: 'https://example.com/image.jpg' },
            };
            mockCacheManager.get.mockResolvedValue(null);
            mockDogsRepository.findById.mockResolvedValue(mockDogWithRelations);

            const result = await service.findOne(1);

            expect(result.id).toBe(1);
            expect(result.name).toBe('Max');
            expect(result.breed).toBeDefined();
        });

        it('should throw NotFoundException if dog not found', async () => {
            mockCacheManager.get.mockResolvedValue(null);
            mockDogsRepository.findById.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });
});
