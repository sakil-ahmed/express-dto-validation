/**

* @module
*
* This function use as a route label middleware and this function takes AnyZodSchema
*


  * ``` 
     import { validateDto } from "@sa/express-dto-validation";

* this function use as route middleware before request handler middleware


* ```
  export const loginDto = z.object({
  email: z.string().min(1, 'email should not be empty').email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
    })
  
* how to use this
  
* ```
  (middleware , validateDto(AnyZodSchema) , middleware)=> {}

* return error message  
* ```
  {
    "success": false,
    "error": {
        "email": "Required",
        "password": "Required"
    }
  }
*/