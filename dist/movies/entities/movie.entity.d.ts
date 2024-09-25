import { Category } from "src/categories/entities/category.entity";
export declare class Movie {
    id: number;
    title: string;
    synopsis: string;
    director: string;
    releaseDate: Date;
    posterUrl: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
    categoryId: number;
    category: Category;
}
