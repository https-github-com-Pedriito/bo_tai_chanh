import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Category} from './category.model';
import {Product} from './product.model';

@model()
export class SubCategory extends Entity {
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

  @belongsTo(() => Category)
  categoryId: string;

  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<SubCategory>) {
    super(data);
  }
}

export interface SubCategoryRelations {
  // describe navigational properties here
}

export type SubCategoryWithRelations = SubCategory & SubCategoryRelations;
