import { Movie } from "src/movies/entities/movie.entity";
export declare class Category {
    id: number;
    title: string;
    description: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
    createdBy: number;
    updatedBy: number;
    movies: Movie[];
}
