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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMovieDto = void 0;
const class_validator_1 = require("class-validator");
class CreateMovieDto {
}
exports.CreateMovieDto = CreateMovieDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Título no puede estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'Título debe ser una cadena de texto' }),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Sinopsis no puede estar vacía' }),
    (0, class_validator_1.IsString)({ message: 'Sinopsis debe ser una cadena de texto' }),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "synopsis", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Director no puede estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'Director debe ser una cadena de texto' }),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "director", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Fecha de estreno debe ser de tipo fecha YYYY-MM-DD' }),
    __metadata("design:type", Date)
], CreateMovieDto.prototype, "releaseDate", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'La URL de la imagen debe tener formato URI' }),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "posterUrl", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Valoración debe ser un valor numérico' }),
    (0, class_validator_1.Min)(0.0),
    (0, class_validator_1.Max)(10.0),
    __metadata("design:type", Number)
], CreateMovieDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "Id de Categoría debe ser un valor numérico" }),
    (0, class_validator_1.IsPositive)({ message: "Id de Categoría debe ser un número entero positivo" }),
    __metadata("design:type", Number)
], CreateMovieDto.prototype, "categoryId", void 0);
//# sourceMappingURL=create-movie.dto.js.map