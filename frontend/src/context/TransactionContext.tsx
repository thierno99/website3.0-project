declare var window: any;
import React, { createContext, useEffect, useState }  from "react";
import PropTypes from 'prop-types';

import { ethers } from "ethers";
import { contractABI, CONTRACTADDRESS } from './../utils/constants';

export interface TransactionContextProps{
    connectWallet:() => Promise<void>;
    currentAccount:string;
    handleChange:(e: any, name: string) => void;
    formData:{
        addressTo: string;
        amount: string;
        keyword: string;
        message: string;
    };
    
    setFormData:React.Dispatch<React.SetStateAction<{
        addressTo: string;
        amount: string;
        keyword: string;
        message: string;
    }>>;

    sendTransaction:() => Promise<void>;

    transactions: never[];
    isLoading:boolean;

}

export const TransactionContext = createContext<TransactionContextProps>({} as TransactionContextProps);

const { ethereum } = window; 

const getEtereumContact = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(CONTRACTADDRESS,contractABI,signer);

    return TransactionContract;
}
interface TransactionProviderProps{
    children:any
}
export const TransactionProvider= ({children}:TransactionProviderProps) => {
    const [currentAccount, setCurrentAccount] = useState('');

    const [formData, setFormData] = useState({addressTo:'',amount:'', keyword:'',message:''});
    const [isLoading, setIsLoading] = useState(false);

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e:any,name:string) => {
        setFormData((data)=>({...data,[name]:e.target.value}))
    }

    const getAllTransactions = async () => {
        const transactionContract = getEtereumContact();
        try {
            if(!ethereum) return alert("Vous devez installer MetaMask pour tester cette application!");

            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((trans:any,i:number)=>{
                return {
                    id:i,
                    addressTo:trans.receiver,
                    addressFrom: trans.sender,
                    timestamp: new Date(trans.timestamp.toNumber()*1000).toLocaleString(),
                    message: trans.message,
                    keyword: trans.keyword,
                    amount: parseInt(trans.amount._hex) / (10**18)
                }
            })

            setTransactions(structuredTransactions);
            console.log(structuredTransactions);
            console.log(availableTransactions);
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {

        try {

            if(!ethereum) return alert("Vous devez installer MetaMask pour tester cette application!");
    
            const accounts= await ethereum.request({method:'eth_accounts'});
    
            if(accounts.length){
                setCurrentAccount(accounts[0]);
    
                getAllTransactions();
            }else{
                console.log("nous n'avons trouvé aucun compte");
            }
            console.log(accounts);
            
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object.");
        }

    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEtereumContact();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount",transactionCount);

        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Vous devez installer MetaMask pour tester cette application!");
    
            const accounts= await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object.");
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Vous devez installer MetaMask pour tester cette application!");
            const{addressTo,
                amount,
                keyword,
                message
            }= formData;
            const transactionContract = getEtereumContact();

            const parseAmount =ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params:[
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: '0x5208', //21'000 GWEI
                        value: parseAmount._hex,
                    }
                ]
            });

            const transactionHash = await transactionContract.addToBlockChain(addressTo,parseAmount,message,keyword);
            setIsLoading(true);
            console.log(`Traitement en cours -${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);

            console.log(`Traitement Terminée -${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());
            window.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);
    return(
        <TransactionContext.Provider 
            value={{
                connectWallet:connectWallet,
                currentAccount:currentAccount,
                handleChange:handleChange,formData:formData, 
                setFormData:setFormData,
                sendTransaction:sendTransaction,
                transactions:transactions,
                isLoading:isLoading
            }}
        >
            {
                children
            }
        </TransactionContext.Provider>
    )
}