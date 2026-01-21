import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { mockCategories } from '../../../test/fixtures/test-data';

describe('CategoriesService', () => {
    let service: CategoriesService;
    let repository: CategoriesRepository;
    let cacheManager: any;

    const mockCategoriesRepository = {
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
                CategoriesService,
                {
                    provide: CategoriesRepository,
                    useValue: mockCategoriesRepository,
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: mockCacheManager,
                },
            ],
        }).compile();

        service = module.get<CategoriesService>(CategoriesService);
        repository = module.get<CategoriesRepository>(CategoriesRepository);
        cacheManager = module.get(CACHE_MANAGER);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return paginated categories', async () => {
            const query = { page: 1, limit: 10 };
            mockCacheManager.get.mockResolvedValue(null);
            mockCategoriesRepository.findAll.mockResolvedValue([
                mockCategories,
                mockCategories.length,
            ]);

            const result = await service.findAll(query);

            expect(result.data).toHaveLength(mockCategories.length);
            expect(result.meta.page).toBe(1);
            expect(mockCategoriesRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a category by id', async () => {
            mockCacheManager.get.mockResolvedValue(null);
            mockCategoriesRepository.findById.mockResolvedValue(mockCategories[0]);

            const result = await service.findOne(1);

            expect(result.id).toBe(1);
            expect(result.name).toBe('Puppies');
        });

        it('should throw NotFoundException if category not found', async () => {
            mockCacheManager.get.mockResolvedValue(null);
            mockCategoriesRepository.findById.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });
});
