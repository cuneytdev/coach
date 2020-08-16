import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';

export class ErrorBase {
    @IsBoolean()
    @IsNotEmpty()
    success: boolean;

    @IsString()
    resultInfo: string;

    error: any;
}
