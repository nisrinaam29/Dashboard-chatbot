import { instance } from "../axios";
import { getWidgetPath } from "../path";

export const getWidgetsService = async () => {
    return instance({
        url:`${getWidgetPath}`,
        method: 'GET',
       
    })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}