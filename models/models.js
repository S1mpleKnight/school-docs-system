const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Student = sequelize.define('student', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, unsigned: true},
    login: {type: DataTypes.STRING(50), unique: true, allowNull: false},
    passwordHash: {type: DataTypes.STRING, allowNull: false},
    firstName: {type: DataTypes.STRING(50), allowNull: false},
    lastName: {type: DataTypes.STRING(50), allowNull: false},
    middleName: {type: DataTypes.STRING(50)},
}, {
    timestamps: false
})

const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, unsigned: true},
    login: {type: DataTypes.STRING(50), unique: true, allowNull: false},
    passwordHash: {type: DataTypes.STRING, allowNull: false},
    firstName: {type: DataTypes.STRING(50), allowNull: false},
    lastName: {type: DataTypes.STRING(50), allowNull: false},
    middleName: {type: DataTypes.STRING(50)},
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
    subject: {type: DataTypes.SMALLINT, primaryKey: true},
    teacher: {type: DataTypes.SMALLINT, primaryKey: true, unsigned: true},
    date: {type: DataTypes.DATE, allowNull: false},
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
        type: DataTypes.SMALLINT,
        primaryKey: true,
        unsigned: true,
        references : {
            model: Teacher,
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
        type: DataTypes.SMALLINT,
        primaryKey: true,
        unsigned: true,
        references: {
            model: Student,
            key: 'id'
        }
    },
    value: {type: DataTypes.SMALLINT, allowNull: false}
}, {
    timestamps: false
})

const GroupSubjects = sequelize.define('subject_term_group', {
        subject: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: Subject,
                key: 'id'
            }
        },
        term: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            references: {
                model: Term,
                key: 'id'
            }
        },
        group: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            unsigned: true,
            references: {
                model: Group,
                key: 'id'
            }
        },
    },{
    freezeTableName: true,

})

Teacher.hasOne(Role)
Role.belongsTo(Teacher)

MarkRole.hasMany(Mark)
Mark.belongsTo(MarkRole)

Mark.hasOne(Term)
Term.belongsTo(Mark)

Student.hasMany(Mark)

Group.hasMany(Student)
Student.belongsTo(Group)

Skip.hasOne(Student)
Student.belongsTo(Skip)

Teacher.belongsTo(Timetable)

Timetable.hasOne(Group)
Group.belongsTo(Timetable)

Subject.belongsTo(Timetable)

Timetable.hasMany(Skip)
Skip.belongsTo(Timetable)

Teacher.hasOne(Group)
Group.belongsTo(Teacher)

Group.belongsTo(GroupSubjects)
Subject.belongsTo(GroupSubjects)
Term.belongsTo(GroupSubjects)

module.exports = {
    Teacher, Student, Term, Subject, GroupSubjects, Timetable, Skip, Role, MarkRole, Mark, Group
}