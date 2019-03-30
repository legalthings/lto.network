 const pins = [
              {
                "name": "Netherlands",
                "coords": {
                  "x": 511,
                  "y": 171
                },
                "tooltip": {
                  "description": "Shipment of waste verified",
                  "icon": "assets/clients/capptions.svg"
                }
              },
              {
                "name": "Netherlands",
                "coords": {
                  "x": 562,
                  "y": 231
                },
                "tooltip": {
                  "description": "Audit report anchored",
                  "icon": "assets/clients/certik.svg"
                }
              },
              {
                "name": "Netherlands",
                "coords": {
                  "x": 485,
                  "y": 254
                },
                "tooltip": {
                  "description": "Approve permit issuance",
                  "icon": "assets/clients/ilt.svg"
                }
              },
              {
                "name": "Netherlands",
                "coords": {
                  "x": 587,
                  "y": 114
                },
                "tooltip": {
                  "description": "NDA accepted by counterparty",
                  "icon": "assets/clients/quislex.svg"
                }
              },
              {
                "name": "Netherlands",
                "coords": {
                  "x": 230,
                  "y": 111
                },
                "tooltip": {
                  "description": "Royalty contracts verified",
                  "icon": "assets/clients/cloud9.png"
                }
              },
              {
                "name": "Netherlands",
                "coords": {
                  "x": 325,
                  "y": 241
                },
                "tooltip": {
                  "description": "Agreement pending for signature",
                  "icon": "assets/clients/signrequest-alt.svg"
                }
              },
              {
                "name": "Netherlands",
                "coords": {
                  "x": 445,
                  "y": 153
                },
                "tooltip": {
                  "description": "Fact sheet waiting for approval",
                  "icon": "assets/clients/mseven.png"
                }
              }
            ];

            function init() {
              let currentPin = 0;
              const _map = document.getElementById('map');

              for (let i = 0; i < pins.length; i++) {
                const pin = pins[i];
                const _node = document.createElement('div');
                _node.classList.add('pin');
                _node.id = 'pin' + i;
                _node.setAttribute('style', 'left:' + pin.coords.x + 'px;top:' + pin.coords.y + 'px;');
                _map.appendChild(_node);
              }

              setInterval(() => {
                const pinData = pins[currentPin];
                const pin = document.getElementById('pin' + currentPin);

                document.querySelectorAll('.cardForMap').forEach((card) => {
                  if (card) {
                    card.classList.add('exiting');

                    setTimeout(() => {
                      card.remove();
                    }, 650);
                  }
                });

                const _node = document.createElement('div');
                _node.classList.add('cardForMap');

                if (pinData.tooltip) {
                  _node.innerHTML = `
                    <img src="${pinData.tooltip.icon}"/>
                    <p class="has-text-dark">${pinData.tooltip.description}</p>
                  `;
                  pin.appendChild(_node);
                }

                if (currentPin < pins.length - 1) {
                  currentPin++;
                } else {
                  currentPin = 0;
                }
              }, 2500)
            }