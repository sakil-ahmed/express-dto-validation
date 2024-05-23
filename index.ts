import {Request, Response, NextFunction} from "express";
import {AnyZodObject, ZodError} from 'zod'

/**
 * Validate your express js app request body as you need just you can pass a zod schema .
 *
 +  * @param accept AnyZodSchema.
 +  * @returns error object by fields.
 + * error Object
 {
 "success": false,
 "error": {
 "email": "Required",
 "password": "Required"
 }
 }
 */

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