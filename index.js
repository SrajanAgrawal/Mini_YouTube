$(document).ready(function(){
    var API_KEY = "AIzaSyAKjRK_awiqVEpmnPo37tqWq74INKWTtbc";

    var video = ''; 
    $("#form").submit(function(event){
        console.log("search button clicked");
        event.preventDefault();

        var search = $("#search").val();
        console.log(search);
        videoSearch(API_KEY, search, 10);
    })

    function videoSearch(key,search,maxResults){
        $("#videos").empty()
        $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + key + "&q=" + search + "&type=video&maxResults=" + maxResults, function(data) {
            console.log(data)
            data.items.forEach(item => {
                video = `
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                
                `
                $("#videos").append(video);
            });
        })
    }
})
