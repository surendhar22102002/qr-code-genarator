import React, { useState } from 'react'
import logo from './logo.svg';


export const QrCode = () => {

    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrCodeData, setQrCodeData] = useState("");
    const [qrimgSize, setQrImgSize] = useState(20);

    async function generateQRcode() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrimgSize}*${qrimgSize}&data=${encodeURIComponent(qrCodeData)}`
            setImg(url);
        } catch (error) {
            console.error("Error generating QR Code", error);
        } finally {
            setLoading(false);
        }
    }
    function downloadQrode() {
        fetch(img)
            .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "QRcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    //     .then((response) => response.blob());
    //         .catch ((error) => {
    // console.error("Error Downloading QR Code", error)});
    }

return (
    <>
        <div className='flex flex-col items-center justify-center w-[100%] h-[100vh]'>
            <h2 className='text-3xl text-green-500'>QR Code Generater</h2>
            {loading && <p className='text-2xl mt-[40px] text-red-500'>Please Wait...</p>}

            <div className='flex flex-col justify-center'>
                <div className='p-5 mt-5 mb-5'>

                    {img && <img src={img} alt="" height={400} width={400} />}
                </div>

                <div className='p-4 flex flex-col'>
                    <label>Data for QR Code : </label>
                    <input type="text" placeholder='Enter date for QR Code' className='border-2 border-blue-400 rounded-md  px-5 py-3 mt-2' value={qrCodeData} onChange={(e) => setQrCodeData(e.target.value)} />
                </div>

                {/* <div className='p-4 flex flex-col'>
                        <label>Image Size (e.g., 100) :</label>
                        <input type="text" placeholder='Enter image Size' className='border-2 border-blue-400 rounded-md px-5 py-3 mt-2' value={qrimgSize} onChange={(e) => setQrImgSize(e.target.value) }/>
                    </div>  */}

                <div className='flex items-center justify-center'>
                    <button className='border-none rounded-md m-2 bg-green-600 text-white px-2 py-3 hover:bg-green-700' onClick={generateQRcode} disabled={loading}>Generate QR Code</button>
                    <button className='border-none rounded-md m-2 bg-green-600 text-white px-2 py-3 hover:bg-green-700' onClick={downloadQrode}>Download QR Code</button>
                </div>
            </div>
            <h1 className='text-[20px] mt-4'>This website created by <span className='text-red-500'>Surendhar</span></h1>
        </div>
    </>
)
}
