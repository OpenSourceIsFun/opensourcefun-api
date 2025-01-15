import {
  Injectable,
  ValidationPipe as NestValidationPipe
} from '@nestjs/common';
import { ValidationError as NativeValidationError } from 'class-validator';
import { ValidationError } from 'abstractions/types';
import { ValidationException } from 'exceptions';

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: false,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (validationErrors: NativeValidationError[] = []) => {
        return new ValidationException(this.buildError(validationErrors));
      }
    });
  }

  private buildError(errors: NativeValidationError[]): ValidationError {
    const result: ValidationError = {};

    errors.forEach((el) => {
      const prop = el.property;

      if (el.constraints) {
        result[prop] = Object.values(el.constraints);
      } else if (el.children) {
        result[prop] = this.buildError(el.children);
      }
    });

    return result;
  }
}
