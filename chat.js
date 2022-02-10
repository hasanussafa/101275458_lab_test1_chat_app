const express = require('express');
const userModel = require('../users');
const app = express();

//Delete info
app.delete('/api/v1/user/:id', async (req, res) => {
  try {
    const employee = await userModel.findByIdAndDelete(req.params.id)
    if (!employee) res.status(404).send("Sorry")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

// post
app.post('/api/v1/users', async (req, res) => {
  const employee = new userModel(req.body);

  try {
    await employee.save();
    res.send(employee);
  } catch (err) {
    res.status(500).send(err);
  }
});



//update info
app.put('/api/v1/users/:id', async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.params.id, req.body)
    await userModel.save()
    res.send(employee)
  } catch (err) {
    res.status(500).send(err)
  }
})
//Get id
app.get('/api/v1/users/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)

  const employees = await userModel.findById(idfind);

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});




module.exports = app