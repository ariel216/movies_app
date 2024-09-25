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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movie_entity_1 = require("./entities/movie.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const user_entity_1 = require("../users/entities/user.entity");
let MoviesService = class MoviesService {
    constructor(moviesRepository, categoriesRepository) {
        this.moviesRepository = moviesRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async findOneOrFail(id, relations = false) {
        const movie = await this.moviesRepository.findOne({
            where: { id: id },
            relations: {
                category: relations ? true : false
            },
            select: {
                category: {
                    id: true,
                    title: true
                }
            }
        });
        if (!movie) {
            throw new common_1.NotFoundException(`La película con el Id ${id} no existe`);
        }
        return movie;
    }
    async create(createMovieDto, user_id, role) {
        if (role != user_entity_1.UserRoleEnum.ADMIN) {
            throw new common_1.ForbiddenException('Usted no está autorizado para crear películas');
        }
        const existsMovie = await this.moviesRepository.exists({
            where: {
                title: createMovieDto.title
            }
        });
        if (existsMovie) {
            throw new common_1.ConflictException('El título ya está registrado');
        }
        const existsCategory = await this.categoriesRepository.exists({
            where: {
                id: createMovieDto.categoryId
            }
        });
        if (!existsCategory) {
            throw new common_1.ConflictException('La categoría no existe');
        }
        return this.moviesRepository.save({ ...createMovieDto, createdBy: user_id });
    }
    async findAll(page = 1, limit = 10, relations = false) {
        const [data, total] = await this.moviesRepository.findAndCount({
            skip: page > 0 ? (page - 1) * limit : 0,
            take: limit,
            select: {
                id: true,
                title: true,
                director: true,
                releaseDate: true,
                posterUrl: true,
                category: {
                    id: true,
                    title: true,
                }
            },
            relations: {
                category: relations ? true : false
            }
        });
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async findOne(id, relations) {
        return this.findOneOrFail(id, relations);
    }
    async update(id, updateMovieDto, user_id, role) {
        if (role != user_entity_1.UserRoleEnum.ADMIN) {
            throw new common_1.ForbiddenException('Usted no está autorizado para modificar películas');
        }
        const movie = await this.findOneOrFail(id);
        if (updateMovieDto.title != null) {
            movie.title = updateMovieDto.title;
        }
        if (updateMovieDto.synopsis != null) {
            movie.synopsis = updateMovieDto.synopsis;
        }
        if (updateMovieDto.director != null) {
            movie.director = updateMovieDto.director;
        }
        if (updateMovieDto.releaseDate != null) {
            movie.releaseDate = updateMovieDto.releaseDate;
        }
        if (updateMovieDto.posterUrl != null) {
            movie.posterUrl = updateMovieDto.posterUrl;
        }
        if (updateMovieDto.rating != null) {
            movie.rating = updateMovieDto.rating;
        }
        if (updateMovieDto.categoryId != null) {
            const existsCategory = await this.categoriesRepository.exists({
                where: {
                    id: updateMovieDto.categoryId
                }
            });
            if (!existsCategory) {
                throw new common_1.ConflictException('La categoría no existe');
            }
            movie.categoryId = updateMovieDto.categoryId;
        }
        movie.updatedBy = user_id;
        return this.moviesRepository.save(movie);
    }
    async remove(id, role) {
        if (role != user_entity_1.UserRoleEnum.ADMIN) {
            throw new common_1.ForbiddenException('Usted no está autorizado para eliminar películas');
        }
        const movie = await this.findOneOrFail(id);
        return this.moviesRepository.delete(id);
    }
    async findCategory(id) {
        const movie = await this.findOneOrFail(id, true);
        return movie.category;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map