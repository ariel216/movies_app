import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from 'src/users/entities/user.entity';
export declare class CategoriesService {
    private categoriesRepository;
    private moviesRepository;
    constructor(categoriesRepository: Repository<Category>, moviesRepository: Repository<Movie>);
    private findOneOrFail;
    create(createCategoryDto: CreateCategoryDto, user_id: number, role: UserRoleEnum): Promise<Category>;
    findAll(page?: number, limit?: number, relations?: boolean): Promise<{
        data: Category[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, relations: boolean): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto, user_id: number, role: UserRoleEnum): Promise<Category>;
    remove(id: number, cascade: boolean, role: UserRoleEnum): Promise<import("typeorm").DeleteResult>;
    findMovies(id: number): Promise<Movie[]>;
}
