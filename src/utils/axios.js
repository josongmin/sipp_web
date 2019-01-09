import axios from "axios"
import qs from "qs"
import { stores } from '../stores'

export const URL = "http://54.169.44.55:10006/v1/admin"
export const LINK_URL = "http://54.169.44.55"

// export const URL = "http://localhost:2112";
// export const LINK_URL = "http://localhost:3000";

export function axiosApi(url, method = "get", data, options = {}) {
  data = method === "get" ? { params: { ...data } } : { data }
  const defaultConfing = {
    url: URL + url,
    method,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }

  const config = {
    ...defaultConfing,
    ...data,
    ...options
  }

  if(getLocalstorage('User').accessToken) {
    config.headers['sipp-token'] = getLocalstorage('User').accessToken
  }

  return axios(config)
    .then(res => {
      if(res.headers['sipp-token']) stores.userStore.setToken(res.headers['sipp-token'])
      return res
    })
    .catch((error) => {
      if (error.response) {

      } else if (error.request) {
        console.log(error.request)
      } else {

      }

    throw error
  })
}

export function axiosQueryApi(url, method = "get", data, options = {}) {
  const defaultConfing = {
    url: URL + url + qs.stringify(data, { addQueryPrefix: true }),
    method,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json"
    }
  }

  const config = {
    ...defaultConfing,
    ...data,
    ...options
  }

  if(getLocalstorage('User').accessToken) {
    config.headers['sipp-token'] = getLocalstorage('User').accessToken
  }

  return axios(config)
    .then(res => {
      if(res.headers['sipp-token']) stores.userStore.setToken(res.headers['sipp-token'])
      return res
    })
    .catch((error) => {
      if(error.response) {
        const { data } = error.response
        if (data) {
          const { status } = data
          stores.modalStore.showModal('LoginAlert', { msg: status.msg, style: { width: 280, margin: '0 auto' }})
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error", error.message)
      }

      throw error
    })
}

function getLocalstorage(key) {
  const user = localStorage.getItem(key)
  if(user) {
    return JSON.parse(user)
  }

  return {}
}
