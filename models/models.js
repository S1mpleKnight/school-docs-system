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

const Subject = sequelize.define('subject', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(50), unique: true, allowNull: false}
}, {
    timestamps: false
})

const Positions = sequelize.define('positions', {
    id: {
        type: DataTypes.BIGINT,
        unsigned: true,
        primaryKey: true,
        autoIncrement: true
    },
    teacher: {
        type: DataTypes.BIGINT,
        unsigned: true,
        references : {
            model: User,
            key: 'id',
        }
    },
    subject: {
        type: DataTypes.SMALLINT,
        references: {
            model: Subject,
            key: 'id'
        }
    },
    term: {
        type: DataTypes.BIGINT,
        references: {
            model: Term,
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const Group = sequelize.define('group', {
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, unsigned: true},
    letter: {type: DataTypes.CHAR(1), allowNull: false},
    number: {type: DataTypes.SMALLINT, unsigned: true, allowNull: false}
}, {
    timestamps: false
})

const Mark = sequelize.define('mark', {
    date: {type: DataTypes.DATEONLY, primaryKey: true},
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

const Voucher = sequelize.define('vouchers',{
    id : {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, unsigned: true},
    documentUrl: {type : DataTypes.STRING(255), allowNull: false},
    uploadDate: {type: DataTypes.DATE}
}, {
    timestamps: false,
    freezeTableName: true
})

const Skip = sequelize.define('skip', {
    id: {type: DataTypes.SMALLINT, primaryKey: true},
    datetime: {type: DataTypes.DATE, allowNull: false},
    approved: {type: DataTypes.STRING(50)},
}, {
    timestamps: false
})

Skip.hasOne(Voucher)
Voucher.belongsTo(Skip)

Role.hasMany(User)
User.belongsTo(Role)

MarkRole.hasMany(Mark)
Mark.belongsTo(MarkRole)

Term.hasMany(Mark)
Mark.belongsTo(Term)

User.hasMany(Skip)
Skip.belongsTo(User)

Group.hasMany(Positions)
Positions.belongsTo(Group)

Positions.hasOne(Skip)
Skip.belongsTo(Positions)

Group.hasMany(User)
User.belongsTo(Group)

module.exports = {
    User, Term, Subject, Positions, Skip, Role, MarkRole, Mark, Group, Voucher
}