// routes/routes.js
const { Router } = require('express');
const { getEmployees, addEmployees, getEmployee, deleteEmployee } = require('../controllers/controllers');
const multer = require('multer');
const { updateDoc } = require('firebase/firestore');

const routes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

routes.get('/employees', getEmployees);
routes.get('/employees/:id', getEmployee);
routes.post('/employees', upload.single('photo'), addEmployees);
routes.patch('/employees/:id', upload.single('photo'), updateDoc);
routes.delete('/employees/:id', deleteEmployee);

module.exports = routes;
