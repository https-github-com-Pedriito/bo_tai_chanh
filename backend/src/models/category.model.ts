import {Entity, model, property, hasMany} from '@loopback/repository';
import {SubCategory} from './sub-category.model';

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @hasMany(() => SubCategory)
  subCategories: SubCategory[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
