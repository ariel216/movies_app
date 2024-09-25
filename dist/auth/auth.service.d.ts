import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private configService;
    private jwtService;
    private usersRepository;
    constructor(configService: ConfigService, jwtService: JwtService, usersRepository: Repository<User>);
    register(createUserDto: CreateUserDto): Promise<any>;
    createToken(loginDto: LoginDto): Promise<any>;
    verifyToken(token: string): any;
}
