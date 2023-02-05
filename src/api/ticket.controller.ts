import { Body, Controller, Get, Post } from '@nestjs/common';
import Ajv from 'ajv';
import { JSONSchema6Definition } from 'json-schema';


@Controller("ticket")
export class TicketsController {
  constructor() {}

  @Get()
  async getTicketsByUserId(): Promise<string> {
    return '';
  }

  @Post()
  async postHello(@Body() ticketInput: any): Promise<string> {
    return '';
  }
}

/**
 * const ajv = new Ajv({
  allErrors: true,
});

export interface RowValidationSchema {
  [k: string]: JSONSchema6Definition;
}

export function getRowValidator(
  properties: RowValidationSchema,
  { errorPrefix }: { errorPrefix?: string } = {},
): (rowCanidate: any) => true {
  const validate = ajv.compile({
    properties,
    required: Object.keys(properties),
  });

  return (rowCandidate: any) => {
    const isValid = validate(rowCandidate);
    if (!isValid) {
      const validationErrors = validate.errors || [];
      throw new DatabaseRowValidationException({
        errorPrefix,
        row: rowCandidate,
        validationErrors,
        errorText: ajv.errorsText(validationErrors),
      });
    }
    return true;
  };
}

interface RowsValidatorInput {
  errorPrefix: string;
}

export function getRowsValidator(
  properties: RowValidationSchema,
  { errorPrefix }: RowsValidatorInput,
): (rowCanidate: any) => true {
  const validateRowOrThrow = getRowValidator(properties, { errorPrefix });

  return (rowCandidates: any) => {
    if (!Array.isArray(rowCandidates)) {
      throw new DatabaseRowValidationException({
        errorPrefix,
        row: rowCandidates,
        validationErrors: [],
        errorText: `Expected array of rows, but got ${typeof rowCandidates}`,
      });
    }

    rowCandidates.every((rowCandidate) => validateRowOrThrow(rowCandidate));
    return true;
  };
}


export const FileRowValObjValidationSchema: RowValidationSchema = {
  createdAt: { type: ['string', 'object', 'null'], format: 'date-time' },
  extension: { type: ['string', 'null'] },
  key: { type: 'string' },
  mimetype: { type: 'string' },
  name: { type: 'string' },
  size: { type: 'number' },
  thumbnailId: { type: ['number', 'null'] },
};

const validateFileRowValObjs = getRowsValidator(FileRowValObjValidationSchema, {
  errorPrefix: 'validateFileRowValObjs',
});
export function isFileRowValObjsOrThrow(candidates: any): asserts candidates is FileRowValObj[] {
  validateFileRowValObjs(candidates);
}

 */
