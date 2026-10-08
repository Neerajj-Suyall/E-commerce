import { useEffect, useState } from "react";
import constant from "../../constant"
import "../App.css"


function Banner() {


        const [image1, setImage1] = useState(null);
        const [image2, setImage2] = useState(null);
        const [image3, setImage3] = useState(null);
        const [image4, setImage4] = useState(null);
        const [image5, setImage5] = useState(null);
        const [image6, setImage6] = useState(null);
        const [image7, setImage7] = useState(null);
        const [image8, setImage8] = useState(null);
        const [image9, setImage9] = useState(null);
        const [image10, setImage10] = useState(null);


        const [banner1, setbanner1] = useState(null);
        const [banner2, setbanner2] = useState(null);
        const [banner3, setbanner3] = useState(null);
        const [banner4, setbanner4] = useState(null);
        const [banner5, setbanner5] = useState(null);
        const [banner6, setbanner6] = useState(null);
        const [banner7, setbanner7] = useState(null);
        const [banner8, setbanner8] = useState(null);
        const [banner9, setbanner9] = useState(null);
        const [banner10, setbanner10] = useState(null);


        // const [state, setState] = useState(''); 


        //image uploading code start
        //
        // base 64 code
        // const convertToBase64 = (file) => {
        //         return new Promise((resolve, reject) => {
        //                 const reader = new FileReader();
        //                 reader.readAsDataURL(file);
        //                 reader.onload = () => {
        //                 // sirf Base64 string
        //                 resolve(reader.result.split(",")[1]);
        //                 };
        //                 reader.onerror = (error) => reject(error);
        //         });
        //         };


        //image uploading code End
        const handleUpdateBanner  = async () => {
                const formData = new FormData();

                // Upload images individually without a loop
                if (image1) formData.append("banner1", image1);
                if (image2) formData.append("banner2", image2);
                if (image3) formData.append("banner3", image3);
                if (image4) formData.append("banner4", image4);
                if (image5) formData.append("banner5", image5);
                if (image6) formData.append("banner6", image6);
                if (image7) formData.append("banner7", image7);
                if (image8) formData.append("banner8", image8);
                if (image9) formData.append("banner9", image9);
                if (image10) formData.append("banner10", image10);

                // Check at least one image
                if (
                        !image1 && !image2 && !image3 && !image4 && !image5 &&
                        !image6 && !image7 && !image8 && !image9 && !image10
                ) {
                        alert("Please select at least one image.");
                        return;
                }

                // Add product data
                // formData.append("Banner", JSON.stringify([formData]));
                for (const [key, value] of formData.entries()) {
                        console.log(key, value);
                }
                

                try {
                        const response = await fetch(
                                `${constant.domain}/admin/EditBanner`,
                                {
                                        method: "POST",
                                        body: formData,
                                        credentials: "include"
                                }
                        );

                        if (!response.ok) {
                                throw new Error("Product upload failed");
                        }

                        const result = await response.json();

                        console.log("Banner added successfully:", result);
                        alert("Banner added successfully!");

                } catch (error) {
                        console.error("Banner upload error:", error);
                        alert(error.message || "Something went wrong.");
                }
        };



        useEffect(() => {
                fetch(`${constant.domain}/admin/AllBanner`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        console.log(res);
                        return res.json();
                }).then(res => {
                        console.log(res);
                        if (res[0]?.banner1 != null ) {
                        setbanner1(res[0].banner1);
                        setbanner2(res[0].banner2);
                        setbanner3(res[0].banner3);
                        setbanner4(res[0].banner4);
                        setbanner5(res[0].banner5);
                        setbanner6(res[0].banner6);
                        setbanner7(res[0].banner7);
                        setbanner8(res[0].banner8);
                        setbanner9(res[0].banner9);
                        setbanner10(res[0].banner10);
                                
                        }
                        

                });
        }, [])




        return (
                <>

                        {/* <div className=" flex flex-col  items-center min-w-[100vw] min-h-[100vh] p-[50px]  bg-gray-600  pt-[70px]" onClick={handleProjectClick}> */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3  flex flex-col  items-center ml-[15vw] w-[85vw] h-[100vh] p-[50px]   bg-gray-200 pt-[70px]">

                                {/* Image 1 */}
                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image1 ? (
                                                <img
                                                        src={URL.createObjectURL(image1)}
                                                        alt="Image 1"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 1 +
                                                // </div>
                                                <img
                                                        src={banner1}
                                                        alt="Image 1"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage1(e.target.files[0] || null)}
                                        />
                                </label>

                                {/* Image 2 */}
                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image2 ? (
                                                <img
                                                        src={URL.createObjectURL(image2)}
                                                        alt="Image 2"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 2 +
                                                // </div>
                                                <img
                                                        src={banner2}
                                                        alt="Image 2"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage2(e.target.files[0] || null)}
                                        />
                                </label>

                                {/* Image 3 */}
                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image3 ? (
                                                <img
                                                        src={URL.createObjectURL(image3)}
                                                        alt="Image 3"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 3 +
                                                // </div>
                                                <img
                                                        src={banner3}
                                                        alt="Image 3"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage3(e.target.files[0] || null)}
                                        />
                                </label>

                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image4 ? (
                                                <img
                                                        src={URL.createObjectURL(image4)}
                                                        alt="Image 4"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 4 +
                                                // </div>
                                                <img
                                                        src={banner4}
                                                        alt="Image 4"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage4(e.target.files[0] || null)}
                                        />
                                </label>

                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image5 ? (
                                                <img
                                                        src={URL.createObjectURL(image5)}
                                                        alt="Image 5"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 5 +
                                                // </div>
                                                        <img
                                                        src={banner5}
                                                        alt="Image 5"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage5(e.target.files[0] || null)}
                                        />
                                </label>
                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image6 ? (
                                                <img
                                                        src={URL.createObjectURL(image6)}
                                                        alt="Image 6"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 6 +
                                                // </div>
                                                <img
                                                        src={banner6}
                                                        alt="Image 6"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage6(e.target.files[0] || null)}
                                        />
                                </label>

                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image7 ? (
                                                <img
                                                        src={URL.createObjectURL(image7)}
                                                        alt="Image 7"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 7 +
                                                // </div>
                                                <img
                                                        src={banner7}
                                                        alt="Image 7"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage7(e.target.files[0] || null)}
                                        />
                                </label>

                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image8 ? (
                                                <img
                                                        src={URL.createObjectURL(image8)}
                                                        alt="Image 8"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 8 +
                                                // </div>
                                                <img
                                                        src={banner8}
                                                        alt="Image 8"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage8(e.target.files[0] || null)}
                                        />
                                </label>
                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image9 ? (
                                                <img
                                                        src={URL.createObjectURL(image9)}
                                                        alt="Image 9"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 9 +
                                                // </div>
                                                <img
                                                        src={banner9}
                                                        alt="Image 9"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage9(e.target.files[0] || null)}
                                        />
                                </label>
                                <label className="border border-dashed p-3 rounded-lg cursor-pointer">
                                        {image10 ? (
                                                <img
                                                        src={URL.createObjectURL(image10)}
                                                        alt="Image 10"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        ) : (
                                                // <div className="h-32 flex items-center justify-center">
                                                //         Image 10 +
                                                // </div>
                                                <img
                                                        src={banner10}
                                                        alt="Image 10"
                                                        className="w-full aspect-square object-cover"
                                                />
                                        )}

                                        <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setImage10(e.target.files[0] || null)}
                                        />
                                </label>
                                
                                <button
                                type="button"
                                onClick={handleUpdateBanner}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg"
                        >
                                Add Banners
                        </button>



                        </div>

                        



                </>
        );
};

export default Banner



// FormData  b use karna hai 