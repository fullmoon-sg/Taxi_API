async function getTaxiCoordinates()
{
    let url = "https://api.data.gov.sg/v1/transport/taxi-availability";
   let response = await axios.get(url);
   return response.data;
}

async function main()
{
    let taxis = await getTaxiCoordinates();
    let output = document.querySelector("#output");
    console.log(taxis.features[0].geometry.coordinates.length);
    for (let i =0; i < taxis.features[0].geometry.coordinates.length; i++ )
    {
        for (j=0; j < taxis.features[0].geometry.coordinates.length;j++)
        {
        let liElement = document.createElement('li');
        liElement.innerHTML = taxis.features[0].geometry.coordinates[i][j];
        output.appendChild(liElement);}
    }
    
}

setInterval(function(){
    main();
}, 3000);