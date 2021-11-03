const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {User, Board, Task, sequelize} = require('./src/models')
const app = express()

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
    const boards = await Board.findAll({}, {plain: true})
    const users = await User.findAll({}, {plain: true})
    res.render('landing', {
        boards: JSON.stringify(boards),
        users: JSON.stringify(users)
    })
})

app.get('/boards/:id', async (req, res) => {
    const board = await Board.findByPk(req.params.id)
    const tasks = await Task.findAll({
        where: {
            boardId: board.id
        },
        include: [
            {model: User, as: 'user'}
        ]
    })

    const users = await User.findAll()

    res.render('board', {
        board: JSON.stringify(board),
        tasks: JSON.stringify(tasks),
        users: JSON.stringify(users)
    })
})

app.get('/boards/:board_id/tasks/:task_id/update/:status', async (req, res) => {
    const task = await Task.findByPk(req.params.task_id)
    await task.update({status: Number(req.params.status)})
    res.send(task)
})

app.post('/boards/:id/tasks', async (req, res) => {
    const board = await Board.findByPk(req.params.id)
    const { desc, userId } = req.body
    const task = await Task.create({desc, userId: Number(userId), status: 0})
    await board.addTask(task)
    Task.findByPk(task.id, {include: 'user'}).then(task => res.send(task))
})

app.post('/users', async (req, res) => {
    const user = await User.create(req.body)
    res.send(user)
})

app.listen(process.env.PORT, () => {
    sequelize.sync(() => {
        console.log('Kanban app running on port', process.env.PORT)
    })
})
