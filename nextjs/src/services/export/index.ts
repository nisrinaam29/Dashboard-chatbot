import { instance } from "../axios"
import { exportsPath} from "../path"

export const getExportsService = async () => {
    return instance({
      url: `${exportsPath}`,
      method: 'GET'
    })
      .then(res => res.data)
      .catch(err => {
        throw err.response.data
      })
  }
  