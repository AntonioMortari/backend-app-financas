import { Joi, Segments, celebrate } from 'celebrate';


const storeRecordValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        value: Joi.number().required(),
        typeId: Joi.number().required()
    })
}, { abortEarly: false });

const editRecordValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        value: Joi.number().optional(),
        typeId: Joi.number().optional(),
        data: Joi.date().optional()
    })
}, { abortEarly: false });

export { storeRecordValidation, editRecordValidation };