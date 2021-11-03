const viewUsers = state => `
    <section class="user-list">
        <button onclick="app.run('showModal')">add user</button>
        ${state.users.map(user => {
            return `
                <article class="user-pill">
                    <img src="${user.avatar}" alt="${user.name}"/>
                    <span>${user.name.substring(0,11)}</span>
                </article>
            `
        }).join("")}
    </section>
`

const viewBoards = state => `
    <section class="board-list">
        ${state.boards.map(board => {
            return `
                <a href="/boards/${board.id}">
                    <article class="board-card">
                        <h2>${board.title}</h2>
                    </article>
                </a>
            `
        }).join("")}
    </section>
`

const viewAddUserModal = state => state.modal ? `
    <section id="modal" onclick="app.run('hideModal')">
        <form onclick="event.stopPropagation();" onsubmit="event.stopPropagation();app.run('addUser', this);return false;">
            <input name="name" placeholder="username" required/>
            <input name="avatar" type="url" placeholder="avatar URL" required />
            <button>Add User</button>
        </form>
    </section>
` : ""

const view = state => [
    "<h1>Kanban</h1>",
    viewBoards(state),
    viewUsers(state),
    viewAddUserModal(state)
].join("")

const update = {
    addUser: async (state, form) => {
        const data = new FormData(form)
        const payload = {
            name: data.get('name'),
            avatar: data.get('avatar')
        }
        const user = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
        state.modal = false
        state.users.push(user)
        return state
    },
    showModal: state => {
        state.modal = true
        return state
    },
    hideModal: state => {
        state.modal = false
        return state
    }
}

app.start('landing', state, view, update)