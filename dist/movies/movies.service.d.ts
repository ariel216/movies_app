import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Category } from 'src/categories/entities/category.entity';
import { UserRoleEnum } from 'src/users/entities/user.entity';
export declare class MoviesService {
    private moviesRepository;
    private categoriesRepository;
    constructor(moviesRepository: Repository<Movie>, categoriesRepository: Repository<Category>);
    private findOneOrFail;
    create(createMovieDto: CreateMovieDto, user_id: number, role: UserRoleEnum): Promise<Movie>;
    findAll(page?: number, limit?: number, relations?: boolean): Promise<{
        data: Movie[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, relations: boolean): Promise<Movie>;
    update(id: number, updateMovieDto: UpdateMovieDto, user_id: number, role: UserRoleEnum): Promise<Movie>;
    remove(id: number, role: UserRoleEnum): Promise<import("typeorm").DeleteResult>;
    findCategory(id: number): Promise<Category>;
}
