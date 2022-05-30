import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { useContext } from 'react';
import { shortenAdress } from './../utils/ShortenAdress';
import useFectch from './../hooks/useFetch';
interface TransactionCardProps{
    id: number;
    url: string;
    message: string;
    timestamp: string;
    addressFrom: string;
    amount: string;
    addressTo: string;
    keyword: string;
    key:number;
}
const TransactionCard = ( {id, url, message, timestamp, addressFrom, amount,addressTo,keyword}:TransactionCardProps) =>{
    const gifUrl = useFectch({keyword:keyword})
    return(
        <div className="bg-[#050905] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className=" text-green-200 text-base">De: {shortenAdress(addressFrom)}</p>
                    </a>

                    <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className=" text-green-200 text-base">A: {shortenAdress(addressTo)}</p>
                    </a>

                    <div className="text-white text-base">Montant: {amount} ETH</div>

                    {
                        message &&(
                            <>
                                <br />
                                <p className="text-white text-base">Message: {message}</p>
                            </>
                        )
                    }

                </div>
                <img src={gifUrl || url} alt="gif" className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"/>

                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>
            </div>
        </div>
    );
}

const Transactions = () =>{
    
    const {currentAccount, transactions} =useContext(TransactionContext)
    
    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {
                    currentAccount?(
                        <h3 className="text-white text-3xl text-center m-2">
                            Dernières Transactions
                        </h3>
                    ):
                    (
                        <h3 className="text-white text-3xl text-center m-2">
                            Connecter votre compte pour voir les dernières transactions
                        </h3>
                    )
                }

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {
                        transactions.reverse().map((transaction:any, index)=>(
                            <TransactionCard
                                id={0} 
                                url={transaction.url} 
                                message={transaction.message} 
                                timestamp={transaction.timestamp} 
                                addressFrom={transaction.addressFrom} 
                                amount={transaction.amount} 
                                addressTo={transaction.addressTo} 
                                keyword={transaction.keyword} 
                                key={index}    
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Transactions;