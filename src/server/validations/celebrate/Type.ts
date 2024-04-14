import { Joi, Segments, celebrate } from 'celebrate';


const storeTypeValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2).required(),
    })
}, { abortEarly: false });

export { storeTypeValidation };