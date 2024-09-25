import { Response } from 'express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(createMovieDto: CreateMovieDto, request: any): Promise<import("./entities/movie.entity").Movie>;
    findAll(page: number, limit: number, relations: boolean): Promise<{
        data: import("./entities/movie.entity").Movie[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, relations: boolean): Promise<import("./entities/movie.entity").Movie>;
    update(id: string, updateMovieDto: UpdateMovieDto, request: any): Promise<import("./entities/movie.entity").Movie>;
    remove(id: number, response: Response, request: any): Promise<void>;
    findCategory(id: number): Promise<import("../categories/entities/category.entity").Category>;
}
