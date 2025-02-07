import axiosInstance from "../redux/Api/Index"

export const generateAuthToken = async (data) => {
  console.log("data")
    try {
      const response = axiosInstance.get('http://43.205.18.14:8082/generate_token')
      return response
    } catch (error) {
      throw (error)
    }
  }