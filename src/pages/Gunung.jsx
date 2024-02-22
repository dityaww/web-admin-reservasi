import React, { useState, useEffect } from 'react'
import { detailGunung } from '../api/api'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Gn from '../assets/gn.png'
import Hrg from '../assets/harga.png'
import Lottie from 'react-lottie';
import animationData from '../assets/load-data.json';

function Gunung() {
  const [data, setData] = useState(null)
  const [foto, setFoto] = useState([])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    const fetch = async () => {
        const res = await detailGunung()
        return res.data
    }

    setTimeout(() => {
        fetch().then((res) => {
            setData(res);
            setFoto(res.photo[0])
        }).catch((err) => {
            console.log(err);
        })
    }, 1500);


  }, [data, foto])
  

  return (
    <div className="flex flex-row h-screen w-full">
      <Sidebar />
      <section className="px-16 flex-1 pt-14 h-screen overflow-y-auto">
        <Navbar/>

        <div className="mt-10">
            <h1 className='font-regular text-2xl text-neutral-600 antialiased'>Informasi Gunung</h1>
            <div className="grid grid-cols-2 gap-5 mt-5">
                <div className="w-full h-72 overflow-hidden rounded-lg">
                    <img src={foto} alt="no-img" />
                </div>
                
                {/* {foto.length !== 0 && 
                    foto.map((items) => {
                        return(
                            <div className="w-full h-72 overflow-hidden rounded-lg">
                                <img src={items} alt="no-img" />
                            </div>
                        )
                    })
                } */}
            </div>

            {data === null ? (
                <div className='flex items-center justify-center'>
                    <Lottie options={defaultOptions} height={300} width={300} />
                </div>
            ) : (
                <div className="mt-5 flex flex-col gap-5">
                    {/* top */}
                    <div className="flex flex-col gap-2">
                        <p className='text-4xl font-bold capitalize subpixel-antialiased text-gray-900'>Gunung {data?.name}</p>
                        <p className='text-lg text-gray-600'>via {data?.basecamp}</p>
                    </div>

                    <div className="flex flex-row gap-10">
                        <div className="flex gap-2 items-center">
                            <img src={Gn} alt="no-img" className='w-10'/>
                            <p>{data?.height} mdpl</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <img src={Hrg} alt="no-img" className='w-8'/>
                            <p className='text-emerald-700 font-bold italic'>{
                                new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                }).format(data?.ticket_price || 0)
                            }</p>
                        </div>
                    </div>

                    {/* desc */}
                    <div className="flex flex-col mb-20 gap-3">
                        <p className='font-bold text-xl text-gray-900'>Deskripsi</p>
                        <p className='leading-7 text-lg subpixel-antialiased text-gray-700'>{data?.description}</p>
                    </div>
                </div>
            )}

        </div>

      </section>
    </div>
  )
}

export default Gunung