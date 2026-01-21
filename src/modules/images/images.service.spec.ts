import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesRepository } from './images.repository';
import { mockImages } from '../../../test/fixtures/test-data';

describe('ImagesService', () => {
    let service: ImagesService;
    let repository: ImagesRepository;
    let cacheManager: any;

    const mockImagesRepository = {
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
                ImagesService,
                {
                    provide: ImagesRepository,
                    useValue: mockImagesRepository,
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: mockCacheManager,
                },
            ],
        }).compile();

        service = module.get<ImagesService>(ImagesService);
        repository = module.get<ImagesRepository>(ImagesRepository);
        cacheManager = module.get(CACHE_MANAGER);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return paginated images', async () => {
            const query = { page: 1, limit: 10 };
            mockCacheManager.get.mockResolvedValue(null);
            mockImagesRepository.findAll.mockResolvedValue([mockImages, mockImages.length]);

            const result = await service.findAll(query);

            expect(result.data).toHaveLength(mockImages.length);
            expect(mockImagesRepository.findAll).toHaveBeenCalled();
        });

        it('should filter images by breed_id', async () => {
            const query = { page: 1, limit: 10, breed_id: 1 };
            mockCacheManager.get.mockResolvedValue(null);
            mockImagesRepository.findAll.mockResolvedValue([mockImages, 1]);

            const result = await service.findAll(query);

            expect(mockImagesRepository.findAll).toHaveBeenCalledWith({ breed_id: 1 }, 0, 10);
        });
    });

    describe('findOne', () => {
        it('should return an image by id', async () => {
            mockCacheManager.get.mockResolvedValue(null);
            mockImagesRepository.findById.mockResolvedValue(mockImages[0]);

            const result = await service.findOne(1);

            expect(result.id).toBe(1);
        });

        it('should throw NotFoundException if image not found', async () => {
            mockCacheManager.get.mockResolvedValue(null);
            mockImagesRepository.findById.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });
});
