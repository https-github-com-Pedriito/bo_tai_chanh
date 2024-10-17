import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Category,
  SubCategory,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategorySubCategoryController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/sub-categories', {
    responses: {
      '200': {
        description: 'Array of Category has many SubCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SubCategory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SubCategory>,
  ): Promise<SubCategory[]> {
    return this.categoryRepository.subCategories(id).find(filter);
  }

  @post('/categories/{id}/sub-categories', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(SubCategory)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubCategory, {
            title: 'NewSubCategoryInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) subCategory: Omit<SubCategory, 'id'>,
  ): Promise<SubCategory> {
    return this.categoryRepository.subCategories(id).create(subCategory);
  }

  @patch('/categories/{id}/sub-categories', {
    responses: {
      '200': {
        description: 'Category.SubCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubCategory, {partial: true}),
        },
      },
    })
    subCategory: Partial<SubCategory>,
    @param.query.object('where', getWhereSchemaFor(SubCategory)) where?: Where<SubCategory>,
  ): Promise<Count> {
    return this.categoryRepository.subCategories(id).patch(subCategory, where);
  }

  @del('/categories/{id}/sub-categories', {
    responses: {
      '200': {
        description: 'Category.SubCategory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SubCategory)) where?: Where<SubCategory>,
  ): Promise<Count> {
    return this.categoryRepository.subCategories(id).delete(where);
  }
}
