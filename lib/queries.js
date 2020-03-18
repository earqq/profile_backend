'use strict'
const connectDb =  require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')
module.exports = {

    getCourses: async () => {
        let db, courses = []
        try {
            db = await connectDb()
            courses = await db.collection('courses').find().toArray()
        } catch(err) {
            errorHandler(err)
        }
        return courses
    },
    getCourse: async (root, { id }) => {
        let db, course
        try {
            db = await connectDb()
            course = await db.collection('courses').findOne({'_id' : ObjectID(id)})
        } catch(err) {
            errorHandler(err)
        }
        return course
    },
    getPeople: async () => {
        let db, students = []
        try {
            db = await connectDb()
            students = await db.collection('students').find().toArray()
        } catch(err) {
            errorHandler(err)
        }
        return students
    },
    getPerson: async (root, { id }) => {
        let db, student
        try {
            db = await connectDb()
            student = await db.collection('students').findOne({'_id' : ObjectID(id)})
        } catch(err) {
            errorHandler(err)
        }
        return student
    },

}
