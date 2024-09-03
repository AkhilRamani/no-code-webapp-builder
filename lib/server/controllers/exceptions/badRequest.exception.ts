export class BadRequestException extends Error {
    code: number;
    constructor(message: string = 'Bad Request') {
        super(message)
        this.name = 'BadRequestException'
        this.code = 400
    }
}