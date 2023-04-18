const request = (category, index)=>{
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&printType=books&startIndex=${index}&maxResults=6&key=AIzaSyCgya5xflSwsUZC94lM-xaIq71SLkxPB_U`)
    .then(resp =>resp.json())
    .catch(err=>console.error(err))
}

export const getResponse = async(category, index)=>{
    let resp = await request(category, index)
    return resp.items;
}