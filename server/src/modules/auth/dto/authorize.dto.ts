import { IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class AuthorizeDto {
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      'Name must be at least 3 characters and contain only alphanumeric characters.',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @IsString()
  password: string;
}
