import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"
import app_config from "../../config";

const DataDetail = (props) => {
  const data = props.data;

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

  return (

    <Bar data={data} options={options} />

  )
}

const Chart = () => {
  const url = app_config.api_url

  const [Productlist, setProductlist] = useState({})
  const [loading, setloading] = useState(true)

  const fetchProductData = () => {
    fetch(url + '/product/getall')
      .then(res => res.json())
      .then((data) => {
        let temp_data = {
          labels: [],
          datasets: [
            {
              data: []
            }
          ]
        };

        for (let product of data) {
          temp_data.labels.push(product.brand);
          temp_data.datasets[0].data.push(product.price)
        }

        console.log(temp_data);
        setProductlist(temp_data);
        setloading(false);
      })
  }

  useEffect(() => {
    fetchProductData(setloading);
  }, [])

  const ShowData = () => {
    if (!loading) {

      return (
        <div style={{ background: "white" }}>
          <div className='header'>
            <h1 className='title'>Charts</h1>
            <div className='links'>

            </div>
          </div>
          {
            Productlist.map((user) => {
              return (
                <DataDetail data={Productlist}></DataDetail>
              )
            })
          }
        </div>
      )

    }
    else {
      return (
        <h1>Still Loading</h1>
      )
    }
  }
  return (
    <div>{ShowData()}</div>
  )
}

export default Chart