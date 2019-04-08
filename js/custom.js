$(document).ready(function () {
  const container = $('#mediumArticles');
  const query = {
    rss_url: 'https://medium.com/feed/ltonetwork'
  };

  $.get('https://api.rss2json.com/v1/api.json',
    query,
    (response) => {
      if ((!response.status || response.status !== 'ok') || !response.items.length) {
        return;
      }

      let html = '';
      response.items = response.items.slice(0, 6);

      $.each(response.items, (i, item) => {
        const description = $('<div></div>').html(item.description);
        let paragraphString = $(description).children('p').get().reduce((prevVal, item) => prevVal += item.innerText, '');
        paragraphString = paragraphString.length > 220 ? paragraphString.substr(0, 217) : paragraphString;
        paragraphString += '...';

        html += `
          <div class="lto-card">
            <img src="${item.thumbnail}"/>
            <div class="content">
              <h3 class="is-size-5 has-text-dark">${item.title}</h3>
                <p>${paragraphString}</p>
              <a href="${item.link}" class="button is-primary">Read more</a>
            </div>
          </div>
        `;
      });

      container.html(html);
    });
});