import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class SignupPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, _metadata: ArgumentMetadata) {
    const errors: string[] = [];
    if (!this.valueHasPassAndConfPass(value)) {
      throw new BadRequestException('Invalid Request Body');
    }

    if (value.password.length < 12) {
      errors.push('password should be at least 12 characters long');
    }
    if (value.password !== value.confirmationPassword) {
      errors.push('password and confirmationPassword do not match');
    }
    if (errors.length) {
      throw new BadRequestException(errors.join('\n'));
    }
    return value;
  }

  private valueHasPassAndConfPass(val: unknown): val is SignupDto {
    return (
      typeof val === 'object' &&
      'password' in val &&
      'confirmationPassword' in val
    );
  }
}
