import axios from "axios";
import { useEffect, useState } from "react";

const Stocks = ['GOOG','TSLA','AMZN','META','NVDA'];

const Update=()=>{
    let [goog,setGoog]=useState("")
    let [tsla,setTsla]=useState("")
    let [amzn,setAmzn]=useState("")
    let [meta,setMeta]=useState("")
    let [nvda,setNvda]=useState("")

    let handleData=()=>{
        let obj={
        GOOG:goog,
        TSLA:tsla,
        AMZN:amzn,
        META:meta,
        NVDA:nvda,
        }
        axios.put("http://localhost:5050/stocks/4141",obj)
        .then(()=>(console.log("data send")))
        .catch((er)=>{console.log(er)})
    }
    useEffect(() => {
       const intervalId= setInterval(() => {
                setGoog(Math.floor(Math.random() * 1000))
                setAmzn(Math.floor(Math.random() * 1000))
                setMeta(Math.floor(Math.random() * 1000))
                setNvda(Math.floor(Math.random() * 1000))
                setTsla(Math.floor(Math.random() * 1000))
        handleData()
            }, 2000);
            return () => clearInterval(intervalId);
    });
    return(
        <div>

        </div>
    )
}
export default Update