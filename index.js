$(document).ready(function(){
    var API_KEY = "AIzaSyAKjRK_awiqVEpmnPo37tqWq74INKWTtbc";

    var video = ''; 
   
    $("#form").submit(function(event){
        console.log("search button clicked");
        event.preventDefault();

        var search = $("#search").val();
        console.log(search);
        var rapidApiKey = "0988c3b4admsh7cc82e6e92882eap19c2abjsnb4ed3302c211";
        fetchKeywordData(search,rapidApiKey);
        videoSearch(API_KEY, search, 20);
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

    
    function fetchKeywordData(keyword, rapidApiKey) {
        var headers = {
            "X-RapidAPI-Host": "keyword-research-for-youtube.p.rapidapi.com",
            "X-RapidAPI-Key": rapidApiKey
        };
    
        $.ajax({
            url: "https://keyword-research-for-youtube.p.rapidapi.com/yttags.php",
            headers: headers,
            data: {
                keyword: keyword
            },
            success: function(data) {
                var container = $(".volumeCount");
    
                var exactKeyword = data.exact_keyword[0];
                var relatedKeywords = data.related_keywords.slice(0, 3);
    
                var exactResultText = "<p><b>Exact Keyword:</b> " + exactKeyword.keyword + "<br><b>Monthly Search Volume: </b>" + exactKeyword.monthlysearch + "</p>";
                container.append(exactResultText);
    
                relatedKeywords.forEach(function(relatedKeyword) {
                    var relatedResultText = "<p><b>Related Keyword:</b> " + relatedKeyword.keyword + "<br><b>Monthly Search Volume: </b>" + relatedKeyword.monthlysearch + "</p>";
                    container.append(relatedResultText);
                });
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }

    // function displayKeywordData(keywordData) {
    //     var container = $(".volumeCount");
    
    //     // Display exact keyword data
    //     var exactKeyword = keywordData.exact_keyword[0];
    //     var exactResultText = "<p>Exact Keyword: " + exactKeyword.keyword + "<br>Monthly Search Volume: " + exactKeyword.monthlysearch + "</p>";
    //     container.append(exactResultText);
    
    //     // Display related keyword data
    //     var relatedKeywords = keywordData.related_keywords;
    //     relatedKeywords.slice(0, 3).forEach(function(relatedKeyword) {
    //         var relatedResultText = "<p>Related Keyword: " + relatedKeyword.keyword + "<br>Monthly Search Volume: " + relatedKeyword.monthlysearch + "</p>";
    //         container.append(relatedResultText);
    //     });
    // }

})
