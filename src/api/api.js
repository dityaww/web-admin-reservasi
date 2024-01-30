import axios from 'axios'

const base_url = 'http://62.72.24.89:5000'

export const authLogin = async (datas) => {
    const response = await axios.post(`${base_url}/auth/login`, datas)
    return response.data
}

export const getRegulation = async () => {
    const response = await axios.get(`${base_url}/regulation/alldata`)
    return response.data
}

export const deleteRegulation = async (id, token) => {
    const response= await axios.delete(`${base_url}/regulation/deletedata/${id}`, {
        headers: {
            'Authorization': token
        }
    })
    return response
}

export const transactionPending = async (tokens) => {
    const response = await axios.get(`${base_url}/admin/reservasipending/`, {
        headers: {
            "Authorization": tokens
        }
    })
     
    return response.data
}

export const transactionSuccess = async (tokens) => {
    const response = await axios.get(`${base_url}/admin/reservasisuccess/`, {
        headers: {
            "Authorization": tokens
        }
    })

    return response.data
}

export const detailGunung = async () => {
    const response = await axios.get(`${base_url}/mount/detail/65ac1082ab0b9e96cd47b0cc`)
    return response.data
}

export const detailPendakian = async (id, tokens) => {
    const response = await axios.get(`${base_url}/admin/detailreservasi/${id}`, {
        headers: {
            "Authorization": tokens
        }
    })
    return response.data
}