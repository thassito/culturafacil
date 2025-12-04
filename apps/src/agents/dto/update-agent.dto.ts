import { IsString, IsOptional, IsEnum } from 'class-validator';

enum AgentType {
  individual = 'individual',
  collective = 'collective',
  organization = 'organization',
}

export class UpdateAgentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(AgentType)
  @IsOptional()
  type?: AgentType;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  website?: string;
}
