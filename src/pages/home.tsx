import { useNavigate } from "react-router-dom"

import { useState } from "react";


const home = () => {

    const navigate = useNavigate();
    const [fname, setfname] = useState("");
    const [mnumber, setmnumber] = useState<Number>();

    return (
        <div className="h-screen flex justify-center items-center">
            <form className="flex gap-2 flex-col w-fit border p-10 rounded-xl">
                <div className="flex flex-col gap-0.5">
                    <label className="text-xs" htmlFor="fname">First Name</label>
                    <input id="fname" type="text" placeholder="First Name" maxLength={20} className="p-2 rounded border" value={fname} onChange={(e) => setfname(e.target.value)} />
                </div>
                <div className="flex flex-col gap-0.5">
                    <label className="text-xs" htmlFor="mnumber">Mobile Number</label>
                    <input id="mnumber" type="number" placeholder="Mobile Number" className="p-2 rounded border" value={Number(mnumber)} onChange={(e) => setmnumber(Number(e.target.value))} />
                </div>
                <button onClick={() => {
                    localStorage.setItem("user", JSON.stringify({ fname, mnumber }))
                    navigate("/map")
                }} type="submit" className="p-2 rounded bg-green-400 border hover:bg-green-600 cursor-pointer mt-3">Submit</button>
            </form>
        </div>
    )
}

export default home
