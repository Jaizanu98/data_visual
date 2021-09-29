import { useEffect, useState } from "react";
import app_config from "../../config";
import { Bar } from 'react-chartjs-2';


const DataDetail=(props)=>{
  const data = props.userData;

  const graph = {
  
      labels: [data.brand],
      datasets: [
        {
          label: 'pice of shoes',
          data: [data.price],
          backgroundColor: [
            'black'
          ],
          borderColor: [
           'white'
          ],
          borderWidth: 1,
          
        },
      ],
    };
    
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              
              beginAtZero: true,
            },
          },
        ],
      },
    };
    
    return(
      
      <Bar  data={graph} options={options} />
    
    )
}

const Chart=()=>{
  const url=app_config.api_url

  const [Productlist, setProductlist] = useState()
  const [loading, setloading] = useState(true)

  const fetchUserData = () => {
      fetch(url + '/product/getall')
     .then(res => res.json())
     .then((data) => {
         console.log(data);
         setProductlist(data);
         setloading(false);
     })}
     useEffect(() => {
         fetchUserData(setloading);
     }, [])
  
const ShowData=()=>{
  if(!loading){
 
  return(
      <div style={{background:"white"}}>
      <div className='header'>
        <h1 className='title'>Charts</h1>
        <div className='links'>
         
        </div>
      </div>
      {
          Productlist.map((user)=>{
              return(
                  <DataDetail userData={user}></DataDetail>
              )
          })
      }
    </div>
  )

}
else{
  return(
      <h1>Still Loading!!!</h1>
  )
}
}
return(
  <div>{ShowData()}</div>
)
}

export default Chart