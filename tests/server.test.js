describe('server', () => {
    test('PORT is set', () => {
        expect(process.env.PORT).toBe("3001")
    })
})