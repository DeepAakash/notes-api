import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/register-user.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>){

    }

    async registerUser(registerDTO: RegisterUserDto){
        const {username, password} = registerDTO;
        const salt = await bcrypt.genSaltSync(12);
        const hashed: string = await bcrypt.hashSync(password, salt);
        // console.log(hashed);
        // console.log(salt);

        const user:UserEntity = new UserEntity()
        user.username=username;
        user.password=hashed;
        user.salt=salt;
        this.repo.create(user);
        try{
            return await this.repo.save(user)
        } catch(err){
            throw new InternalServerErrorException('Oops! Something went wrong! User not created.');
        }
    }
}
