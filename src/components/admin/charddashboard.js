import { useEffect, useState } from "react";
import{Bar} from"react-chartjs-2"
import app_config from "../../config";

const DataDetail=(props)=>{
  const data = props.userData;

  const productList  = []
  
   const graph={
       labels:[],
       datasets:[
           {
               data:[]
           }
       ]
       
   }
  
   for(let product of productList){
  data.labels.push(product.brand);
  data.datasets[0].data.push(product.price)
   }
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
      
      <Bar data={graph} options={options} />
    
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
      <h1>Still Loading</h1>
  )
}
}
return(
  <div>{ShowData()}</div>
)
}

export default Chart