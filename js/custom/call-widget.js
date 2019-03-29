(function () {
  const style = document.createElement('style');
  style.innerHTML = `
    .call-widget {
      display: block;
      padding: 8px;
      box-sizing: border-box;
      background: #272822;
      border-radius: 8px;
    }
    .call-widget__buttons {
      text-align: left;
    }
    .call-widget__button {
      display: inline-block;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: rgb(154, 168, 189);
      margin-left: 2px;
      margin-right: 2px;
      margin-bottom: 5px;
      padding: 8px;
      border-radius: 3px;
      cursor: pointer;
    }
    .call-widget__button.selected, .call-widget__button:hover {
      box-sizing: border-box;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      margin-left: 2px;
      margin-right: 2px;
      margin-bottom: 5px;
      cursor: pointer;
      color: rgb(255, 255, 255);
      background-color: rgba(255, 255, 255, 0.333);
      padding: 8px;
      border-radius: 3px;
    }
    .call-widget pre {
      padding-top: 0px;
    }

    .call-widget pre .number {
      min-width: auto;
      background: none;
      display: inline;
      height: auto;
      font-size: 16px;
      margin: 0;
      padding: 0;
    }
  `;
  document.head.appendChild(style);

  const examples = [{
    tech: 'cUrl',
    language: 'bash',
    code: `
curl -X POST "https://anchor-demo.lto.network/hash" \\
  -H "Content-Type: application/json" \\
  -d  "{
      \\"hash\\": \\"f70c5e847d0ea29088216d81d628df4b4f68f3ccabb2e4031c09cc4d129ae216\\"
    }"
    `
  }, {
    tech: 'NodeJS',
    language: 'js',
    code: `
var request = require('request');
request({
  method: 'POST',
  url: 'https://anchor-demo.lto.network/hash',
  body: {
    hash: "f70c5e847d0ea29088216d81d628df4b4f68f3ccabb2e4031c09cc4d129ae216"
    encoding: "hex"
  },
  json: true
}, function(err, receipt) {
  console.log(receipt);
});

    `
  }, {
    tech: 'Java',
    language: 'java',
    code: `
String json = "{ \\"hash\\": \\"f70c5e847d0ea29088216d81d628df4b4f68f3ccabb2e4031c09cc4d129ae216\\", \\"encoding\\": \\"hex\\" }";
try {
    final CloseableHttpClient httpClient = HttpClients.createDefault();
    String url = "https://anchor-demo.lto.network/hash";
    HttpPost httpPost = new HttpPost(url);
    StringEntity entity = new StringEntity(json);
    httpPost.setEntity(entity);
    httpPost.setHeader("Accept", "application/json");
    httpPost.setHeader("Content-type", "application/json");
    ResponseHandler<String> responseHandler = new BasicResponseHandler();
    final String responseBody = httpClient.execute(httpPost, responseHandler);
    System.out.println(responseBody);
    httpClient.close();
} catch (Exception e) {
    System.out.println(e.getMessage());
}
`
  }, {
    tech: 'PHP',
    language: 'php',
    code: `
$client = new GuzzleHttp\\Client();
$url = 'https://anchor-demo.lto.network/hash';
$data = [
  'hash' => 'f70c5e847d0ea29088216d81d628df4b4f68f3ccabb2e4031c09cc4d129ae216',
  'encoding' => 'hex'
];
$response = $client->post($url, ['json' => $data]);
echo $response->getBody();
`}].map(example => {
    return {
      ...example,
      code: Prism.highlight(example.code, Prism.languages[example.language], example.language)
    }
  });

  new Vue({
    el: 'call-widget',
    template: `<div class="call-widget">
      <div class="call-widget__buttons">
        <div class="call-widget__button" v-bind:class="{selected: selected.tech === example.tech}" v-for="example in examples" v-on:click="selected = example">{{example.tech}}</div>
      </div>
      <pre v-bind:class="'language-' + selected.language">
      <code v-bind:class="'language-' + selected.language" v-html="selected.code"></code>
    </pre>
    </div>`,
    data: {
      examples,
      selected: examples[1]
    },
    methods: {
      selectExample: function() {
        debugger;
      }
    }
  })
})();