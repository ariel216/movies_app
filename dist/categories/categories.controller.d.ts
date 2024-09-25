import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto, request: any): Promise<import("./entities/category.entity").Category>;
    findAll(page: number, limit: number, relations: boolean): Promise<{
        data: import("./entities/category.entity").Category[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, relations: boolean): Promise<import("./entities/category.entity").Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto, request: any): Promise<import("./entities/category.entity").Category>;
    remove(id: number, cascade: boolean, response: Response, request: any): Promise<void>;
    findMovies(id: number): Promise<import("../movies/entities/movie.entity").Movie[]>;
}
