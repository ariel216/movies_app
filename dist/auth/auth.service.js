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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(configService, jwtService, usersRepository) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async register(createUserDto) {
        const existingUser = await this.usersRepository.exists({
            where: [
                { login: createUserDto.login },
                { email: createUserDto.email },
            ],
        });
        if (existingUser) {
            throw new common_1.UnprocessableEntityException('Ya existe un usuario con el mismo login o contraseña. Por favor, intente con otro.');
        }
        const hashedPassword = await bcrypt.hash(this.configService.get('ENCRYPTION_KEY') + createUserDto.password, 10);
        const newUser = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            enabled: true
        });
        return this.usersRepository.save(newUser);
    }
    async createToken(loginDto) {
        const user = await this.usersRepository.findOne({
            select: {
                id: true,
                login: true,
                role: true,
                password: true,
                fullname: true,
                email: true,
                phone: true
            },
            where: {
                login: loginDto.login
            }
        });
        if (user) {
            const isPasswordMatch = await bcrypt.compare(this.configService.get('ENCRYPTION_KEY') + loginDto.password, user.password);
            if (isPasswordMatch) {
                const payload = {
                    sub: user.id,
                    login: user.login,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                };
                return {
                    'access_token': this.jwtService.sign(payload, {
                        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
                    })
                };
            }
        }
        throw new common_1.UnauthorizedException('El login o contraseña no son válidos');
    }
    verifyToken(token) {
        try {
            return this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token ha expirado');
            }
            else if (error.name === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('Token inválido');
            }
            else {
                throw new common_1.UnauthorizedException('La validación del token ha fallado');
            }
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map