const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Student = sequelize.define('student', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, unsigned: true},
    login: {type: DataTypes.STRING(50), unique: true, allowNull: false},
    passwordHash: {type: DataTypes.STRING(50), allowNull: false},
    firstName: {type: DataTypes.STRING(50), allowNull: false},
    lastName: {type: DataTypes.STRING(50), allowNull: false},
    secondName: {type: DataTypes.STRING(50)},
})

const Timetable = sequelize.define('timetable', {
    teacher: {type: DataTypes.SMALLINT, primaryKey: true, unsigned: true},
    subject: {type: DataTypes.TINYINT, primaryKey: true},
    group: {type: DataTypes.SMALLINT, unsigned: true},
    datetime: {type: DataTypes.DATE, primaryKey: true}
})

const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, unsigned: true},
    login: {type: DataTypes.STRING(50), unique: true, allowNull: false},
    passwordHash: {type: DataTypes.STRING(50), allowNull: false},
    firstName: {type: DataTypes.STRING(50), allowNull: false},
    lastName: {type: DataTypes.STRING(50), allowNull: false},
    secondName: {type: DataTypes.STRING(50)},
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.TINYINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(10), unique: true, allowNull: false}
})

const Term = sequelize.define('term', {
    id: {type: DataTypes.TINYINT, primaryKey: true, autoIncrement: true},
    startDate: {type: DataTypes.DATEONLY, allowNull: false},
    endDate: {type: DataTypes.DATEONLY, allowNull: false},
})

const MarkRole = sequelize.define('mark_role', {
    id: {type: DataTypes.TINYINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(10), unique: true, allowNull: false}
})

const Mark = sequelize.define('mark', {
    date: {type: DataTypes.DATE, primaryKey: true},
    subject: {type: DataTypes.TINYINT, primaryKey: true},
    student: {type: DataTypes.SMALLINT, primaryKey: true, unsigned: true},
    value: {type: DataTypes.TINYINT, allowNull: false}
})

const Miss = sequelize.define('miss', {
    id: {type: DataTypes.SMALLINT, primaryKey: true},
    subject: {type: DataTypes.TINYINT, primaryKey: true},
    teacher: {type: DataTypes.SMALLINT, primaryKey: true, unsigned: true},
    date: {type: DataTypes.DATE, allowNull: false},
    approved: {type: DataTypes.STRING(50)},
    documentUrl: {type: DataTypes.STRING}
})

const Subject = sequelize.define('subject', {
    id: {type: DataTypes.TINYINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(50), unique: true, allowNull: false}
})

const Group = sequelize.define('group', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, unsigned: true},
    letter: {type: DataTypes.CHAR, allowNull: false},
    number: {type: DataTypes.TINYINT, unsigned: true, allowNull: false}
})

const GroupSubjects = sequelize.define('subject_term_group', {
    subject: {type: DataTypes.TINYINT, allowNull: false},
    term: {type: DataTypes.TINYINT, primaryKey: true},
    group: {type: DataTypes.SMALLINT, primaryKey: true, unsigned: true},
})