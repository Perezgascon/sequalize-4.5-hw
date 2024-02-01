const express = require('express');
const { sequelize, testConnection } = require('./models/conn');
const Category = require('./models/categoryModel');
const Item = require('./models/itemModel');

const PORT = 8080;


testConnection();   

const app = express();
app.use(express.json());

const findCategories = async () => {
    const result = await Category.findAll();
    console.log(JSON.stringify(result));
    return result;
}

const findCategoriesByName = async () => {
    const result = await Category.findAll({
        where: {
            name: 'Adolfo'
        }
    });
    console.log(JSON.stringify(result));
}

const createCategory = async (categoryName) => {
    try {
        const result = await Category.create({
            name: "Food"
        });
        console.log(`Category created successfully: ${JSON.stringify(result)}`);
    } catch (error) {
        console.error(`Error creating category: ${error.message}`);
    }
}

const updatingCategory = async () => {
    const result = await Category.update({
        id: 1
    }, {
        where: {
            id: 4
        }
    });
    console.log(JSON.stringify(result));
}

const deletingCategory = async () => {
    const result = await Category.destroy({
        where: {
            id: 1
        }
    });
    console.log(JSON.stringify(result));
}

// updatingCategory();
// findCategories();
// createCategory();

// deletingCategory();

const createItem = async () => {
    const result = await Item.create({
        name: 'Tortilla',
        price: 100,
        description: 'This is a tortilla',
        categoryid: 1
    });
    console.log(JSON.stringify(result));
    return result;
}

createItem();


app.get('/api/categories', async (req, res, next) => {
    try {
        const result = await findCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get('/api/categories/:id', async (req, res, next) => {
    try {
        const result = await Category.findByPk(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get('/api/categories/name/:name', async (req, res, next) => {
    try {
        const result = await Category.findAll({
            where: {
                name: req.params.name
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});