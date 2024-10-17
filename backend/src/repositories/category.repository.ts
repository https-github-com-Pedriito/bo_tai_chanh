import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Category, CategoryRelations, SubCategory} from '../models';
import {SubCategoryRepository} from './sub-category.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly subCategories: HasManyRepositoryFactory<SubCategory, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SubCategoryRepository') protected subCategoryRepositoryGetter: Getter<SubCategoryRepository>,
  ) {
    super(Category, dataSource);
    this.subCategories = this.createHasManyRepositoryFactoryFor('subCategories', subCategoryRepositoryGetter,);
    this.registerInclusionResolver('subCategories', this.subCategories.inclusionResolver);
  }
}
