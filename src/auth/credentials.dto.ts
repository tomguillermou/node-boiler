import { IsString } from 'class-validator'

export class CredentialsDto {
  @IsString()
  public readonly email!: string

  @IsString()
  public readonly password!: string
}
