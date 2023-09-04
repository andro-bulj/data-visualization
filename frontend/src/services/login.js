import axios from 'axios'

const loginUrl = 'http://localhost:3001/api/login'
const usersUrl = 'http://localhost:3001/api/users'

const loginUser = (user) => {
    return axios.post(loginUrl, user)
}

const registerUser = (user) => {
    return axios.post(usersUrl, user)
}

export { loginUser, registerUser }