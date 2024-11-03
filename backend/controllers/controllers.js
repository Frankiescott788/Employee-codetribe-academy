
const { getFirestore, collection, getDocs, query, addDoc, where, deleteDoc, doc, getDoc, updateDoc, setDoc } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
const { getStorage, uploadBytes, getDownloadURL, ref, deleteObject } = require("firebase/storage");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); 

const firebaseConfig = {
    apiKey: "AIzaSyDlCjVjIoy_VvIdZnb-tq-P9t9_kvswp6A",
    authDomain: "firbase9-f2585.firebaseapp.com",
    projectId: "firbase9-f2585",
    storageBucket: "firbase9-f2585.appspot.com",
    messagingSenderId: "744545554038",
    appId: "1:744545554038:web:fe88882723efc3a70e5957"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const addEmployees = async (req, res) => {
    try {
        const { name, email, phoneNumber, position } = req.body;
        const photo = req.file;  
        
        if (!photo) {
            return res.status(400).json({ error: "Photo file is required" });
        }

        const storage = getStorage();
        const storageRef = ref(storage, `images/${email}`);

        await uploadBytes(storageRef, photo.buffer);
        const imageUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'employees'), { name, email, phoneNumber, position, imageUrl });
        res.status(201).json({ message: 'Employee added successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add employee" });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = collection(db, 'employees');
        const data = await getDocs(employees);
        const employeesList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        res.status(200).json(employeesList);
    } catch (error) {
        console.log(error);
    }
}

const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const q = doc(db, 'employees', id); 
        const data = (await getDoc(q)).data();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const docref = doc(db, 'employees', id);
        const data = (await getDoc(docref)).data();
        
        deleteObject(ref(getStorage(), `images/${data.email}`));
        await deleteDoc(doc(db, 'employees', id));
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params; 
        const employeeRef = doc(db, 'employees', id);

        await setDoc(employeeRef, req.body, { merge: true });
        
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Failed to update employee" });
    }
}


module.exports = { getEmployees, addEmployees, getEmployee, deleteEmployee, updateEmployee };