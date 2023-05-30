const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const { User, validateUser } = require('../models/userModel');
const router = express.Router();

//dealing with get requests
router.get('/:email', [auth, admin], async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user || !user.role || user.role != 'resident')
        return res.status(404).send('The user with the given email was not found.');
    res.send(_.pick(user, ['_id', 'name', 'email', 'cnic', 'phone', 'address']));
})

router.get('/', [auth, admin], async (req, res) => {
    const user = await User.find({ role: 'resident' })
        .sort('_id')
        .select(['_id', 'name', 'email', 'cnic', 'phone', 'address']);
    res.send(user);
})

//dealing with post requests
router.post('/', [auth, admin], async (req, res) => {
    const { error } = validateUser(req.body); //joi validation
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User(_.pick(req.body, ['name', 'email', 'password', 'cnic', 'phone', 'address']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        await user.save();
        res.send(_.pick(user, ['_id', 'name', 'email', 'cnic', 'phone', 'address']));
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});

//dealing with put requests
router.put('/:email', [auth, admin], async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user || !user.role || user.role != 'resident') return res.status(404).send('The user with the given email was not found.');
        user.set(_.pick(req.body, ['name', 'email', 'password', 'cnic', 'phone', 'address']));
        await user.save();
        res.send(_.pick(user, ['_id', 'name', 'email', 'cnic', 'phone', 'address']));
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
});

//dealing with delete requests
router.delete('/:email', [auth, admin], async (req, res) => {

    const user = await User.findOne({ email: req.params.email });
    if (!user || !user.role || user.role != 'resident') return res.status(404).send('The user with the given email was not found.');
    await User.deleteOne({ email: req.params.email });
    res.send(_.pick(user, ['_id', 'name', 'email', 'cnic', 'phone', 'address']));
});


async function addUser() {

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash("12345678", salt);
    const user = new User(
        {
            name: "Ali Javed",
            password: pass,
            email: "alijmalik05@gmail.com",
            phone: "03174887643",
            cnic: "3520131171487",
            role: "resident",
            address: "Lahore"
        }
    )

    const res = await user.save()
    console.log(res)
}

// addUser()
module.exports = router;    