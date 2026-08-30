import { useEffect, useState } from "react";
import ProductElement from "./ProductElement";
import constant from "../../constant"
import "../App.css"


function Product() {

        const [insertButton, setInsertButton] = useState(false);
        const [productSno, setProductSno] = useState(1);
        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [discount, setDiscount] = useState("");
        const [stock, setStock] = useState("");
        const [category, setcategory] = useState("");
        const [description, setDescription] = useState("");
        const [datas, setDatas] = useState([])
        const [count, setCount] = useState(null)
        const [images, setImages] = useState(Array(10).fill(null));

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
        const handleUpdateProduct = async () => {

                if (name?.trim() === "") return;
                if (price === "" || Number(price) < 1) return;
                if (stock === "" || Number(stock) < 1) return;
                if (category?.trim() === "") return;

                // Get only selected images
                const selectedImages = images.filter(Boolean);

                // Minimum 1 and maximum 10 images
                if (selectedImages.length < 1 || selectedImages.length > 10) {
                        alert("Please select minimum 1 and maximum 10 images.");
                        return;
                }

                // Product data
                const product = {
                        name: name,
                        price: price,
                        discount: discount,
                        stock: stock,
                        category: category,
                        description: description
                };

                // FormData
                const formData = new FormData();

                // Add every image separately
                selectedImages.forEach((image) => {
                        formData.append("images", image);
                });

                // Add product information
                formData.append(
                        "products",
                        JSON.stringify([product])
                );

                console.log("Product:", product);
                console.log("Selected images:", selectedImages);

                try {

                        const response = await fetch(
                                `${constant.domain}/admin/ProductAdd`,
                                {
                                        method: "POST",
                                        body: formData,
                                        credentials: "include"
                                }
                        );



                        console.log("Response:", response);

                        if (!response.ok) {
                                const errorData = await response.json();

                                throw new Error(
                                        errorData.message || "Product upload failed"
                                );
                        }

                        const result = await response.json();

                        console.log("Product added successfully:", result);

                } catch (error) {

                        console.error(
                                "Product upload error:",
                                error
                        );
                }
        };



        // const handleUpdateProduct = () => {

        //         console.log(newProducts);
        //         if (name?.trim() == "") return
        //         if (price === "" || Number(price) < 1) return;
        //         if (stock === "" || Number(stock) < 1) return;
        //         if (category?.trim() == "") return
        //         if (images.length < 1 || images.length > 10) return;



        //         console.log(newProducts);
        //         setNewProducts([{
        //                 name: name,
        //                 price: price,
        //                 discount: discount,
        //                 stock: stock,
        //                 category: category,
        //                 description: description,
        //                 //image uploading code Start
        //                 fileName: images?.name,
        //                 contentType: images?.type,
        //                 images: images,
        //                 // image: base64Image
        //                 //image uploading code End
        //         }]);

        //         // 1. FormData banao
        //         const formData = new FormData();

        //         // 2. Products ki images FormData me add karo
        //         newProducts.forEach((product) => {
        //                 formData.append("images", product.images);
        //         });

        //         // 3. Image ko hata kar baaki product data alag bhejo
        //         const productsData = newProducts.map((product) => {
        //                 return {                
        //                         name: product.name,
        //                         price: product.price,
        //                         discount: product.discount,
        //                         stock: product.stock,
        //                         category: product.category,
        //                         description: product.description
        //                 };
        //         });
        //         console.log(newProducts);

        //         // 4. Products array ko JSON string bana kar FormData me daalo
        //         formData.append("products", JSON.stringify(productsData));

        //         console.log("productsData", productsData);
        //         // const obj = Object.fromEntries(formData);
        //         // console.log(obj);





        //         // 5. Backend ko FormData send karo
        //         fetch(`${constant.domain}/admin/ProductAdd`, {
        //                 method: "POST",
        //                 // ❌ headers mat lagana
        //                 // Browser automatically multipart/form-data set karega
        //                 body: formData,
        //                 credentials: "include"

        //         })

        //                 .then(res => {

        //                         console.log("res = ", res);
        //                 })
        //                 .catch(error => {
        //                         console.log("Product upload error = ", error);
        //                 });



        //         // fetch(`${constant.domain}/admin/ProductAdd`, {
        //         //         method: "POST",
        //         //         headers: {
        //         //                 "Content-Type": "application/json"
        //         //         },
        //         //         body: JSON.stringify(newProducts),
        //         //         credentials: "include"
        //         // }).then(res => {
        //         //         return res.json();
        //         // }).then(res => {
        //         //         console.log("res = ", res);
        //         //         setDatas(res)
        //         //         setCount(e => e - res.length)
        //         // });

        // };





        useEffect(() => {
                fetch(`${constant.domain}/product`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log(res);

                        setDatas(res);
                        // setCount(e => e + res.length)
                        setCount(count + res.length)

                });
        }, [])

        //   useEffect(() => {
        //         console.log("new datas = ",datas);

        //          }, [datas])

        const previousProduct = (e) => {
                console.log("previousProduct");
                if (count == datas.length) return


                fetch(`${constant.domain}/product/count`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                count: count - datas.length
                        }),
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log("res = ", res);
                        setDatas(res)
                        setCount(count - res.length)
                });

        }

        const nextProduct = (e) => {
                console.log("nextProduct");

                fetch(`${constant.domain}/product/count`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                count: count
                        }),
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log("res = ", res);
                        setDatas(res)
                        setCount(count + res.length)
                });

        }


        return (
                <>

                        {/* <div className=" flex flex-col  items-center min-w-[100vw] min-h-[100vh] p-[50px]  bg-gray-600  pt-[70px]" onClick={handleProjectClick}> */}
                        <div className=" flex flex-col  items-center ml-[15vw] w-[85vw]  min-h-[100vh] p-[10px]  bg-gray-200  pt-[70px]">

                                <div className="flex flex-col text-center  justify-center border-2 w-[85%] text-xl">
                                        <div className="flex flex-row text-2xl font-bold font-serif ">
                                                <div className="w-[140px] border-2 p-2 ">S. no.</div>
                                                <div className="w-[210px] border-2 p-2 ">Name</div>
                                                <div className="w-[140px] border-2 p-2 ">Price</div>
                                                <div className="w-[140px] border-2 p-2 ">Off (%)</div>
                                                <div className="w-[140px] border-2 p-2 ">Stock</div>
                                                <div className="w-[200px] border-2 p-2 ">Category</div>
                                                <div className="w-[280px] border-2 p-2 ">Description</div>
                                                <div className="w-[140px] border-2 p-2 ">Update</div>
                                        </div>

                                        {/* {datas.length >= 1 && datas.map((ittr, index) => (
                                                <ProductElement ittr={ittr} setDatas={setDatas} count={count == datas.length ? index + 1 : (count - datas.length) + index + 1} />
                                        ))}  */}

                                        <div>

                                                {(count != datas.length) &&
                                                        <button className=" h-fit py-2 px-4 m-2 mx-4 rounded-md border hover:bg-blue-100 active:bg-cyan-100 active:border-cyan-600  font-semibold text-2xl" onClick={previousProduct}>Previous</button>
                                                }

                                                {(datas?.length >= 1) &&
                                                        <button className=" h-fit py-2 px-4 m-2 rounded-md border hover:bg-blue-100 active:bg-cyan-100 active:border-cyan-600  font-semibold text-2xl" onClick={nextProduct}>Next</button>
                                                }
                                        </div>
                                </div>

                                <div className="pt-[70px] flex flex-col text-center  justify-center border-2 w-[85%] text-xl">
                                        {insertButton ?
                                                <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 my-4">

                                                        {/* ================= HEADER ================= */}
                                                        <div className="flex items-center justify-between mb-7 pb-5 border-b border-gray-100">

                                                                <div className="flex items-center gap-3">

                                                                        <div className="w-11 h-11 rounded-xl bg-green-100
                                                                                        flex items-center justify-center
                                                                                        text-green-700 font-bold text-lg">
                                                                                {productSno}
                                                                        </div>

                                                                        <div>
                                                                                <h3 className="text-xl font-bold text-gray-800">
                                                                                        Add Product
                                                                                </h3>

                                                                                <p className="text-sm text-gray-500 mt-1">
                                                                                        Enter product information and upload images
                                                                                </p>
                                                                        </div>

                                                                </div>

                                                                <div className="hidden sm:block text-xs text-gray-400">
                                                                        Step {productSno}
                                                                </div>

                                                        </div>


                                                        {/* ================= PRODUCT INFORMATION ================= */}

                                                        <div className="mb-8">

                                                                <div className="flex items-center gap-2 mb-5">

                                                                        <div className="w-7 h-7 rounded-lg bg-gray-100
                                                                                flex items-center justify-center
                                                                                text-gray-600 text-sm font-bold">
                                                                                1
                                                                        </div>

                                                                        <h4 className="text-base font-semibold text-gray-800">
                                                                                Product Information
                                                                        </h4>

                                                                </div>


                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                                                                        {/* Product Name */}
                                                                        <div className="lg:col-span-2">

                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                                        Product Name
                                                                                </label>

                                                                                <input
                                                                                        type="text"
                                                                                        placeholder="Enter product name..."
                                                                                        onChange={e => setName(e.target.value)}
                                                                                        value={name}
                                                                                        className="w-full px-4 py-3 rounded-xl
                                                                                                        border border-gray-300
                                                                                                        bg-gray-50
                                                                                                        text-gray-800
                                                                                                        placeholder-gray-400
                                                                                                        focus:bg-white
                                                                                                        focus:border-green-500
                                                                                                        focus:ring-2 focus:ring-green-100
                                                                                                        outline-none transition-all"
                                                                                />

                                                                        </div>


                                                                        {/* Price */}
                                                                        <div>

                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                                        Price
                                                                                </label>

                                                                                <div className="relative">

                                                                                        <span className="absolute left-4 top-1/2
                                                                                                        -translate-y-1/2
                                                                                                        text-gray-500 font-medium">
                                                                                                ₹
                                                                                        </span>

                                                                                        <input
                                                                                                type="number"
                                                                                                placeholder="0"
                                                                                                onChange={e => setPrice(e.target.value)}
                                                                                                value={price}
                                                                                                className="w-full pl-9 pr-4 py-3 rounded-xl
                                                                                                                border border-gray-300
                                                                                                                bg-gray-50
                                                                                                                focus:bg-white
                                                                                                                focus:border-green-500
                                                                                                                focus:ring-2 focus:ring-green-100
                                                                                                                outline-none transition-all"
                                                                                        />

                                                                                </div>

                                                                        </div>


                                                                        {/* Discount */}
                                                                        <div>

                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                                        Discount
                                                                                </label>

                                                                                <div className="relative">

                                                                                        <input
                                                                                                type="number"
                                                                                                placeholder="0"
                                                                                                onChange={e => setDiscount(e.target.value)}
                                                                                                value={discount}
                                                                                                className="w-full px-4 pr-10 py-3 rounded-xl
                                                                                                                border border-gray-300
                                                                                                                bg-gray-50
                                                                                                                focus:bg-white
                                                                                                                focus:border-green-500
                                                                                                                focus:ring-2 focus:ring-green-100
                                                                                                                outline-none transition-all"
                                                                                        />

                                                                                        <span className="absolute right-4 top-1/2
                                                                                                        -translate-y-1/2
                                                                                                        text-gray-500 font-semibold">
                                                                                                %
                                                                                        </span>

                                                                                </div>

                                                                        </div>


                                                                        {/* Stock */}
                                                                        <div>

                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                                        Stock
                                                                                </label>

                                                                                <input
                                                                                        type="number"
                                                                                        placeholder="Available quantity"
                                                                                        onChange={e => setStock(e.target.value)}
                                                                                        value={stock}
                                                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300
                                                                                                                bg-gray-50       
                                                                                                                focus:bg-white
                                                                                                                focus:border-green-500
                                                                                                                focus:ring-2 focus:ring-green-100
                                                                                                                outline-none transition-all"
                                                                                />

                                                                        </div>


                                                                        {/* Category */}
                                                                        <div className="lg:col-span-3">

                                                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                                        Category
                                                                                </label>

                                                                                <input
                                                                                        type="text"
                                                                                        placeholder="e.g. Electronics, Fashion, Shoes..."
                                                                                        onChange={e => setcategory(e.target.value)}
                                                                                        value={category}
                                                                                        className="w-full px-4 py-3 rounded-xl
                                                                                                        border border-gray-300
                                                                                                        bg-gray-50
                                                                                                        focus:bg-white
                                                                                                        focus:border-green-500
                                                                                                        focus:ring-2 focus:ring-green-100
                                                                                                        outline-none transition-all"
                                                                                />

                                                                        </div>

                                                                </div>

                                                        </div>


                                                        {/* ================= DESCRIPTION ================= */}

                                                        <div className="mb-8">

                                                                <div className="flex items-center gap-2 mb-5">

                                                                        <div className="w-7 h-7 rounded-lg bg-gray-100
                                                                                        flex items-center justify-center
                                                                                        text-gray-600 text-sm font-bold">
                                                                                2
                                                                        </div>

                                                                        <div>
                                                                                <h4 className="text-base font-semibold text-gray-800">
                                                                                        Product Description
                                                                                </h4>

                                                                                <p className="text-xs text-gray-400 mt-1">
                                                                                        Give customers useful information about your product
                                                                                </p>
                                                                        </div>

                                                                </div>


                                                                <textarea
                                                                        rows="5"
                                                                        placeholder="Write a detailed description of your product..."
                                                                        onChange={e => setDescription(e.target.value)}
                                                                        value={description}
                                                                        className="w-full px-4 py-3 rounded-xl
                                                                                        border border-gray-300
                                                                                        bg-gray-50
                                                                                        text-gray-800
                                                                                        placeholder-gray-400
                                                                                        focus:bg-white
                                                                                        focus:border-green-500
                                                                                        focus:ring-2 focus:ring-green-100
                                                                                        outline-none transition-all
                                                                                        resize-none"
                                                                />

                                                                <div className="flex justify-end mt-2">

                                                                        <span className="text-xs text-gray-400">
                                                                                {description?.length || 0} characters
                                                                        </span>

                                                                </div>

                                                        </div>


                                                        {/* ================= PRODUCT IMAGES ================= */}

                                                        <div>

                                                                <div className="flex items-center justify-between mb-5">

                                                                        <div className="flex items-center gap-2">

                                                                                <div className="w-7 h-7 rounded-lg bg-gray-100
                                                                                                        flex items-center justify-center
                                                                                                        text-gray-600 text-sm font-bold">
                                                                                        3
                                                                                </div>

                                                                                <div>
                                                                                        <h4 className="text-base font-semibold text-gray-800">
                                                                                                Product Images
                                                                                        </h4>

                                                                                        <p className="text-xs text-gray-400 mt-1">
                                                                                                Upload 1 to 10 images
                                                                                        </p>
                                                                                </div>

                                                                        </div>


                                                                        {/* Image Counter */}
                                                                        <div className="px-3 py-1.5 rounded-full
                                                                                                bg-green-50
                                                                                                border border-green-200
                                                                                                text-green-600
                                                                                                text-xs font-semibold">

                                                                                {images.filter(Boolean).length}/10

                                                                        </div>

                                                                </div>


                                                                {/* Image Grid */}
                                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">

                                                                        {images.map((image, index) => (

                                                                                <label
                                                                                        key={index}
                                                                                        className={`
                                                                                                        relative aspect-square rounded-xl
                                                                                                        overflow-hidden cursor-pointer
                                                                                                        transition-all duration-200
                                                                                                        ${image
                                                                                                        ? "border border-gray-200 shadow-sm"
                                                                                                        : "border-2 border-dashed border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50"
                                                                                                } `}>

                                                                                        {image ? (

                                                                                                <>
                                                                                                        {/* Selected Image */}
                                                                                                        <img
                                                                                                                src={URL.createObjectURL(image)}
                                                                                                                alt={`Product ${index + 1}`}
                                                                                                                className="w-full h-full object-cover"
                                                                                                        />


                                                                                                        {/* Top Badge */}
                                                                                                        <span
                                                                                                                className="
                                                                                                                                absolute top-2 left-2
                                                                                                                                bg-black/65 text-white
                                                                                                                                text-[10px] font-semibold
                                                                                                                                px-2 py-1 rounded-md
                                                                                                                                "
                                                                                                        >
                                                                                                                {index === 0
                                                                                                                        ? "MAIN IMAGE"
                                                                                                                        : `IMAGE ${index + 1}`}
                                                                                                        </span>


                                                                                                        {/* Bottom Overlay */}
                                                                                                        <div
                                                                                                                className="
                                                                                                                                absolute bottom-0 left-0 right-0
                                                                                                                                bg-black/60
                                                                                                                                text-white
                                                                                                                                text-xs text-center
                                                                                                                                py-2
                                                                                                                                "
                                                                                                        >
                                                                                                                Click to change
                                                                                                        </div>

                                                                                                </>

                                                                                        ) : (

                                                                                                <div
                                                                                                        className="
                                                                                                                        w-full h-full
                                                                                                                        flex flex-col
                                                                                                                        items-center justify-center
                                                                                                                "
                                                                                                >

                                                                                                        <div
                                                                                                                className="
                                                                                                                                        w-10 h-10
                                                                                                                                        rounded-full
                                                                                                                                        bg-white
                                                                                                                                        border border-gray-200
                                                                                                                                        flex items-center justify-center
                                                                                                                                        text-2xl
                                                                                                                                        text-gray-400
                                                                                                                                        "
                                                                                                        >
                                                                                                                +
                                                                                                        </div>


                                                                                                        <span className="text-xs text-gray-500 mt-2">
                                                                                                                Image {index + 1}
                                                                                                        </span>


                                                                                                        {index === 0 && (
                                                                                                                <span className="text-[10px] text-green-600 mt-1 font-medium">
                                                                                                                        Main image
                                                                                                                </span>
                                                                                                        )}

                                                                                                </div>

                                                                                        )}


                                                                                        {/* File Input */}
                                                                                        <input
                                                                                                type="file"
                                                                                                accept="image/*"
                                                                                                className="hidden"
                                                                                                onChange={(e) => {

                                                                                                        const file = e.target.files[0];

                                                                                                        if (!file) return;

                                                                                                        const updatedImages = [...images];

                                                                                                        updatedImages[index] = file;

                                                                                                        setImages(updatedImages);

                                                                                                }}
                                                                                        />

                                                                                </label>

                                                                        ))}

                                                                </div>

                                                        </div>
                                                        <div className="flex flex-col sm:flex-row gap-4 my-5">

                                                                <button
                                                                        type="button"
                                                                        onClick={handleUpdateProduct}
                                                                        className=" flex-1 py-3.5 px-6 rounded-xl bg-green-700 text-white font-semibold text-lg border border-green-700 shadow-sm hover:bg-green-800 hover:shadow-md active:scale-[0.98] transition-all duration-200">
                                                                        Update
                                                                </button>

                                                                <button
                                                                        type="button"
                                                                        onClick={() => setInsertButton(!insertButton)}
                                                                        className="sm:w-40 py-3.5 px-6 rounded-xl bg-red-700 text-white font-semibold text-lg border border-red-700 shadow-sm hover:bg-red-800 hover:shadow-md active:scale-[0.98] transition-all duration-200">
                                                                        Hide
                                                                </button>

                                                        </div>

                                                </div>


                                                :
                                                <button className=" bg-green-400 p-1  px-4 border-2 border-gray-500 rounded-md text-white hover:bg-green-500 hover:border-cyan-400 active:text-black transition-all font-semibold" onClick={e => setInsertButton(!insertButton)}>Add New Product</button>
                                        }
                                </div>

                        </div>




                </>
        );
};

export default Product



// FormData  b use karna hai 