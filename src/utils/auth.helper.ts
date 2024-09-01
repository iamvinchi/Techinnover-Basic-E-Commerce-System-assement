import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, forwardRef } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { User } from 'src/api/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

export class Authutil {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async getToken(user: User) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return this.jwtService.sign(payload);
    }

    async hash(text: string) {
        return bcrypt.hashSync(text, bcrypt.genSaltSync());
    };

    async compare(text: string, hashedText: string) {
        return bcrypt.compareSync(text, hashedText);
    };

}