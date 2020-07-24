const input =document.getElementById('country-input')
const btn = document.getElementById('btn')
const table = document.getElementById('table')
const row = document.getElementById('first-row')
const ctx = document.getElementById('chart').getContext('2d')


//get data function
function getData(e){
    console.log('the bullock is out of the bullpen')
    const country= input.value
    if(input.value!==''){
        apiData()
            .then(res => res.json)
            .then(data => {
                const tr = document.createElement('tr')
                console.log(data);
                if(row.innerHTML=`
        <td>World-Wide</td>
        `){
                    row.innerHTML=`
          <td>Global Cases</td>
          <td>${data.Global.NewConfirmed}</td>
          <td>${data.Global.TotalConfirmed}</td>
          <td>${data.Global.NewDeaths}</td>
          <td>${data.Global.TotalDeaths}</td>
          <td>${data.Global.NewRecovered}</td>
          <td>${data.Global.TotalRecovered}</td>
         `
                }
                data.Countries.forEach(place=>{
                    if(place.Country === country){
                        console.log(place);
                        tr.innerHTML=`
            <td>${country}</td>
            <td>${place.NewConfirmed}</td>
            <td>${place.TotalConfirmed}</td>
            <td>${place.NewDeaths}</td>
            <td>${place.TotalDeaths}</td>
            <td>${place.NewRecovered}</td>
            <td>${place.TotalRecovered}</td>
            `
                        table.appendChild(tr)
                        input.value=''
                    }
                })
            })
    }else{
        alert('Pls enter something for getting data')
        alert('Error')
    }


    e.preventDefault()
}
//api process function
async function apiData(){
    const api = await fetch('https://api.covid19api.com/summary')

    const json= await api.json()

    return {
        json
    }
}


//event listeners
btn.addEventListener('click',getData)