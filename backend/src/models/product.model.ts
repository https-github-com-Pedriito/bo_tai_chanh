import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SubCategory} from './sub-category.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'string',
  })
  imageUrl?: string;

  @property({
    type: 'string',
  })
  Description?: string;

  @property({
    type: 'string',
  })
  options?: string;

  @belongsTo(() => SubCategory)
  subCategoryId: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
