import {IsBoolean, IsNotEmpty} from 'class-validator';

export class Base<T> {
    @IsBoolean()
    @IsNotEmpty()
    success: boolean;

    @IsNotEmpty()
    result: any;
}


