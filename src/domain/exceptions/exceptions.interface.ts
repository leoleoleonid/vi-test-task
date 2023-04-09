export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export const I_EXCEPTION_TOKEN = 'I_EXCEPTION_TOKEN';

export interface IException {
  badRequestException(data: IFormatExceptionMessage): void;
  notFoundException(data: IFormatExceptionMessage | string): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  UnauthorizedException(data?: IFormatExceptionMessage): void;
}
