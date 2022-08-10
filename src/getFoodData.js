const fetch = require("node-fetch");

const params={
    api_key: 'yYvXsqg0rBw2qm8s90MOKe0ZS8GoVTQubns3lqGA',
    query: 'cheddar cheese',
    dataType: ["Survey (FNDDS)"],
    pagesize:5,
}
const api_url = 
`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}
&query=${encodeURIComponent(params.query)}
&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`;

function getData(){
    return fetch(api_url)
    .then(response => response.json())
}
getData().then(data=> console.log(data.foods[0].foodNutrients));