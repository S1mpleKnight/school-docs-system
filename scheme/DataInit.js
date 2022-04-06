const {Role, User, Group} = require('../models/models')
const bcrypt = require("bcrypt");
const config = require('config')
const SALT_ROUNDS = config.get('salt_rounds')

function createPasswords() {
    let passwords = ['Vasya_12345', 'Petya_12345', 'Vanya_12345', 'Sasha_12345', 'Kolya_12345', 'Vlad_123456',
                    'Lesha_12345', 'Kostya_12345', 'Tolik_12345', 'Vitalik_12345', 'OlgaMuhina_89', 'NadezhdaKlukvina_75']
    let hashedPasswords = []
    for (password of passwords) {
         hashedPasswords.push(bcrypt.hashSync(password, SALT_ROUNDS))
    }
    return hashedPasswords
}

async function init() {
    try {
        const hashedPasswords = createPasswords()
        await Role.bulkCreate([
            {name: 'ADMIN'},
            {name: 'TEACHER'},
            {name: 'STUDENT'},
        ]);
        await Group.bulkCreate([
            {letter: 'A', number: '6'},
            {letter: 'B', number: '6'},
        ])
        await User.bulkCreate([
            {
                firstName: "admin",
                lastName: "admin",
                middleName: "admin",
                login: "adminadmin",
                passwordHash: "$2b$10$tbd0MZOrxCGf1wKwJ4Pzlun0XhETGE9FG8TlC98N4G3IAlZgnmq8",
                roleId: 1,
                groupId: null
            },
            {
                firstName: "Nadezhda",
                lastName: "Klukvina",
                middleName: "Stepanovna",
                login: "NadezhdaKlukvina_75",
                roleId: 2,
                groupId: 2,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Olga",
                lastName: "Muhina",
                middleName: "Vasilevna",
                login: "OlgaMuhina_89",
                roleId: 2,
                groupId: 1,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Vitalik",
                lastName: "Kupin",
                middleName: "Vasilevich",
                login: "Vitalik_12345",
                roleId: 3,
                groupId: 2,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Anatoliy",
                lastName: "Susin",
                middleName: "Vasilevich",
                login: "Tolik_12345",
                roleId: 3,
                groupId: 2,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Konstamtin",
                lastName: "Kustov",
                middleName: "Dmitrievich",
                login: "Kostya_12345",
                roleId: 3,
                groupId: 2,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Alexey",
                lastName: "Vishemirsky",
                middleName: "Bladimirovich",
                login: "Lesha_12345",
                roleId: 3,
                groupId: 2,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Vlad",
                lastName: "Kabral",
                middleName: "Batkovich",
                login: "Vlad_123456",
                roleId: 3,
                groupId: 2,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Nikolay",
                lastName: "Luzhev",
                middleName: "Petrovich",
                login: "Kolya_12345",
                roleId: 3,
                groupId: 1,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Alexandr",
                lastName: "Treska",
                middleName: "Badimovich",
                login: "Sasha_12345",
                roleId: 3,
                groupId: 1,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Vanya",
                lastName: "Gurkin",
                middleName: "Luchiy",
                login: "Vanya_12345",
                roleId: 3,
                groupId: 1,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Petya",
                lastName: "Murkin",
                middleName: "Bladislavovich",
                login: "Petya_12345",
                roleId: 3,
                groupId: 1,
                passwordHash: hashedPasswords.pop()
            },
            {
                firstName: "Vasya",
                lastName: "Pupkin",
                middleName: "Petrovich",
                login: "Vasya_12345",
                roleId: 3,
                groupId: 1,
                passwordHash: hashedPasswords.pop()
            }
        ])
    } catch (e) {
        console.log(`Error in the initData method: ${e.message}`)
    }
}

module.exports = init