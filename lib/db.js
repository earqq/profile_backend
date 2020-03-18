'use strict'
const { MongoClient } = require('mongodb')
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
let connection 

async function connectDb () {
    if(connection) return connection

    let client
    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser : true
        })
        connection = client.db(DB_NAME)
    } catch ( err ) {
        console.error('Could not connect to db ', mongoUrl, err)
        process.exit(1)
    } 
    return connection
}

module.exports = connectDb