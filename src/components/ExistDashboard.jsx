import axios from "axios";
import { useEffect, useState } from "react";
import style from "./existdash.module.css"

const ExistDashboard = () => {
    const [user, setUser] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("")
    const [welcome,setWelcome]=useState("")
    const [verify, setVerify] = useState(false);
    const [price,setPrice]=useState([])
    const [passverify, setPassVerify] = useState(false);
    let [goog,setGoog]=useState("")
    let [tsla,setTsla]=useState("")
    let [amzn,setAmzn]=useState("")
    let [meta,setMeta]=useState("")
    let [nvda,setNvda]=useState("")
    useEffect(() => {
        axios.get("/api/users")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);
   useEffect(()=>{ 
    
    if(verify){
    const intervalId = setInterval(() => {
            axios.get("/api/stocks")
            .then((res)=>{
                let Data=res.data
                setGoog(Data.GOOG)
                setAmzn(Data.AMZN)
                setMeta(Data.META)
                setNvda(Data.NVDA)
                setTsla(Data.TSLA)
                setPrice(
                    stocks.map((stock)=>{
                        console.log(stock);
                        if(stock=="GOOG"){
                            return `GOOG - ${goog}`
                        }else if(stock=="AMZN"){
                            return `AMZN - ${amzn}`
                        }else if(stock=="NVDA"){
                            return `NVDA - ${nvda}`
                        }else if(stock=="META"){
                            return `META - ${meta}`
                        }else if(stock=="TSLA"){
                            return `TSLA - ${tsla}`
                        }

                    })
                )
                console.log("price",price);
            })
            .catch((er)=>{console.log(er)})
            
    }, 2000);
    
    return () => clearInterval(intervalId); 
}
   })
    const checkEmail = () => {
        let validUser = false;
        let validpass=false;
        user.forEach((use) => {
            if (use.Email === email) {
                validUser = true;
                setVerify(true);
                if(use.Password===password){
                    validpass=true;
                    setPassVerify(true)
                    setStocks(use.Stocks.map(stock => stock));
                    setWelcome(use.Email)
                    console.log(stocks);
                    setEmail("")
                    setPassword("")
                }
            }
        });
        if (!validUser) {
            alert("Invalid Email");
        }else if(!validpass){
            alert("Invalid Password")
        }
    };
    return (
        <div id={style.exist}>
            <h1>Login With Email</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                checkEmail();
            }} id={style.form}>
                <label htmlFor="">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                <button type="submit">Login</button>
            </form>
            {verify && passverify &&(
                <div id={style.table_div}>
                    <h2>Welcome {welcome}</h2>
                <table id={style.table}>
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {price.map((stock, index) => {
                            const [name, value] = stock.split(' - ');
                            return (
                                <tr key={index}>
                                    <td>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );
};
export default ExistDashboard;