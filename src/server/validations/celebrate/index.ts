import { Joi, Segments, celebrate } from 'celebrate';

const byIdValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
});

export { byIdValidation };