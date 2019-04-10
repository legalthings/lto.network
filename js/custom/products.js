const products = [
  {
    "title": "Workflow Engine",
    "description": "<p>The Workflow Engine facilitates running processes and holding the state.</p><ul><li>Processes are modeled as deterministic extended finite state machines.</li><li>System actions can be performed by the node without requiring human interaction.</li></ul>"
  },
  {
    "title": "Event Chain Service",
    "description": "<p>The Event Chain Service holds all ad hoc private blockchains an organization is involved in.</p><ul><li>One node holds many ad hoc blockchains. (similar to git repositories).</li><li>Fully decoupled.</li><li>Configurable allowing it to interact to any microservice added to the application layer.</li></ul>"
  },
  {
    "title": "Proof Engine",
    "description": "<p>This node connects the LTO platform to the LTO Global Chain that is responsible for securing data and events through anchoring.</p><p>The LTO Global Chain is a fork of NXT. We have stripped everything that has to do with assets and tokens and added / changed the following:</p><ul><li>Use industry standard hashing algorithm (SHA2)</li><li>Replaced the custom Elliptic-curve with standard ED25519.</li><li>Added the Bitcoin NG protocol Daily summary blocks reduce size on disk and speed up set-up time (not the same as ledger pruning).</li><li>New transaction types: Anchoring, certificates, SSI (DID protocol)</li></ul>"
  },
  {
    "title": "API Gateway",
    "description": "<p>The API Gateway is an HTTP server which proxies all the requests to the right service within the node.</p>"
  },
  {
    "title": "Queuer Service",
    "description": "<p>The Queuer Service provides a REST API to queue events on the Message Queue.</p>"
  },
  {
    "title": "Message Queue",
    "description": "<p>Message Queue is RabbitMQ message queue which uses shoveling to distribute events to other nodes.</p>"
  },
  {
    "title": "Dispatcher Service",
    "description": "<p>The Dispatcher Service parses messages from the message queue and pushes them to right service within the node.</p>"
  },
]

const peersApi = 'https://nodes.lto.network/peers/all';
const transactionsApi = 'https://stats.lto.network/transactions';

$(document).ready(function () {
  if (!/Mobi|Android/i.test(navigator.userAgent)) {
    initializeSocials();
  }

  $('.tiles .tile').click(tile => {
    if (tile.target !== tile.currentTarget) {
      tile.target = tile.currentTarget;
    }

    selectNode(tile);
  });

  $('.f-client-container').mouseover(function (evt) {
    if (evt.target !== evt.currentTarget) {
      evt.target = evt.currentTarget;
    }

    $('.f-client-container').removeClass('visible');
    $(evt.target).addClass('visible');
  });

  $('.f-client-container').click(function (evt) {
    if (evt.target !== evt.currentTarget) {
      evt.target = evt.currentTarget;
    }

    $('.f-client-container').removeClass('visible');
    $(evt.target).addClass('visible');
  });

  getPeers();
  getTransactionsData();
});

function selectNode(node) {
  $('.tiles .tile').removeClass('selected');
  $(node.target).addClass('selected');

  const title = node.target.innerText;
  const titleContainer = $('.tile-sidebar .tile-title');
  const contentContainer = $('.tile-sidebar .tile-content');
  const data = products.find(p => p.title.toLowerCase() === title.toLowerCase());

  if (!data) {
    return;
  }

  titleContainer.html(data.title);
  contentContainer.html(data.description);
}

function getTransactionsData() {
  const transactionsToday = $('.lto-stats.transactions-today');
  const transactionsMonthly = $('.lto-stats.transactions-monthly');

  const today = new Date();
  const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDay() - 30);

  $.ajax({
    url: transactionsApi,
    data: {
      startdate: today.format('m-d-Y'),
      enddate: today.format('m-d-Y'),
      granularity: 'day'
    },
    success: (response => {
      transactionsToday.find('.title').html('Transactions (today)');
      if (response.length) transactionsToday.find('.val').html(response.shift().transactions);
      else transactionsToday.find('.val').html(0);
    }),
    error: (() => {
      transactionsToday.find('.val').html(0);
    }),
    dataType: 'json'
  });

  $.ajax({
    url: transactionsApi,
    data: {
      startdate: thirtyDaysAgo.format('m-d-Y'),
      enddate: today.format('m-d-Y'),
      granularity: 'day'
    },
    success: (response => {
      transactionsMonthly.find('.title').html('Transactions (30 days)');

      if (response.length) {
        const totalTransactions = response.reduce((total, val) => total + parseInt(val.transactions, 10), 0);
        transactionsMonthly.find('.val').html(totalTransactions);
      } else {
        transactionsMonthly.find('.val').html(0);
      }
    }),
    error: (() => {
      transactionsMonthly.find('.val').html(0);
    }),
    dataType: 'json'
  });
}

function getPeers() {
  const nodeElem = $('.lto-stats.nodes');

  $.ajax({
    url: peersApi,
    success: (response => {
      nodeElem.find('.val').html(response.peers.length);
    }),
    error: (() => {
      nodeElem.find('.val').html(0);
    }),
    dataType: 'json'
  });
}

function initializeSocials() {
  const socialData = [
    {
      url: 'https://twitter.com/LTOnetwork',
      icon: 'fa-twitter'
    },
    {
      url: 'https://github.com/legalthings',
      icon: 'fa-github'
    },
    {
      url: 'https://www.youtube.com/channel/UCaHcF-xterKYTKSpY4xgKiw',
      icon: 'fa-youtube'
    },
    {
      url: 'http://medium.com/ltonetwork',
      icon: 'fa-medium-m'
    },
    {
      url: 'https://reddit.com/r/LTONetwork',
      icon: 'fa-reddit'
    },
    {
      url: 'https://t.me/LTOnetwork',
      icon: 'fa-telegram'
    }
  ]

  $('.footer').before('<div class="socials-sidebar"></div>');

  for (let s of socialData) {
    const element = `
      <a href="${s.url}">
        <i class="fab ${s.icon}"></i>
      </a>
    `;

    $('.socials-sidebar').append(element);
  }

  setTimeout(() => {
    $('.socials-sidebar').addClass('visible');
  }, 333)
}