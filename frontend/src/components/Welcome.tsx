
import React, { useContext } from "react";
import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { TransactionContext } from '../context/TransactionContext';

import { Loader } from './';
import { FC } from "react";
import { shortenAdress } from "../utils/ShortenAdress";
const commonStyles="min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
interface InuptProps{
    placeholder:string,
    name:string,
    type:string,
    handleChange:(e: any, name: string) => void;
}
const Input:FC<InuptProps> = (props:InuptProps) => {
    const {placeholder, name, type, handleChange}=props;
    return(
        <input 
            type= {type}
            placeholder={placeholder}
            name={name}
            onChange={(e)=>handleChange(e,name)}
            step="0.0001"
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    )
}
const Welcome = () =>{
    const { connectWallet, currentAccount, formData, setFormData, handleChange,sendTransaction,isLoading } = useContext(TransactionContext);

    const handleSubmit = (e:any) => {
        const{addressTo,
            amount,
            keyword,
            message
        }= formData;
        e.preventDefault();
        console.log(addressTo,
            amount,
            keyword,
            message)
        if(!addressTo || !amount || !keyword || !message)
        return;
        
        sendTransaction();
    }
    return(
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5pxl text-white text-gradient py-1">
                        Envoyer de la crypto Monnaie
                        <br />
                        Partout dans le Monde
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Découvre le monde de la Cryptos. achète et vend de la cryptomonnaie facilement sur 
                        les vraie exchanges comme Binance, cryptos.com, coinbase, bybit ...
                    </p>
                    {
                        !currentAccount &&(
                            <button 
                                type="button" 
                                onClick={connectWallet}
                                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] px-5 py-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                            >
                                <p className="text-white text-base font-semibold">
                                    Connexion Wallet
                                </p>
                            </button>
                        )
                    }

                    <div className="grid sm:grid-cols-3 grid-cols-2  w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Cryptos
                        </div>

                        <div className={`${commonStyles}`}>
                            NFTs
                        </div>

                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Metavers
                        </div>

                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            BlockChain
                        </div>

                        <div className={`${commonStyles}`}>
                            Décentralisation
                        </div>

                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Web3.0
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 white-glassmorphism eth-card">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#000"/>
                                </div>
                                <BsInfoCircle fontSize={17} color="#000"/>
                            </div>
                            <div>
                                <p className="text-black font-light text-sm">
                                    Adresse
                                </p>
                                <p className="text-black font-light text-sm">
                                    {shortenAdress(currentAccount)}
                                </p>

                                <p className="text-gold font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder={"Adresse de destination"} name={"addressTo"} type={"text"} handleChange={handleChange}/>
                        <Input placeholder={"montant en ETH"} name={"amount"} type={"number"} handleChange={handleChange}/>
                        <Input placeholder={"mot-clé GIF"} name={"keyword"} type={"text"} handleChange={handleChange}/>
                        <Input placeholder={"Message"} name={"message"} type={"text"} handleChange={handleChange}/>

                        <div className="h-[1px] w-full bg-gray-400 my-2"></div>

                        {
                            isLoading?(
                                <Loader/>
                            ):
                            (
                                <button 
                                    type="button" 
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer" 
                                    onClick={handleSubmit}
                                >
                                    Envoyer
                                </button>
                            )
                        
                        }
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Welcome;