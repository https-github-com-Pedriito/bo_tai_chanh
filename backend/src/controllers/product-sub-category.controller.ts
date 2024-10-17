import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  SubCategory,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductSubCategoryController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/sub-category', {
    responses: {
      '200': {
        description: 'SubCategory belonging to Product',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SubCategory),
          },
        },
      },
    },
  })
  async getSubCategory(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<SubCategory> {
    return this.productRepository.subCategory(id);
  }
}
