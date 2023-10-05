import axios from 'axios'

export type APIResponse = any[]

const fetchAPIQuery = async (
  query: string,
): Promise<APIResponse | null> => {
  try {
    const response = await axios.get(`/api/${query}`)
    return response.data
  } catch (error) {
    return []
  }
}

export { fetchAPIQuery }
