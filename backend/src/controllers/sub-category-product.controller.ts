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
  SubCategory,
  Product,
} from '../models';
import {SubCategoryRepository} from '../repositories';

export class SubCategoryProductController {
  constructor(
    @repository(SubCategoryRepository) protected subCategoryRepository: SubCategoryRepository,
  ) { }

  @get('/sub-categories/{id}/products', {
    responses: {
      '200': {
        description: 'Array of SubCategory has many Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.subCategoryRepository.products(id).find(filter);
  }

  @post('/sub-categories/{id}/products', {
    responses: {
      '200': {
        description: 'SubCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SubCategory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInSubCategory',
            exclude: ['id'],
            optional: ['subCategoryId']
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.subCategoryRepository.products(id).create(product);
  }

  @patch('/sub-categories/{id}/products', {
    responses: {
      '200': {
        description: 'SubCategory.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.subCategoryRepository.products(id).patch(product, where);
  }

  @del('/sub-categories/{id}/products', {
    responses: {
      '200': {
        description: 'SubCategory.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.subCategoryRepository.products(id).delete(where);
  }
}
