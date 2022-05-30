import { BsShieldCheck } from "react-icons/bs";
import {BiSearchAlt} from 'react-icons/bi'
import {RiHeart2Fill} from 'react-icons/ri'

interface ServicesCardProps{
    color:string;
    title:string;
    icon:any;
    subtitle:string;
}

const ServicesCard = ({color,title,icon,subtitle}:ServicesCardProps) =>{
    return(
        <div className="w-10/12 flex flex-row justify-start items-center white-glassmorphism p-2 m-1 cursor-pointer hover:shadow-xl">
            <div className={`w-8 h-8 rounded-full flex justify-center items-center ${color}`}>
                {
                    icon
                }
            </div>

            <div className="ml-5 flex flex-col flex-1">
                <h2 className="mt-2 text-white text-lg">{title}</h2>
                <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
            </div>
            
        </div>
    )
}
const Services = () =>{
    return(
        <div className="flex mf:flex-row flex-col w-full justify-center items-center gradient-bg-services">
            <div className="mf:w-6/12 w-full items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-center">
                    <h1 className="text-white text-3xl sm:text-4xl py-2 text-gradient text">
                        services que nous 
                            <br />
                        continuons à améliorer
                    </h1>
                </div>

            </div>

            <div className="mf:w-6/12 w-full flex-1 flex flex-col justify-start items-center ">
                <ServicesCard
                    color = "bg-[#29E353]"
                    title = "securité Garantie"
                    icon = {<BsShieldCheck fontSize={21} className="text-white"/>}
                    subtitle = "Le Web3.0 toc à votre porte"
                />
                <ServicesCard
                    color = "bg-[#0945FF]"
                    title = "Meilleur taux de change"
                    icon = {<BiSearchAlt fontSize={21} className="text-white"/>}
                    subtitle = "Le Web3.0 toc à votre porte"
                />
                <ServicesCard
                    color = "bg-[#F84550]"
                    title = "Transaction Rapide"
                    icon = {<RiHeart2Fill fontSize={21} className="text-white"/>}
                    subtitle = "Le Web3.0 toc à votre porte"
                />
            </div>

        </div>
    );
}

export default Services;