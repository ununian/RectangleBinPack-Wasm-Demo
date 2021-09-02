export interface ResponseDto<T = any> {
  Error?: { Code: number; Message: string };
  Data?: T;
}
