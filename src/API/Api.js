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
      // console.log(categoryVideos)
    //   console.log(categoryVideos)
      return categoryVideos.data.items
    }
    catch(err){
      console.error(err,121)
    }
}

export async function videoById(videoId){

  const params={
    part:`snippet,contentDetails,statistics`,
    id: videoId,
    key:process.env.NEXT_PUBLIC_API_KEY
  }
  try{
    const video = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/videos`,{params})
    return video.data.items[0]
  }
  catch(err){
    console.error(err,36)
  }

}

export async function channelById(channelId){
  const params={
    part:`snippet,contentDetails,statistics`,
    id: channelId,
    key:process.env.NEXT_PUBLIC_API_KEY
  }
  try{
    
    const channel = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/channels`,{params})
    // console.log(channel.data.items[0])
    return channel.data.items[0]
  }
  catch(err){
    console.error(err,36)
  }

}

export async function suggestedVideosById(id){
  const options = {
    method: 'GET',
    url: 'https://youtube-v31.p.rapidapi.com/search',
    params: {
      relatedToVideoId:id,
      part: 'id,snippet',
      type: 'video',
      maxResults: '20'
    },
    headers: {
      'X-RapidAPI-Key': 'b485fad166msh87e98db6a5ea489p17ef29jsncfc6a57f3847',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data.items
  } catch (error) {
    console.error(error);
  }
}
