$(function () {
    var $content = $('#jsonContent');
    var data = {
        rss_url: 'https://medium.com/feed/ltonetwork'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
        if (response.status == 'ok') {
            var output = '';
            $.each(response.items, function (k, item) {
                var visibleSm;
                if(k < 3){
                    visibleSm = '';
                 } else {
                     visibleSm = ' visible-sm';
                 }
                output += '<a href="'+ item.link +'" class="is-link" target="_blank"><div class="column is-one-third">';
                output += '<div class="notification has-text-dark" id="blog"><p class="has-text-left">';
                var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                var src = item.description.substring(srcStart, srcEnd); // Exblog-img the URL
                output += '<div class="medium-element"><img class="blog-img" src="' + src + '" width="340px" height="180px"></div></p>';
                output += '<div class="is-size-5 has-margin-top-sm"><strong><a href="'+ item.link + ' " target="_blank">' + item.title + '</a></strong></div>';
                output += '';
                var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
                var maxLength = 280 // maximum number of characters to extract
                //trim the string to the maximum length
                var trimmedString = yourString.substr(0, maxLength);
                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                output += '<div class="is-size-6 has-margin-top-sm">' + trimmedString + '...</div>';
                output += '<div class="has-margin-top-md"><a href="'+ item.link + ' target="_blank" class="read-more"><i class="fa fa-arrow-right"></i> Read the full article </a></div>';
                output += '</div></div></div></a>';
                return k < 5;
            });
            $content.html(output);
        }
    });
});

        $(document).ready(function() {
          if (!readCookie("adSeen")) {
            setTimeout(function() {
              $("#pageloader").fadeOut(500);
            }, 4000);
            createCookie("adSeen", "1", 1000);
          }
        });

        function createCookie(name, value, days) {
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
          } else var expires = "";
          document.cookie = name + "=" + value + expires + "; path=/";
        }

        function readCookie(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
          }
          return null;
        }