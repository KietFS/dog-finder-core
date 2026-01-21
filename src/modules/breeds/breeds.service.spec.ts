import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsRepository } from './breeds.repository';
import { mockBreeds } from '../../../test/fixtures/test-data';

describe('BreedsService', () => {
    let service: BreedsService;
    let repository: BreedsRepository;
    let cacheManager: any;

    const mockBreedsRepository = {
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
                BreedsService,
                {
                    provide: BreedsRepository,
                    useValue: mockBreedsRepository,
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: mockCacheManager,
                },
            ],
        }).compile();

        service = module.get<BreedsService>(BreedsService);
        repository = module.get<BreedsRepository>(BreedsRepository);
        cacheManager = module.get(CACHE_MANAGER);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return paginated breeds', async () => {
            const query = { page: 1, limit: 10 };
            mockCacheManager.get.mockResolvedValue(null);
            mockBreedsRepository.findAll.mockResolvedValue([mockBreeds, mockBreeds.length]);

            const result = await service.findAll(query);

            expect(result.data).toHaveLength(mockBreeds.length);
            expect(result.meta.page).toBe(1);
            expect(result.meta.limit).toBe(10);
            expect(mockBreedsRepository.findAll).toHaveBeenCalled();
        });

        it('should return cached data if available', async () => {
            const query = { page: 1, limit: 10 };
            const cachedData = { data: mockBreeds, meta: {} };
            mockCacheManager.get.mockResolvedValue(cachedData);

            const result = await service.findAll(query);

            expect(result).toEqual(cachedData);
            expect(mockBreedsRepository.findAll).not.toHaveBeenCalled();
        });

        it('should filter breeds by name', async () => {
            const query = { page: 1, limit: 10, name: 'retriever' };
            mockCacheManager.get.mockResolvedValue(null);
            mockBreedsRepository.findAll.mockResolvedValue([[mockBreeds[0]], 1]);

            const result = await service.findAll(query);

            expect(result.data).toHaveLength(1);
            expect(mockBreedsRepository.findAll).toHaveBeenCalledWith(
                { name: 'retriever' },
                0,
                10,
            );
        });
    });

    describe('findOne', () => {
        it('should return a breed by id', async () => {
            mockCacheManager.get.mockResolvedValue(null);
            mockBreedsRepository.findById.mockResolvedValue(mockBreeds[0]);

            const result = await service.findOne(1);

            expect(result.id).toBe(1);
            expect(result.name).toBe('Golden Retriever');
            expect(mockBreedsRepository.findById).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException if breed not found', async () => {
            mockCacheManager.get.mockResolvedValue(null);
            mockBreedsRepository.findById.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });

        it('should return cached breed if available', async () => {
            const cachedBreed = mockBreeds[0];
            mockCacheManager.get.mockResolvedValue(cachedBreed);

            const result = await service.findOne(1);

            expect(result).toEqual(cachedBreed);
            expect(mockBreedsRepository.findById).not.toHaveBeenCalled();
        });
    });
});
