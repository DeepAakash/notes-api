import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/register-user.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/DTO/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService){

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

    async loginUser(UserLoginDTO: UserLoginDto){
        // console.log(UserLoginDTO);
        const{username, password} = UserLoginDTO;
        const user = await this.repo.findOneBy({username: username});
        if(!user){
            throw new UnauthorizedException('Oops! Invalid Credentials!');
        }
        const salt = user.salt;
        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if(isPasswordMatch){
            // return {message: 'Login Successful'};
            const jwtPayload={username};
            const jwtToken=await this.jwt.signAsync(jwtPayload, {expiresIn: '1d', algorithm: 'HS512'});
            return {token:jwtToken};
        }else{
            throw new UnauthorizedException('Oops! Invalid Credentials!');
        }
    }
}
