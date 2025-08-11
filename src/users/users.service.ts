import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    //email unico
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email já cadastrado');
    }

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

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async save(user: User) {
    return this.usersRepository.save(user);
  }

  async findById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }
}
