const products = [
  {
    "title": "Workflow Engine",
    "description": "<p>The workflow engine facilitates running processes and holding the state.</p><ul><li>Processes are modeled as deterministic extended finite state machines.</li><li>System actions can be performed by the node without requiring human interaction.</li></ul>"
  },
  {
    "title": "Event Chain Service",
    "description": "<p>The Event chain service holds all ad hoc private blockchains an organization is involved in.</p><ul><li>One node holds many ad hoc blockchains. (similar to git repositories).</li><li>Fully decoupled.</li><li>Configurable allowing it to interact any microservices added to the application layer.</li></ul>"
  },
  {
    "title": "Proof Engine",
    "description": "<p>This node connects the LTO platform to the LTO Global Chain that is responsible for securing data and events through anchoring.</p><p>The LTO Global Chain is a fork of NXT. We have stripped everything that has to do with assets and tokens and added / changed the following:</p><ul><li>Use industry standard hashing algorithm (SHA2)</li><li>Replaced the custom Elliptic-curve with standard ED25519.</li><li>Added the Bitcoin NG protocol Daily summary blocks reduce size on disk and fasten set up time (not the same as ledger pruning).</li><li>New transaction types: Anchoring, certificates, SSI (DID protocol)</li></ul>"
  },
  {
    "title": "API Gateway",
    "description": "<p>API gateway is an http server which proxies all the requests to the right service within the node.</p>"
  },
  {
    "title": "Queuer Service",
    "description": "<p>The queuer service provides a rest api to queue events on the message queue.</p>"
  },
  {
    "title": "Message Queue",
    "description": "<p>Message queue is RabbitMQ message queue which uses shoveling to the distribute events to other nodes.</p>"
  },
  {
    "title": "Dispatcher Service",
    "description": "<p>The dispatcher service parses messages from the message queue and pushes them to right service within the node.</p>"
  },
]

const peersApi = 'https://nodes.lto.network/peers/all';
const transactionsApi = 'https://stats.lto.network/transactions';

$(document).ready(function () {
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
  const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  $.ajax({
    url: transactionsApi,
    data: {
      startdate: today.format('m-d-Y'),
      enddate: today.format('m-d-Y'),
      granularity: 'day'
    },
    success: (response => {
      if (response.length) transactionsToday.find('.val').html(response.shift().transactions);
      else transactionsToday.find('.val').html(0);
    }),
    error: (() => {
      nodeElem.find('.val').html(0);
    }),
    dataType: 'json'
  });

  $.ajax({
    url: transactionsApi,
    data: {
      startdate: firstDayMonth.format('m-d-Y'),
      enddate: lastDayMonth.format('m-d-Y'),
      granularity: 'day'
    },
    success: (response => {
      const totalTransactions = response.reduce((total, val) => total + parseInt(val.transactions, 10), 0);
      transactionsMonthly.find('.val').html(totalTransactions);
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