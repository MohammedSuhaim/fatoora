import axiosInstance from "../redux/Api/Index"

export const generateAuthToken = async (data) => {
    try {
      const response = axiosInstance.get('http://43.205.18.14:8085/generate_token')
      return response
    } catch (error) {
      throw (error)
    }
  }