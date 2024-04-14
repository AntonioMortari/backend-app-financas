import { Joi, Segments, celebrate } from 'celebrate';

const storeUserValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()
    })
}, { abortEarly: false });

const destroyUserValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
});


export { storeUserValidation, destroyUserValidation };