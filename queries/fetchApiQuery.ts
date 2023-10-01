import axios from 'axios'

export type APIResponse = any[]

const fetchAPIQuery = async (
  query: string,
): Promise<APIResponse | null> => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/${query}`,
    )
    return response.data
  } catch (error) {
    return []
  }
}

export { fetchAPIQuery }
