import { overlock } from "@/app/fonts"
import Image from "next/image"

export default function Tahubulatlogo(){
    return(
        <div
        className={`${overlock.className} flex flex-row antialiased items-center justify-start p-2 rounded-lg cursor-pointer`}>
            <Image src={"/favicon.png"} width={32} height={32} alt="Tahu Bulat Logo" />
            <p className="text-2xl">Tahu Bulat 25</p>
        </div>
        

    )

}