import { IsString } from 'class-validator';

export default class IdSchema {
  @IsString() // TODO: Add UUID validation
    id: string;

  constructor(params: { id: string; }) {
    this.id = params.id;
  }
}
