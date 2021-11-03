const {User, Board, Task, sequelize} = require('./models')
async function seed() {
    const alan = await User.create({
        name: "Alan",
        avatar: "/avatars/alan.jpg"
    })
    const karan = await User.create({
        name: "Karan",
        avatar: "/avatars/karan.jpg"
    })
    const vikki = await User.create({
        name: "Vikki",
        avatar: "/avatars/vikki.jpg"
    })
    const jess = await User.create({
        name: "Jess",
        avatar: "https://www.premadegraphics.com/img_1/23/Female-Avatar-2.png"
    })
    const users = [alan, karan, vikki, jess]
    const projectZeus = await Board.create({title: "Project Zeus"})
    const projectQuarter = await Board.create({title: "Fourth Quarter"})
    const projectZeusTasks = [
        {
            desc: "He gave support to his team when they needed it.",
            status: 0
        },
        {
            desc: "He will regain consciousness when the time is right.",
            status: 0
        },
        {
            desc: "He will resuscitate when the time is right.",
            status: 0
        },
        {
            desc: "You will continue to improve as long as you stay focused.",
            status: 0
        },
        {
            desc: "It is beneficial for them to work with each other.",
            status: 1
        },
        {
            desc: "Her presentation was adequate for me personally.",
            status: 2
        },
        {
            desc: "The castle was destroyed by a powerful storm.",
            status: 2
        }
    ]
    const projectQuarterTasks = [
        {
            desc: "They called for back up to assist them in their battle.",
            status: 2
        },
        {
            desc: "The show is about to begin.",
            status: 2
        },
        {
            desc: "It is mostly composed of mercury isn't it?",
            status: 2
        },
        {
            desc: "Her favorite color is ebony.",
            status: 2
        },
        {
            desc: "It is often verbally expressed that felines have nine lives but that is authentically just a myth.",
            status: 2
        },
        {
            desc: "I have been busier these days due to having a lot on my plate.",
            status: 1
        },
        {
            desc: "They are widely known around the planet.",
            status: 1
        },
        {
            desc: "I am unaffected by your verbal attacks.",
            status: 0
        },
        {
            desc: "His attitude was very hostile.",
            status: 0
        }
    ]
    await Promise.all(projectZeusTasks.map(_task => {
        return Task.create({..._task, BoardId: projectZeus.id, UserId: users[Math.floor(Math.random() * 4)].id})
    }))
    await Promise.all(projectQuarterTasks.map(_task => {
        return Task.create({..._task, BoardId: projectQuarter.id, UserId: users[Math.floor(Math.random() * 4)].id})
    }))
}
module.exports = seed