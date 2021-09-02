export interface PackResultDto {
  svg: string;
  width: number;
  height: number;
  rects: Array<{ x: number; y: number; width: number; height: number }>
}
