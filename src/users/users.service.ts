import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //email unico
    await this.failIfEmailExists(createUserDto.email);

    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );

    const newUser: CreateUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    };

    const createdUser = await this.usersRepository.save(newUser);

    return createdUser;
  }

  async failIfEmailExists(email: string) {
    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('Email já cadastrado');
    }
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async findById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByOrFail(userData: Partial<User>) {
    const user = await this.usersRepository.findOneBy(userData);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async save(user: User) {
    return this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!dto.email && !dto.name) {
      throw new BadRequestException('Preencher pelo menos um campo');
    }

    const user = await this.findOneByOrFail({ id });
    user.name = dto.name ?? user.name;
    if (dto.email && dto.email !== user.email) {
      await this.failIfEmailExists(dto.email);
      user.email = dto.email;
      user.forceLogout = true;
    }
    return this.save(user);
  }
}
