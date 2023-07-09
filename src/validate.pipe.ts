import { ValidationOptions, ValidationError } from 'class-validator';

export interface ValidationPipeOptions extends ValidationOptions {
  transform?: boolean;
  disableErrorMessage?: boolean;
  exceptionFacory?: (errors: ValidationError[]) => any;
}