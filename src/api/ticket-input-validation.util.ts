import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import Ajv from 'ajv';
import { JSONSchema6Definition } from 'json-schema';

const ajv = new Ajv({
  allErrors: true,
});

export interface InputValidationSchema {
  [k: string]: JSONSchema6Definition;
}


export const TicketInputValObjValidationSchema: InputValidationSchema = {
  userId: { type: 'number' },
  title: { type: 'string' },
  tags: { type: 'array', items: { type: 'string' }, maxLength: 4 },
};





