import { useEffect, useState } from "react";
import axios from "axios";
import style from "./newdashboard.module.css"
import { useNavigate } from "react-router";
const supportedStocks = ['GOOG','TSLA','AMZN','META','NVDA'];

const NewDashboard =()=>{
    let [email, setEmail]=useState("");
    let [password,setPassword]=useState("")
    let [stocks, setStocks]=useState([]);
    let [exist, setExist] =useState(false);
    let [data, setData] =useState([]);
    let  navigate=useNavigate()

    const handleSubscribe= (stock)=>{
        if(!stocks.includes(stock)){
            setStocks([...stocks, stock]);
        }
    };
    const handleClick=(event)=>{
        event.target.style.color="white";
        event.target.style.backgroundColor="black"
    }
    useEffect(()=>{
        axios.get('/api/users')
            .then((response) => {
                setData(response.data);
                console.log("got data",response.data);
            })
            .catch((error) => {
                console.log(error);
                console.log("some Error occured");
            });
    },[]);
    const handleData = () => {
        const emailExists = data.some((mail) => mail.Email === email);
        if (emailExists) {
            setExist(true);
        } else {
            if(stocks.length>0){
                const obj = {
                    Email: email,
                    Password:password,
                    Stocks: stocks
                };
                axios.post('/api/users', obj)
                    .then(() => {
                        console.log("data sent");
                        setData([...data, obj]); 
                        navigate("/exist")
                        })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else{
                alert("subscribe to stocks")
            }
        }
    };
    useEffect(() => {
        if (exist) {
            alert("Email already exists");
            setExist(false);
            setEmail("");
            setPassword("")
              }
    }, [exist]);
    return (
      <div id={style.newdash}>
        <div>
            <h1 id={style.header}>Create Account</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleData();
            }} id={style.form}>
                <label htmlFor="">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                <h3>Stocks</h3>
                <div id={style.stock_div}>
                {supportedStocks.map((stock) => (
                    <button key={stock} onClick={(e) => {
                        e.preventDefault();
                        handleSubscribe(stock);
                        handleClick(e);
                    }} id={style.stock} className="stock">
                        {stock}
                    </button>
                ))}
                </div>
                <button type="Submit" id={style.submit}>Submit</button>
            </form>
        </div>
        </div>
    );
};
export default NewDashboard;