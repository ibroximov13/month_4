const express = require("express");
const route = express.Router();
const {
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category1.controller");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management API
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories with pagination, filtering, and sorting
 *     tags: [Categories]
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
 *         description: Number of categories per page (default is 10)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter categories by name
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [id, name]
 *         description: Column to sort by (default is id)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sorting order (default is ASC)
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *       500:
 *         description: Internal server error
 */


route.get("/", getAllCategories);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully retrieved category
 *       404:
 *         description: Category not found
 */

route.get("/:id", getCategoryById);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Category created successfully
 */

route.post("/", createNewCategory);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update category by ID
 *     tags: [Categories]
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
 *     responses:
 *       201:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */

route.put("/:id", updateCategory);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */

route.delete("/:id", deleteCategory);

module.exports = route;
