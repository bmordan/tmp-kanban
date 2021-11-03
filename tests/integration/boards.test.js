const axios = require('axios')

describe('Tasks', () => {
    test('Can create a task', () => {
        return axios.post(`http://localhost:3001/boards/1/tasks`, {
            desc: "Test Task",
            UserId: 1
        }).then(res => {
            expect(res.status).toBe(200)
            return axios.get(`http://localhost:3001/boards/1`)
        }).then(res => {
            expect(res.status).toBe(200)
            expect(res.data).toEqual(expect.stringMatching(/Test Task/))
        })
    })
})