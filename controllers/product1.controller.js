const pool = require("../config/db");
const product1Validation = require("../validations/product1.validate");

const getAllProducts = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let take = req.query.take || 10;
        let offset = ( page -1 ) * take;

        let {rows} = await pool.query(`select product1.*, json_build_object('id', category1.id, 'name', category1.name) as category from product1
        left join category1 on category1.id = product1.category1_id`);
        res.send(rows);
    } catch (error) {
        console.log(error);
    };
};

const getProductById = async (req, res) => {
    try {
        let { id } = req.params;
        let { rows } = await pool.query(`SELECT product1.*, 
            json_build_object('id', category1.id, 'name', category1.name) AS category 
            FROM product1
            LEFT JOIN category1 ON category1.id = product1.category1_id
            WHERE product1.id = $1`, [id]);
        if (!rows[0]) {
            return res.status(404).send({ message: "product not found"});
        } else {
            return res.status(200).send(rows[0]);
        }
    } catch (error) {
        console.log(error);
    }
}

const createNewProduct = async (req, res) => {
    try {
        let { error, value } = product1Validation(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let { name, price, color, category1_id } = value;
        let { rows } = await pool.query(`insert into product1 (name, price, color, category1_id) values ($1, $2, $3, $4) returning *`, [name, price, color, category1_id]);
        res.status(201).send(rows[0]);
    } catch (error) {
        console.log(error);
    };
};

const updateProduct = async (req, res) => {
    try {
        let { error, value } = product1Validation(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let { id } = req.params;

        let { rows: findData } = await pool.query(`select * from product1 where id = $1`, [id]);
        if (!findData[0]) {
            return res.status(404).send({ message: "category not found"});
        }

        let { name, price, color, category_id } = value;
        let { rows } = await pool.query(`update product1 set name = $1, price = $2, color = $3, category_id = $4 where id = $5 returning *`, [name, price, color, category_id, id]);
        res.status(201).send(rows[0]);
    } catch (error) {
        console.log(error);
    };
};

const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let { rows: findData } = await pool.query(`select * from product1 where id = $1`, [id]);
        if (!findData[0]) {
            return res.status(404).send({ message: "category not found"});
        }
        let { rows } = await pool.query(`delete from product1 where id = $1 returning *`, [id]);
        res.send(rows[0]);
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct
}