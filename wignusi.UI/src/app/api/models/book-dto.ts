/* tslint:disable */
/* eslint-disable */
import { AuthorDto } from '../models/author-dto';
export interface BookDto {
  authors?: null | Array<AuthorDto>;
  authorsIds?: null | Array<number>;
  description?: null | string;
  image?: null | string;
  isAvialable?: boolean;
  price?: number;
  published?: string;
  publisher?: null | string;
  tags?: null | Array<string>;
  title?: null | string;
}
