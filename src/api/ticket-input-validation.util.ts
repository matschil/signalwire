import Ajv from 'ajv';
import { JSONSchema6Definition } from 'json-schema';

const ajv = new Ajv({
  allErrors: true,
});

export function isTicketInputValObjOrThrow(
  inputCandidate: any,
): asserts inputCandidate is any {
  const schema: { [k: string]: JSONSchema6Definition } = {
    userId: { type: 'number' },
    title: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' }, maxLength: 4 },
  };

  const validate = ajv.compile({
    properties: schema,
    required: ['userId', 'title'],
  });

  const isValid = validate(inputCandidate);
  if (!isValid) {
    const validationErrors = validate.errors || [];
    throw new Error(
      JSON.stringify({
        errorPrefix: 'validateTicketInputValObjs',
        row: inputCandidate,
        validationErrors,
        errorText: ajv.errorsText(validationErrors),
      }),
    );
  }
}
