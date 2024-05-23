import {Request, Response, NextFunction} from "express";
import {AnyZodObject, ZodError} from 'zod'

export const testFunction = () => {
    console.log('Jsr test package')
}

/** this function use as a route label middleware  */
export const validateDto = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next()
    } catch (error: any) {
        if (error instanceof ZodError) {
            const errorsByField: { [x: string]: string } = {};

            for (const issue of error.errors) {
                const {path, message} = issue;
                const field = path.length === 1 ? path[0] : path.join(".");
                errorsByField[field] = message;
            }
            res.status(400).send({
                success: false,
                error: errorsByField,

            });
        } else {
            res.status(500).json({
                message: 'Internal Server Error',
            })
        }

    }

}