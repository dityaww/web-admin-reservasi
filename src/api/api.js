import axios from 'axios'

const base_url = 'https://api.gunungungaran.site'

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

export const approveCheckIn = async (id, data, tokens) => {
    const response = await axios.put(`${base_url}/admin/check-in/${id}`, data, {
        headers: {
            "Authorization": tokens
        }
    })
    
    return response.data
}

export const approveCheckOut = async (id, data, tokens) => {
    const response = await axios.put(`${base_url}/admin/check-out/${id}`, data, {
        headers: {
            "Authorization": tokens
        }
    })

    return response.data
}