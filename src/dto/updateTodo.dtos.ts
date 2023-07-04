import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateTodoDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  status: boolean;
}