const {Role, User, Group, Subject, Term, Mark, MarkRole, Positions} = require('../models/models')
const bcrypt = require("bcrypt");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10)

function createPasswords() {
    let passwords = ['Vasya_12345', 'Petya_12345', 'Vanya_12345', 'Sasha_12345', 'Kolya_12345', 'Vlad_123456',
        'Lesha_12345', 'Kostya_12345', 'Tolik_12345', 'Vitalik_12345', 'OlgaMuhina_89', 'NadezhdaKlukvina_75', 'adminadmin']
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
                passwordHash: hashedPasswords.pop(),
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
        await Subject.bulkCreate([
            {
                name: "Russian language"
            },
            {
                name: "Russian literature"
            },
            {
                name: "Mathematics"
            },
            {
                name: "Physics"
            },
            {
                name: "Chemistry"
            }
        ])
        const firstTermStart = new Date(2022, 8, 1)
        const firstTermEnd = new Date(2022, 9, 29)
        const secondTermStart = new Date(2022, 10, 8)
        const secondTermEnd = new Date(2022, 11, 24)
        const thirdTermStart = new Date(2022, 0, 10)
        const thirdTermEnd = new Date(2022, 2, 25)
        const fourthTermStart = new Date(2022, 3, 4)
        const fourthTermEnd = new Date(2022, 4, 31)
        await Term.bulkCreate([
            {
                startDate: firstTermStart,
                endDate: firstTermEnd,
                number: 1
            },
            {
                startDate: secondTermStart,
                endDate: secondTermEnd,
                number: 2
            },
            {
                startDate: thirdTermStart,
                endDate: thirdTermEnd,
                number: 3
            },
            {
                startDate: fourthTermStart,
                endDate: fourthTermEnd,
                number: 4
            },
        ])
        await MarkRole.bulkCreate([
            {name: 'LESSON'},
            {name: 'TERM'},
            {name: 'YEAR'}
        ])
        await Mark.bulkCreate([
            {
                date: firstTermStart,
                subject: 1,
                student: 4,
                teacher: 2,
                value: 10,
                markRoleId: 1,
                termId: 1
            },
            {
                date: firstTermEnd,
                subject: 1,
                student: 4,
                teacher: 2,
                value: 8,
                markRoleId: 1,
                termId: 1
            },
            {
                date: firstTermStart,
                subject: 2,
                student: 4,
                teacher: 2,
                value: 9,
                markRoleId: 1,
                termId: 1
            },
            {
                date: firstTermEnd,
                subject: 2,
                student: 4,
                teacher: 2,
                value: 4,
                markRoleId: 1,
                termId: 1
            },
            {
                date: firstTermStart,
                subject: 3,
                student: 4,
                teacher: 3,
                value: 7,
                markRoleId: 1,
                termId: 1
            },
            {
                date: firstTermStart,
                subject: 4,
                student: 4,
                teacher: 3,
                value: 9,
                markRoleId: 1,
                termId: 1
            }
        ])
        await Positions.bulkCreate(
            [
                {
                    teacher: 2,
                    subject: 1,
                    groupId: 1,
                    term: 1
                },
                {
                    teacher: 2,
                    subject: 2,
                    groupId: 1,
                    term: 2
                },
                {
                    teacher: 3,
                    subject: 3,
                    groupId: 1,
                    term: 3
                },
                {
                    teacher: 3,
                    subject: 4,
                    groupId: 1,
                    term: 4
                },
                {
                    teacher: 3,
                    subject: 3,
                    groupId: 2,
                    term: 1
                },
                {
                    teacher: 3,
                    subject: 4,
                    groupId: 2,
                    term: 2
                },
                {
                    teacher: 2,
                    subject: 1,
                    groupId: 2,
                    term: 3
                },
                {
                    teacher: 2,
                    subject: 2,
                    groupId: 2,
                    term: 4
                },
                {
                    teacher: 2,
                    subject: 1,
                    groupId: 1,
                    term: 4
                },
            ]
        )
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', `Error in the initData method: ${e.message}`)
    }
}

module.exports = init