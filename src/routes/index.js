const { Router } = require("express");
const router = Router();

// Controller
const {
  renderProduct,
  renderProducts,
} = require("../controllers/products.controller");

// Routes
router.get("/", renderProducts);
router.get("/product/:uri", renderProduct);

module.exports = router;
