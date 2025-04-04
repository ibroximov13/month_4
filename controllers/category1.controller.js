const pool = require("../config/db");
const category1Validation = require("../validations/category1.validate");

const getAllCategories = async (req, res) => {
    try {
        let {rows} = await pool.query(`select * from category1`);
        res.send(rows);
    } catch (error) {
        console.log(error);
    };
};

const getCategoryById = async (req, res) => {
    try {
        let { id } = req.params;
        let { rows } = await pool.query(`select * from category1 where id = $1`, [id]);
        if (!rows[0]) {
            return res.status(404).send({ message: "category not found"});
        } else {
            return res.status(200).send(rows[0]);
        }
    } catch (error) {
        console.log(error);
    }
}

const createNewCategory = async (req, res) => {
    try {
        let { error, value } = category1Validation(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let name = value.name;
        let { rows } = await pool.query(`insert into category1 (name) values ($1) returning *`, [name]);
        res.status(201).send(rows[0]);
    } catch (error) {
        console.log(error);
    };
};

const updateCategory = async (req, res) => {
    try {
        let { error, value } = category1Validation(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        };
        let { id } = req.params;

        let { rows: findData } = await pool.query(`select * from category1 where id = $1`, [id]);
        if (!findData[0]) {
            return res.status(404).send({ message: "category not found"});
        }

        let { name } = value;
        let { rows } = await pool.query(`update category1 set name = $1 where id = $2 returning *`, [name, id]);
        res.status(201).send(rows[0]);
    } catch (error) {
        console.log(error);
    };
};

const deleteCategory = async (req, res) => {
    try {
        let { id } = req.params;
        let { rows: findData } = await pool.query(`select * from category1 where id = $1`, [id]);
        if (!findData[0]) {
            return res.status(404).send({ message: "category not found"});
        }
        let { rows } = await pool.query(`delete from category1 where id = $1 returning *`, [id]);
        res.send(rows[0]);
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory
}