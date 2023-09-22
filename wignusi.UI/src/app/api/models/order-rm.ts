/* tslint:disable */
/* eslint-disable */
import { BookQuantity } from '../models/book-quantity';
export interface OrderRm {
  books?: null | Array<BookQuantity>;
  details?: null | string;
  name?: null | string;
  orderId?: number;
  status?: null | string;
  total?: number;
}
