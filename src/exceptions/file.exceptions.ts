import { HttpStatus } from '@nestjs/common';
import { ExceptionTypeEnum } from 'abstractions/enums';
import BaseException from './base.exception';

export class IncorrectFileException extends BaseException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      ExceptionTypeEnum.IncorrectFile,
      'Incorrect file'
    );
  }
}

export class FileProcessingFailureException extends BaseException {
  constructor() {
    super(
      HttpStatus.BAD_REQUEST,
      ExceptionTypeEnum.FileProcessingFailure,
      'File processing failure'
    );
  }
}
