const express = require('express');
const { v1: uuidv1 } = require('uuid');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uri = 'mongodb+srv://oliveiraxand:alexandre11@clustertinder.79l9pci.mongodb.net/?retryWrites=true&w=majority';
const cors = require('cors');

const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json())
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.get('/', (_req, res) => {
  res.status(201).json('My app is up');
})

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const generateUserId = uuidv1();
  const hashedpassword = await bcrypt.hash(password, 10); // Ajuste aqui

  try {
    client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const existingUser = await users.findOne({ email });
    
    if(existingUser) {
      return res.status(409).send('User already exists. Please login');
    }

    const lowerEmail = email.toLowerCase(); // Ajuste aqui
    
    const data = {
      user_id: generateUserId,
      email: lowerEmail,
      hashed_password: hashedpassword
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, lowerEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({token, userId: generateUserId, email: lowerEmail});
  } catch(e) {
    console.error('Error: %s', e);
  } finally {
    client.close();
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const user = await users.findOne({ email })

    const correctPassword = await bcrypt.compare(password, user.hashed_password);

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24
      })
      res.status(201).json({ token, userId: user.user_id, email })
    }
    res.status(400).send('Invalid Credentials');

  } catch(e) {
    console.log(e);
  } finally {
    client.close();
  }
})

app.get('/users', async (req, res) => {
  // console.log(client);
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  }catch(e) {
    console.error('Error: %s', e);
  } finally {
    await client.close();
  }
})

app.listen(PORT, () => {
  console.log('Server is running on PORT: %s', PORT)
})