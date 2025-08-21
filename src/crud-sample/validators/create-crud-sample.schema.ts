import * as Joi from 'joi';

export const CreateCrudSampleSchema = Joi.object({
	testField1: Joi.string().required().messages({
		'any.required': 'testField1 is required',
		'string.base': 'testField1 must be a string',
	}),
	testField2: Joi.number().required().messages({
		'any.required': 'testField2 is required',
		'number.base': 'testField2 must be a number',
	}),
	testField3: Joi.boolean().required().messages({
		'any.required': 'testField3 is required',
		'number.base': 'testField2 must be a boolean',
	}),
});
