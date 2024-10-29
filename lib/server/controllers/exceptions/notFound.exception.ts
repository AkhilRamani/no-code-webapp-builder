export class NotFoundException extends Error {
    code: number;
    constructor(message: string = 'Not Found') {
        super(message)
        this.name = 'NotFoundException'
        this.code = 404
    }
}