import { getAuthCode } from "@/services/Api"
export default async function handler(req, res) {
    // const { state,nonce } = req.query
    const {method} = req
    const {code} = req.query
    console.log(method,code)

    if(method === 'GET' && code){
      
      const response = await getAuthCode(code)
      if(response?.data){
        res.status(200).json({data:response?.data})
      }
      else{
        res.status(500).json({error:'Invalid grant'})
      }
    }

  }