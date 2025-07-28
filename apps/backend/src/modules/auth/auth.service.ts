import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface CreateUserDto {
  username: string;
  password: string;
}

interface LoginUserDto extends CreateUserDto {}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (!user || !(await user.comparePassword(loginUserDto.password))) {
      throw new UnauthorizedException();
    }
    return this.jwtService.sign({ id: user.id });
  }
}
