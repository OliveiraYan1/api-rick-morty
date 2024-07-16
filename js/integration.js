async function getCharacters(page) {
    try {
        const response = await api.get(`/character?page=${page}`);
        
        return response

      
    } catch (error) {
        console.error(error)
    }
}

async function getEpisodes(episode) {
    try {
        const res = await api.get(`${episode}`);
        return res.data.name;
    } catch (error) {
        console.error('Error fetching episode:', error);
        return 'Unknown Episode';
    }
}

async function getDetails(id){
    try {
        const response = await api.get(`/character/${id}`)

        return response

    } catch (error) {
        console.error(error);
    }
}

async function getTotalCharacters() {
    try {
        const response = await api.get(`/character`);
        
        return response

      
    } catch (error) {
        console.error(error)
    }
}

async function getTotalLocations() {
    try {
        const response = await api.get(`/location`);
        
        return response

      
    } catch (error) {
        console.error(error)
    }
}

async function getTotalEpisodes() {
    try {
        const response = await api.get(`/episode`);
        return response

      
    } catch (error) {
        console.error(error)
    }
}
