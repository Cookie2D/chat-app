import { IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      'Name must be at least 3 characters and contain only alphanumeric characters.',
  })
  name: string;

  @IsString()
  password: string;
}
