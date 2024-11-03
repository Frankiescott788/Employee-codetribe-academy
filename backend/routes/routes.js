const { Router } = require('express');
const {getEmployees, addEmployees, getEmployee, deleteEmployee}  = require('../controllers/controllers');
const multer = require('multer');
const { updateDoc } = require('firebase/firestore');

const routes = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

routes.get('/api/employees', getEmployees);
routes.get('/api/employees/:id', getEmployee);
routes.post('/api/employees', upload.single('photo') , addEmployees);
routes.patch('/api/employees/:id', upload.single('photo'), updateDoc);
routes.delete('/api/employees/:id', deleteEmployee);

module.exports = routes;