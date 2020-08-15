import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';

export class ErrorBase {
    @IsBoolean()
    @IsNotEmpty()
    success: boolean;

    @IsString()
    @IsNotEmpty()
    resultInfo: string;
}
