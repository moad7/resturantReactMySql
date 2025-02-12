import dishesDB from '../db/dishes.js';
const service = {
  getAllDishes: async () => {
    const [data] = await dishesDB.getAllDishes();
    return data;
  },
  addNewDishes: async (name, price, time, image) => {
    const [data] = await dishesDB.addNewDishes(name, price, time, image);
    return data;
  },
  addDishToOrder: async (idOrder, idDishes) => {
    const [data] = await dishesDB.addDishToOrder(idOrder, idDishes);
    return data;
  },
  deleteDishes: async (id) => {
    const [data] = await dishesDB.deleteDishes(id);
    return data;
  },

  removeDishFromOrder: async (idOrder, idDishes) => {
    const [data] = await dishesDB.removeDishFromOrder(idOrder, idDishes);
    return data;
  },

  updateDishes: async (name, price, time, id) => {
    const [rows, fields] = await dishesDB.updateDishes(name, price, time, id);
    return rows;
  },
};

export default service;
