const data = JSON.parse(`{
    "hello": "world"
}`)

export const greet = () => Object.entries(data).forEach(console.log)
