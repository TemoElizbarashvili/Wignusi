/* tslint:disable */
/* eslint-disable */
import { BookQuantity } from '../models/book-quantity';
export interface OrderRm {
  books?: null | Array<BookQuantity>;
  details?: null | string;
  email?: null | string;
  name?: null | string;
  orderId?: number;
  phone?: null | string;
  status?: null | string;
  total?: number;
}
