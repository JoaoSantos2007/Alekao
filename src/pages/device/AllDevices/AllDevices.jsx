import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import './AllDevices.css'

import DeviceCard from '../../../components/device/DeviceCard'
import Loader from '../../../components/Loader'
import api from '../../../assets/services/api.js'
import addImg from '../../../assets/icon/add.svg'


export const AllDevices = () => {
    const [devices,setDevices] = useState()

    useEffect(() => {
        api.get("/device")
        .then(res => {
            console.log(res)
            setDevices(res.data.devices)
        })
        .catch(err => {
            console.error(err)
        })
    },[])

    if(!devices) return <Loader />

    return(
        <>
            <main className='container'>
                <div className='container__header'>
                    <h1 className='container__name'>Devices</h1>
                </div>

                <Link to='/device/create' className='createDevice__btn'>
                    <img src={addImg} className='createDevice__img' alt='create device btn'/>
                </Link>

                <section className='deviceCards'>
                    {devices.map((device) => {
                        console.log(device)
                        return <DeviceCard key={device._id} id={device._id} name={device.name} type={device.type} colorID={device.colorID} />
                    })} 
                </section>
            </main>
        </>
    )
}