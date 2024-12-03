import { IsString } from 'class-validator';

export default class IdSchema {
  @IsString() // TODO: Add UUID validation
    id: string;

  constructor(id: string) {
    this.id = id;
  }
}
