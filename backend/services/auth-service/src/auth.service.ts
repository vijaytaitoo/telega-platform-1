import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@telega/database';
import * as crypto from 'crypto';
import { TelegramAuthDto } from './dto/telegram-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateTelegramAuth(authDto: TelegramAuthDto): Promise<any> {
    // Проверяем подпись данных от Telegram
    const checkString = Object.keys(authDto)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${authDto[key]}`)
      .join('\n');

    const secretKey = crypto
      .createHash('sha256')
      .update(process.env.TELEGRAM_BOT_TOKEN)
      .digest();

    const hash = crypto
      .createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');

    if (hash !== authDto.hash) {
      throw new UnauthorizedException('Invalid Telegram authentication');
    }

    // Ищем или создаем пользователя
    let user = await this.userRepository.findOne({
      where: { telegramId: authDto.id },
    });

    if (!user) {
      user = this.userRepository.create({
        telegramId: authDto.id,
        username: authDto.username,
        firstName: authDto.first_name,
        lastName: authDto.last_name,
      });
      await this.userRepository.save(user);
    }

    return this.generateToken(user);
  }

  async generateToken(user: User): Promise<{ accessToken: string }> {
    const payload = {
      sub: user.id,
      telegramId: user.telegramId,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: any): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
