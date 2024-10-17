import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SubCategory,
  Category,
} from '../models';
import {SubCategoryRepository} from '../repositories';

export class SubCategoryCategoryController {
  constructor(
    @repository(SubCategoryRepository)
    public subCategoryRepository: SubCategoryRepository,
  ) { }

  @get('/sub-categories/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to SubCategory',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof SubCategory.prototype.id,
  ): Promise<Category> {
    return this.subCategoryRepository.category(id);
  }
}
