import {z} from 'zod'

export const registerSchema = z.object({
username: z.string({
    required_error: 'Usuario requerido'
}),
email: z.string({
    required_error: 'Email requerido'
}).email({
    message: 'Invalid email'
}),
password: z.string({
    required_error: 'Password required'
}).min(6,{
    message: 'La contraseña debe tener al menos 6 caracteres'
}),
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email necesario'
    }).email({
        message: "Email invalido"
    }),
    password: z.string({
        required_error: 'Password necesaria'
    }).min(6,{
        message: 'Debe tener al menos 6 caracteres'
    }),
}) 

