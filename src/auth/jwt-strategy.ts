/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private configService: ConfigService,
      ) {
          super(({
              secretOrKey: configService.get('JWT_SERVICE'),
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          }))
  }
    
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
