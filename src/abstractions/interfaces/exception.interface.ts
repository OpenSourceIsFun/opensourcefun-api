import { HttpStatus } from '@nestjs/common';
import { ExceptionTypeEnum } from 'abstractions/enums';
import { ValidationError } from 'abstractions/types';

export interface IException {
  code: HttpStatus;
  type: ExceptionTypeEnum;
  message: string;

  metadata?: Record<string, string>;
  validationErrors?: ValidationError;
}
