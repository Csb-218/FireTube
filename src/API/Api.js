import axios from 'axios'
export  async function videosByCategory(videoCategoryId){

    const params ={
      part : 'snippet',
      chart : 'mostPopular',
      regionCode : 'US',
      videoCategoryId : videoCategoryId,
      key : process.env.NEXT_PUBLIC_API_KEY,
      maxResults : 30
    }
    try{
      const categoryVideos = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/videos`,{params})
    //   console.log(categoryVideos)
      return categoryVideos.data.items
    }
    catch(err){
      console.error(err,121)
    }
  
  }