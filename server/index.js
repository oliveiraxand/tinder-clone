const express = require('express');
const { v1: uuidv1 } = require('uuid');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config()

const uri = process.env.URI;
// console.log(uri)

const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json())



app.get('/', (_req, res) => {
  res.status(201).json('My app is up');
})

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const generateUserId = uuidv1();
  const hashedpassword = await bcrypt.hash(password, 10); // Ajuste aqui

  const client = new MongoClient(uri);
  try {
    client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
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

    res.status(201).json({ token, userId: data.user_id });
  } catch (e) {
    console.error('Error: %s', e);
  } finally {
    client.close();
  }
});











app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const client = new MongoClient(uri);
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
      res.status(201).json({ token, userId: user.user_id })
    }
    res.status(400).send('Invalid Credentials');

  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
})









app.get('/user', async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;
  try {
    await client.connect();
    connected = true;
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: userId };
    const user = await users.findOne(query);
    // res.status(200).json({ user, users: await users.find().toArray() }); // Adicione o await aqui
    res.send({ user });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});


app.get('/users', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (e) {
    console.error('Error: %s', e);
  } finally {
    await client.close();
  }
})

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const pipeline =
      [
        {
          '$match': {
            'user_id': {
              '$in': userIds
            }
          }
        }
      ]

    const foundUsers = users.aggregate(pipeline).toArray()
    res.send(foundUsers);

  } catch (e) {
    console.error('Error: %s', e);
  } finally {
    await client.close();
  }
})

app.get('/gendered-users', async (req, res) => {
  const client = new MongoClient(uri);
  const gender = req.query.gender;


  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const query = { gender_identity: { $eq: gender } };
    const foundUsers = await users.find(query).toArray();

    // const returnedUsers = await users.find().toArray();
    res.send(foundUsers);
  } catch (e) {
    console.error('Error: %s', e);
  } finally {
    await client.close();
  }
})

app.put('/user', async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData


  try {
    await client.connect();
    const database = client.db('app-data')
    const users = database.collection('users');
    const query = { user_id: formData.user_id }
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches
      }
    }
    const updatedUser = await users.updateOne(query, updateDocument)
    res.status(200).send(updatedUser);
  } catch (e) {
    console.error(e)
  } finally {
    client.close()
  }
})

app.put('/addmatch', async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body; 
  console.log(userId, matchedUserId);
  try {
    await client.connect();
    const database = client.db('app-data')
    const users = database.collection('users');

    const query = { user_id: userId }
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } }
    }
    const user = await users.updateOne(query, updateDocument)
    res.send(user)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }

})

app.get('/messages', async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const client = new MongoClient(uri);
  try {
    const database = client.db('app-data');
    const messages = database.collection('messages');

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId
    }

    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
})

app.post('/message', async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;
  
  try {
    await client.connect();
    const database = client.db('app-data');
    const messages = database.collection('messages');
    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

});

app.listen(PORT, () => {
  console.log('Server is running on PORT: %s', PORT)
})