import db from './db.js';
const dishesDB = {
  getAllDishes: async () => {
    return await db.query('select * from resturant.dishes');
  },
  addNewDishes: async (name, price, time, image) => {
    return await db.query(
      'INSERT INTO resturant.dishes (name,price,time,image) VALUES (?,?,?,?);',
      [name, price, time, image]
    );
  },
  addDishToOrder: async (idOrder, idDishes) => {
    return await db.query(
      'INSERT INTO order_details (idOrder, idDishes) VALUES (?, ?)',
      [idOrder, idDishes]
    );
  },
  deleteDishes: async (id) => {
    return await db.query(
      'DELETE FROM `resturant`.`dishes` WHERE (`idDishes` = ?);',
      [id]
    );
  },
  removeDishFromOrder: async (idOrder, idDishes) => {
    return await db.query(
      'DELETE FROM order_details WHERE idOrder = ? AND idDishes = ?',
      [idOrder, idDishes]
    );
  },
  updateDishes: async (name, price, time, id) => {
    const [result] = await db.query(
      'UPDATE `resturant`.`dishes` SET `name` = ?, `price` = ?, `time` = ? WHERE (`idDishes` = ?);',
      [name, price, time, id]
    );
    return result;
  },
};

export default dishesDB;
