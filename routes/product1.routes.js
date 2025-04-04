const express = require("express");
const route = express.Router();
const {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product1.controller");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products with pagination, filtering, and sorting
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default is 1)
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Number of products per page (default is 10)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter products by name
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [id, name, price, color]
 *         description: Column to sort by (default is id)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sorting order (default is ASC)
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *       500:
 *         description: Internal server error
 */

route.get("/", getAllProducts);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *       404:
 *         description: Product not found
 */
route.get("/:id", getProductById);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15"
 *               price:
 *                 type: number
 *                 example: 999
 *               color:
 *                 type: string
 *                 example: "Black"
 *               category1_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 */
route.post("/", createNewProduct);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               color:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
route.put("/:id", updateProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
route.delete("/:id", deleteProduct);

module.exports = route;
