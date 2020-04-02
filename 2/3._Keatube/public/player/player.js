//todo show the path variable




// const pathArray = window.location.pathname.split("/");
// const pathVariable = pathArray[pathArray.length-1]
// console.log(pathVariable)

    const fullUrl = window.location.href;
    const videoId = fullUrl.substr(fullUrl.lastIndexOf("/") + 1)
    
    $.get(`/videos-get/${videoId}`)
    .done((response) => {
        const video = response.response
        console.log(video)
        $(".title").text(response.response.title)
        const player = ` <video class="video" width="640" height="360" controls>
                        <source src="/videos/${video.fileName}">
                        </video>`
    
                        $('#player-wrapper').append(player);
        $('.description').text(response.response.description)
    })
    .catch((error) => {
        console.log(error)
        $(".title").text("Could not find video")
    })
        

    

