const express = require('express');
const { sequelize, testConnection } = require('./models/conn');
const { Op } = require('sequelize');

// const Category = require('./models/categoryModel');
// const Item = require('./models/itemModel');
const { Item, Category } = require('./models/associations');

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
            name: "Fruit"
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
        name: 'Banana',
        price: 10,
        description: 'These are bananas',
        categoryid: 6
    });
    console.log(JSON.stringify(result));
    return result;
}

// createItem();

// Associations
const findItems = async () => {
    const itemsWithCategory = await Item.findAll({
        include: [{
            model: Category,
            as: 'category' // Only include if you have defined an alias in your association
        }]
    });

    console.log(JSON.stringify(itemsWithCategory));
    return itemsWithCategory;
}

// findItems();


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

// ...

// Modify the endpoint to display all items for a specific category by name
app.get('/api/categories/name/:name', async (req, res, next) => {
    try {
        const categoryName = req.params.name;

        // Find the category by name
        const category = await Category.findOne({
            where: { name: categoryName },
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Retrieve all items associated with the category
        const items = await category.getItems();

        return res.status(200).json(items);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ...


// GET - /api/items - get all items
app.get('/api/items', async (req, res, next) => {
    try {
        const result = await Item.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// update meat price

// ...

// update meat price
const updateMeatPrices = async () => {
    try {
        const updatedData = {
            price: parseFloat('120.99'), // Set the new price for meat
        };

        const result = await Item.update(updatedData, {
            where: {
                categoryid: 5, // Assuming categoryid 5 corresponds to the category for meat
            },
        });

        console.log(`Meat prices updated successfully: ${JSON.stringify(result)}`);
    } catch (error) {
        console.error(`Error updating meat prices: ${error.message}`);
    }
};

// Call the function to update meat prices
//   updateMeatPrices();

// Select all items with prices greater than 100

// ...

// Select all items with prices greater than or equal to 100
// ...

// Select all items with prices greater than or equal to 100
// ...

// Select all items with prices greater than or equal to 100
// ...

app.get('/api/items/expensive', async (req, res, next) => {
    try {
        const itemsOverOneHundred = await Item.findAll({
            where: {
                price: {
                    [Op.gte]: 100,
                },
            },
        });

        res.status(200).json(itemsOverOneHundred);
    } catch (error) {
        console.error(error.message); // Log the error message
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});

// ...




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});