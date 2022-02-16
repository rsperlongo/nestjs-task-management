/* eslint-disable prettier/prettier */
import { UserRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      @InjectRepository(UserRepository)
        private userRepository: UserRepository,
      ) {
          super(({
              secretOrKey: 'topSecret51',
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          }))
      }
}
