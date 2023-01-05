
const express = require('express');
const router = express.Router();
const Account = require('../models/accounts');



router.get('/accounts', async (req, res) => {
    const accounts = await Account.find({})
    res.send(accounts)
})


router.get('/add', async (req, res) => {
    console.log('hit route')
})

router.post('/accounts', async (req, res) => {

    const account = new Account(req.body)
    await account.save()
    res.send('done')
})

router.put('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const acc = await Account.findByIdAndUpdate(id, { ...req.body })
    const updated = await Account.findByIdAndUpdate(req.params.id)
    res.send(updated)

})


router.delete('/accounts/:id', async (req, res) => {
    const { id } = req.params
    await Account.findByIdAndDelete(id)
})

module.exports = router