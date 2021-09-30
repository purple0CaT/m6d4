import Product from "./products.js";
import Review from "./reviews.js";
import User from "./user.js";

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

export default { Product, Review, User };
