import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTodoDto {

  id: number;
  title: string;
  description: string;
  status: boolean;
}