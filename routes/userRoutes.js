const express = require('express');
const User = require('../models/User');
const Address = require('../models/Address');

const router = express.Router();

router.post('/register', async(req, res) => {
    try {
        const {name, address} = req.body;
        const existingUser = await User.find();
        const existingAddress = await Address.find();
        let nameList = []
        if (existingUser.length !== 0) {
            nameList = existingUser.filter(item => item.name === name);
        }

        let addressList = []
        if (existingAddress.length !== 0) {
            addressList = existingAddress.filter(item => item.address === address);
        }
        console.log(addressList);
        if (nameList.length === 0 || !nameList[0].name === name) {
            const newUser = new User({ name });
            const savedUser = await newUser.save();
            const newAddress = new Address({
                userId: savedUser._id,
                address
            });

            let savedAddress = "";
            if (addressList.length === 0 || !addressList[0].address === address) {
                savedAddress = await newAddress.save();
            }

            res.status(201).json({
                message:'User created successfully',
                user: savedUser,
                address: savedAddress
            });
        } else {
            res.status(400).json({error: `User ${name} already exist!`});
        }
    } catch (error) {
        res.status(500).json({error: 'User creation failed!'});
    }
});

module.exports = router;