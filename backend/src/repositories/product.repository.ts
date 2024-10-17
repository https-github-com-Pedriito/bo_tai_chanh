import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Product, ProductRelations, SubCategory} from '../models';
import {SubCategoryRepository} from './sub-category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly subCategory: BelongsToAccessor<SubCategory, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SubCategoryRepository') protected subCategoryRepositoryGetter: Getter<SubCategoryRepository>,
  ) {
    super(Product, dataSource);
    this.subCategory = this.createBelongsToAccessorFor('subCategory', subCategoryRepositoryGetter,);
    this.registerInclusionResolver('subCategory', this.subCategory.inclusionResolver);
  }
}
