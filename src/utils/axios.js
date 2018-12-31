import axios from "axios"
import qs from "qs"

export const URL = "http://54.169.44.55:2112"
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

  return axios(config).catch(function(error) {
    if (error.response) {
      const { data } = error.response;
      if (data.message) {
      }
    } else if (error.request) {
      console.log(error.request)
    } else {
    }

    throw error
  })
}

export function axiosQueryApi(
  url,
  method = "get",
  data,
  options = {}
) {
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

  return axios(config)
    .catch(function(error) {
      if (error.response) {
        const { data } = error.response;
        if (data.message) {
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error", error.message)
      }

      throw error
    })
}
