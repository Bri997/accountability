const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose')
const express = require('express')
const users = require('../routes/users')


app.use('/api/users', users)