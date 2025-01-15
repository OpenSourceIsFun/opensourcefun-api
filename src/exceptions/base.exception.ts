import { HttpException } from '@nestjs/common';
import { IException } from 'abstractions/interfaces';
import { ExceptionTypeEnum } from 'abstractions/enums';
import { ValidationError } from 'abstractions/types';

class BaseException extends HttpException implements IException {
  public code: number;

  public type: ExceptionTypeEnum;

  public message: string;

  public metadata?: any;

  public validationErrors?: ValidationError;

  constructor(
    code: number,
    type: ExceptionTypeEnum,
    message: string,
    metadata?: any,
    validationErrors?: ValidationError
  ) {
    super(message, code);

    this.code = code;
    this.type = type;
    this.message = message;
    this.metadata = metadata;
    this.validationErrors = validationErrors;
  }
}

export default BaseException;
