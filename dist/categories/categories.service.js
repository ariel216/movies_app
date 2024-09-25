"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const movie_entity_1 = require("../movies/entities/movie.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository, moviesRepository) {
        this.categoriesRepository = categoriesRepository;
        this.moviesRepository = moviesRepository;
    }
    async findOneOrFail(id, relations = false) {
        const category = await this.categoriesRepository.findOne({
            where: { id: id },
            relations: {
                movies: (relations === true ? true : false)
            },
            select: {
                movies: {
                    id: true,
                    title: true,
                    releaseDate: true,
                    posterUrl: true
                }
            }
        });
        if (!category) {
            throw new common_1.NotFoundException(`La categoría con el Id ${id} no existe`);
        }
        return category;
    }
    async create(createCategoryDto, user_id, role) {
        if (role != user_entity_1.UserRoleEnum.ADMIN) {
            throw new common_1.ForbiddenException('Usted no está autorizado para crear categorías');
        }
        const existsCategory = await this.categoriesRepository.exists({
            where: {
                title: createCategoryDto.title
            }
        });
        if (existsCategory) {
            throw new common_1.ConflictException('El título ya está registrado');
        }
        return this.categoriesRepository.save({ ...createCategoryDto, createdBy: user_id });
    }
    async findAll(page = 1, limit = 10, relations = false) {
        const [data, total] = await this.categoriesRepository.findAndCount({
            skip: page > 0 ? (page - 1) * limit : 0,
            take: limit,
            select: {
                id: true,
                title: true,
                description: true,
                movies: {
                    id: true,
                    title: true,
                    releaseDate: true,
                    posterUrl: true
                }
            },
            relations: {
                movies: relations ? true : false
            }
        });
        return {
            data,
            total,
            page,
            limit,
        };
    }
    findOne(id, relations) {
        return this.findOneOrFail(id, relations);
    }
    async update(id, updateCategoryDto, user_id, role) {
        if (role != user_entity_1.UserRoleEnum.ADMIN) {
            throw new common_1.ForbiddenException('Usted no está autorizado para modificar categorías');
        }
        const category = await this.findOneOrFail(id);
        if (updateCategoryDto.title != null) {
            category.title = updateCategoryDto.title;
        }
        if (updateCategoryDto.description != null) {
            category.description = updateCategoryDto.description;
        }
        if (updateCategoryDto.enabled != null) {
            category.enabled = updateCategoryDto.enabled;
        }
        category.updatedBy = user_id;
        return this.categoriesRepository.save(category);
    }
    async remove(id, cascade, role) {
        if (role != user_entity_1.UserRoleEnum.ADMIN) {
            throw new common_1.ForbiddenException('Usted no está autorizado para eliminar categorías');
        }
        const category = await this.findOneOrFail(id);
        if (cascade) {
            await this.moviesRepository.delete({ category });
            return this.categoriesRepository.delete(id);
        }
        else {
            const countMovies = await this.moviesRepository.countBy({ categoryId: id });
            if (countMovies > 0) {
                throw new common_1.ConflictException({ message: `La categoría no se puede eliminar porque tiene ${countMovies} películas asociadas` });
            }
            else {
                return this.categoriesRepository.delete(id);
            }
        }
    }
    async findMovies(id) {
        const category = await this.findOneOrFail(id, true);
        return category.movies;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map