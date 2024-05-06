
import React,{useState , useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts';
import {Select , Button} from 'antd';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Layout from "../components/Layout";



function Barchart({data}){
  return(
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        
        <Bar radius={[5,5,0,0]} dataKey="value" fill="#8884d8" shape={Rectangle} activeBar={<Rectangle fill="yellow" stroke="blue" />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function Chart(){

    const {id} = useParams()
    const [ChartData,setChartData] = useState(null);
    const [name, setName] = useState("");
    const [formdata, setFormData] = useState({
      time: ''
  });
  const navigate = useNavigate();
    

    useEffect(()=>{
        axios.post("/exceldata/agg/"+id,{time:formdata.time})
        .then(res => {console.log(res);
            const data = [
                {name: "Name",value:res.data[0].Name},
                {name: "empNo",value:res.data[0].empNo},
                {name: "Grade A", value: res.data[0].totalGrade_A_Cuts},
                {name: "Grade B", value: res.data[0].totalGrade_B_Cuts},
                {name: "Grade C", value: res.data[0].totalGrade_C_Cuts},
                {name: "Grade F", value: res.data[0].totalGrade_F_Cuts},
                {name: "Yield Dry", value: res.data[0].totalYieldDry},
                {name: "Yield Wet", value: res.data[0].totalYieldCutsWet
              }
            ];
            setChartData(data);
            setName(res.data[0].Name)
            
    })
        .catch(err => console.log(err));

    },[formdata.time])

    if (!ChartData) {
      return <div>Loading...</div>;
  }

    const firstchart = ChartData.filter(item => item.name === "Grade A" || item.name === "Grade B" || item.name === "Grade C" || item.name === "Grade F")
    const secondchart = ChartData.filter(item => item.name === "Yield Dry" || item.name === "Yield Wet");
    
    return(
      
        <Layout>
      <div>
          <div style={{fontSize:20,textAlign:"center" , marginTop:"10px",marginBottom:"20px",boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"}}>
            {name}
          </div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
          <Button type="primary" onClick = {() => navigate(`/com/${id}`)}>compare</Button>
          
        <Select style={{width:"150px"}}
                placeholder="Select a Time period"
                onChange={(value)=>{
                    console.log(value);
                    setFormData({...formdata, time: value})
                }}
                
            >
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>

            </Select>
        
          </div>
          <div style={{marginBottom:"40px"}}>

          

          </div>
      
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div style={{ flex:1}}>
            <div style={{textAlign:"center",fontSize:20,fontWeight:"500",marginBottom:"10px"}}>Cuts Grade metrics</div>
            <Barchart data={firstchart}></Barchart>
          </div>
          <div style={{ flex:1}}>
            <div style={{textAlign:"center",fontSize:20,fontWeight:"500",marginBottom:"10px"}}>Yield metrics</div>
            <Barchart data={secondchart}></Barchart>
          </div>
          
        </div>
        
      
      </div>
      </Layout>
      
    )
   
}

export default Chart;