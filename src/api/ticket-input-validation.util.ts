import Ajv from 'ajv';
import { JSONSchema6Definition } from 'json-schema';
import { TicketInput } from 'src/model/input/ticket-input';

const ajv = new Ajv({
  allErrors: true,
});

export function isTicketInputValObjOrThrow(
  inputCandidate: any,
): asserts inputCandidate is TicketInput {
  const schema: { [k: string]: JSONSchema6Definition } = {
    user_id: { type: 'number' },
    title: { type: 'string', minLength: 1 },
    tags: { type: 'array', items: { type: 'string' }, maxItems: 4 },
  };

  const validate = ajv.compile({
    properties: schema,
    required: ['user_id', 'title'],
  });

  const isValid = validate(inputCandidate);
  if (!isValid) {
    const validationErrors = validate.errors || [];
    const firstValidationError = validationErrors[0];
    if(firstValidationError){
      throw new Error(
        `Invalid input: ${firstValidationError.instancePath + ": "+ firstValidationError.message}`,
      );
    }else{
      throw new Error(
        `Invalid input: ${JSON.stringify(inputCandidate)}`,
      );
    } 
  }
}
