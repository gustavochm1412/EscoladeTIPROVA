import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePerifericoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}

export class UpdatePerifericoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}

export class CreateComputadorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cor: string;

  @IsNumber()
  dataFabricacao: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePerifericoDto)
  perifericos?: CreatePerifericoDto[];
}

export class UpdateComputadorDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cor?: string;

  @IsOptional()
  @IsNumber()
  dataFabricacao?: number;
}

