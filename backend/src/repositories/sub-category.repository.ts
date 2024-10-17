import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SubCategory, SubCategoryRelations, Category, Product} from '../models';
import {CategoryRepository} from './category.repository';
import {ProductRepository} from './product.repository';

export class SubCategoryRepository extends DefaultCrudRepository<
  SubCategory,
  typeof SubCategory.prototype.id,
  SubCategoryRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof SubCategory.prototype.id>;

  public readonly products: HasManyRepositoryFactory<Product, typeof SubCategory.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(SubCategory, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
