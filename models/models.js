const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unsigned: true},
    firstName: {type: DataTypes.STRING(50), allowNull: false},
    lastName: {type: DataTypes.STRING(50), allowNull: false},
    middleName: {type: DataTypes.STRING(50)},
    login: {type: DataTypes.STRING(50), unique: true, allowNull: false},
    passwordHash: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(10), unique: true, allowNull: false}
}, {
    timestamps: false
})

const Term = sequelize.define('term', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
    startDate: {type: DataTypes.DATEONLY, allowNull: false},
    endDate: {type: DataTypes.DATEONLY, allowNull: false},
    number: {type: DataTypes.SMALLINT, unsigned: true, allowNull: false}
}, {
    timestamps: false
})

const MarkRole = sequelize.define('mark_role', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(10), unique: true, allowNull: false}
}, {
    timestamps: false
})

const Skip = sequelize.define('skip', {
    id: {type: DataTypes.SMALLINT, primaryKey: true},
    datetime: {type: DataTypes.DATE, allowNull: false},
    approved: {type: DataTypes.STRING(50)},
    documentUrl: {type: DataTypes.STRING}
}, {
    timestamps: false
})

const Subject = sequelize.define('subject', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(50), unique: true, allowNull: false}
}, {
    timestamps: false
})

const Timetable = sequelize.define('timetable', {
    teacher: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        unsigned: true,
        references : {
            model: User,
            key: 'id',
        }
    },
    subject: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        references: {
            model: Subject,
            key: 'id'
        }
    },
    datetime: {type: DataTypes.DATE, primaryKey: true}
}, {
    freezeTableName: true,
    timestamps: false
})

const Group = sequelize.define('group', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, unsigned: true},
    letter: {type: DataTypes.STRING(1), allowNull: false},
    number: {type: DataTypes.SMALLINT, unsigned: true, allowNull: false}
}, {
    timestamps: false
})

const Mark = sequelize.define('mark', {
    date: {type: DataTypes.DATE, primaryKey: true},
    subject: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        references: {
            model: Subject,
            key: 'id'
        }
    },
    student: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        unsigned: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    teacher: {
        type: DataTypes.BIGINT,
        unsigned: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    value: {type: DataTypes.SMALLINT, allowNull: false}
}, {
    timestamps: false
})

Role.hasMany(User)
User.belongsTo(Role)

MarkRole.hasMany(Mark)
Mark.belongsTo(MarkRole)

Term.hasMany(Mark)
Mark.belongsTo(Term)

User.hasMany(Skip)
Skip.belongsTo(User)

Group.hasMany(Timetable)
Timetable.belongsTo(Group)

Timetable.hasOne(Skip)
Skip.belongsTo(Timetable)

Group.hasMany(User)
User.belongsTo(Group)

Term.hasMany(Timetable)
Timetable.belongsTo(Term)

module.exports = {
    User, Term, Subject, Timetable, Skip, Role, MarkRole, Mark, Group
}