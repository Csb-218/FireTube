import axios from 'axios'


export  async function videosByCategory(videoCategoryId,pToken){

    const params ={
      part : 'snippet,contentDetails,statistics',
      chart : 'mostPopular',
      regionCode : 'US',
      videoCategoryId : videoCategoryId,
      key : process.env.NEXT_PUBLIC_API_KEY,
      maxResults : 28,
      pageToken:pToken
    }
    const categoryVideos = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/videos`,{params})
    return categoryVideos?.data
   
}

export  async function FeedVideos(pToken){
  // console.log(pToken,25)
  const params ={
    part : 'snippet,contentDetails,statistics',
    chart : 'mostPopular',
    regionCode : 'US',
    key : process.env.NEXT_PUBLIC_API_KEY,
    maxResults : 28,
    pageToken:pToken
  }

  const categoryVideos = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/videos`,{params})
  return categoryVideos?.data

}

export async function videoById(videoId){

  const params={
    part:`snippet,contentDetails,statistics`,
    id: videoId,
    key:process.env.NEXT_PUBLIC_API_KEY
  }
  try{
    const video = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/videos`,{params})
    // console.log(video)
    return video.data.items[0]
  }
  catch(err){
    console.error(err,36)
  }

}

export async function channelById(channelId){

  const params = {
      part:`snippet,contentDetails,statistics,brandingSettings`,
      id:channelId,
      key:process.env.NEXT_PUBLIC_API_KEY
    }
  const response = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${channelId}&key=${process.env.NEXT_PUBLIC_API_KEY}`)

  return response?.data?.items?.[0]

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

export async function videosByChannel(channelId){

const options = {
  method: 'GET',
  url: 'https://youtube-v31.p.rapidapi.com/search',
  params: {
    channelId: channelId,
    part: 'snippet,id',
    order: 'date',
    maxResults: '20'
  },
  headers: {
    'X-RapidAPI-Key': 'b485fad166msh87e98db6a5ea489p17ef29jsncfc6a57f3847',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data.items);
  return response.data.items
} catch (error) {
	console.error(error);
}
}

export async function playlistItems(playlistId){
  const params={
    part:`snippet,contentDetails,id`,
    id: playlistId,
    key:process.env.NEXT_PUBLIC_API_KEY
  }
  try{
    const playlistItems = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/playlistItems`,{params})
    console.log(playlistItems.data.items)
    return playlistItems?.data?.items
  }
  catch(err){
    console.error(err)
  }
}

export async function channelPlaylists(channelId){
  console.log(channelId)
  const params={
    part:`snippet,id,contentDetails`,
    channelId: channelId,
    key:process.env.NEXT_PUBLIC_API_KEY
  }
  try{
     const playlists = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/playlists`,{params})
     console.log(playlists.data.items)
     return playlists?.data?.items
  }
  catch(err){
    console.error(err)
  }

}

export async function searchVideos(keyword,pToken){
 
  const params={
    part:`snippet`,
    regionCode:'IN',
    q:keyword,
    type:'video',
    maxResults:28,
    pageToken:pToken,
    key:process.env.NEXT_PUBLIC_API_KEY
  }
  const searchedVideos = await axios.get(`${process.env.NEXT_PUBLIC_YOU_TUBE_API}/search`,{params})
  return searchedVideos?.data

  
}


