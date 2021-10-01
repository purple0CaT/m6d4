import Cart from "./cart.js";
import Category from "./category.js";
import ProductCateg from "./prodCategor.js";
import Product from "./products.js";
import Review from "./reviews.js";
import User from "./user.js";

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

// Product.hasMany(Category);
Product.belongsToMany(Category, {
  through: { model: ProductCateg, unique: false },
});
Category.belongsToMany(Product, {
  through: { model: ProductCateg, unique: false },
});
// CARTS
Product.belongsToMany(User, { through: { model: Cart, unique: false } });
User.belongsToMany(Product, { through: { model: Cart, unique: false } });

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

export default { Product, Review, User, Category, ProductCateg, Cart };
