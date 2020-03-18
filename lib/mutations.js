'use strict'

const connectDb =  require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')
module.exports = {
    createCourse: async (root, { input }) => {
        const defaults = {
            teacher: ``,
            topic: ``
        }
        const newCourse = Object.assign(defaults, input)
        let db
        let course
        try {
            db = await connectDb()
            course = await db.collection('courses').insertOne(newCourse)
            input._id = course.insertedId
        } catch(err) {
            errorHandler(err)
        }
        return input
    },
    editCourse: async (root, { _id, input }) => {
        let db 
        let course 
        try {
            db = await connectDb()
            await db.collection('courses').updateOne(
                { _id: ObjectID(_id) },
                { $set: input}
            )
            course = await db.collection('courses').findOne(
                {_id: ObjectID(_id)}
            )
        } catch (err) {
            console.log(err)
        }
        return course
    },
    deleteCourse: async (root, { _id }) => {
        let db 
        let course 
        try {
            db = await connectDb()
            course = await db.collection('courses').findOne(
                {_id:ObjectID(_id)}
            )
            await db.collection('courses').deleteOne(
                {_id: ObjectID(_id)}
            )
        } catch(err) {
            errorHandler(err)
        }
        return course
    },
    createPerson: async (root, { input }) => {
        let db
        let student
        try {            
            db = await connectDb()
            student = await db.collection('students').insertOne(input)
            input._id = student.insertedId
        } catch(err) {
            errorHandler(err)
        }
        return input
    },
    editPerson: async (root, { _id, input }) => {
        let db 
        let student 
        try {
            db = await connectDb()
            await db.collection('students').updateOne(
                {'_id': ObjectID(_id) },
                {'$set': input}
            )
            student = await db.collection('students').findOne(
                {_id: ObjectID(_id)}
            )
        } catch (err) {
            console.log(err)
        }
        return student
    },
    deletePerson: async (root, { _id }) => {
        let db 
        let student 
        try {
            db = await connectDb()
            student = await db.collection('students').findOne(
                {_id:ObjectID(_id)}
            )
            await db.collection('students').deleteOne(
                {_id: ObjectID(_id)}
            )
        } catch(err) {
            errorHandler(err)
        }
        return student
    },
    addPeople: async(root, { courseID, personID }) => {
        throw new Error('Error agregando personas')
        let db
        let person
        let course
        try {
            db = await connectDb()
            course = await db.collection('courses').findOne(
                { _id: ObjectID(courseID) }
            )
            person =  await db.collection('students').findOne(
                { _id: ObjectID(personID) }
            )
            if (!course || !person) throw new Error(`La persona o el curso no existe`)
            await db.collection('courses').updateOne(
                { _id: ObjectID(courseID) },
                { $addToSet: { people: ObjectID(personID) } }
            )        
        } catch(err) {
            errorHandler(err)
        }
        return course
    }

}