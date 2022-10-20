import { web3DB } from '../configDB'

export const createTable = async () => {
    web3DB().then((db) => {
        db.exec('CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, name TEXT,  email TEXT, ethSignature TEXT, token TEXT )')
    })

}

export const insertUser = async (user: { name: string; email: string; ethSignature: string, token: string }) => {
    web3DB().then((db) => {
        db.run('INSERT INTO users (name, email, ethSignature, token) VALUES (?,?,?,?)', [user.name, user.email, user.ethSignature, user.token])
    })

}

export const userExist = async (email: string) => {
    return web3DB().then((db) => {
        return db.get('SELECT name FROM users WHERE email = ?', email)
    })
}

export const getUser = async (token: string) => {
    return web3DB().then((db) => {
        return db.get('SELECT name FROM users WHERE token = ?', [token])
    })
}


export const tokenFromUser = async (ethSignature: string) => {
    return web3DB().then((db) => {
        return db.get('SELECT token FROM users WHERE ethSignature = ? ', [ethSignature])
    })
}

export const allUsers = async () => {
    return web3DB().then((db) => {
        return db.all('SELECT * FROM users')
    })
}
