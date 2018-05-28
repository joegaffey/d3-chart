const template = document.createElement('template');
template.innerHTML = `
  <style>    
    .chart div {
      font: 10px sans-serif;
      background-color: steelblue;
      text-align: right;
      padding: 3px;
      margin: 1px;
      color: white;
    }
  </style>
  <div class="chart"></div>
`;

class D3Chart extends HTMLElement {
  
  constructor()  {
    super();    
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
  connectedCallback() {
    let chart = this.shadowRoot.querySelector('.chart');
    
    d3.select(chart)
      .selectAll("div")
      .data(JSON.parse(this.getAttribute('data')))
        .enter()
        .append("div")
        .style("width", function(d) { return d + "px"; })
        .text(function(d) { return d; });    
  }
}

customElements.define('d3-chart', D3Chart);

    