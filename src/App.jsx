import React, { useState } from "react";

function App() {
    const date=new Date();
    const [sgst, setSGST] = useState(false);
    const [cgst, setCGST] = useState(false);
    const [billDetails, setBillDetails] = useState({
        billTO: "",
        customerAddress: "",
        quotationNumber: "",
        items: [],
        sgstValue: "",
        cgstValue: "",
        InvoiceValue: "",
    });
    const [tableItems, setTableItems] = useState({
        description: "",
        quantity: "",
        unitPrice: "",
    });

    const handleAddItem = (e) => {
        e.preventDefault();
        setBillDetails({
            ...billDetails,
            items: [...billDetails.items, tableItems],
        });
        setTableItems({ description: "", quantity: "", unitPrice: "" });
    };

    console.log(billDetails);

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-5 px-5 flex-col py-10 w-full">
                <div className="">
                    <div className="font-[Poppins]">
                        {/* Heading */}
                        <div className="pb-5 text-3xl">
                            <p className="font-bold text-blue-500">
                                Design{" "}
                                <span className="text-green-400">Blocks</span>
                            </p>
                        </div>
                        {/* Invoice Details */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
                            <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                                1. Invoice Details
                            </p>
                            <div className="flex items-center justify-start flex-wrap gap-3">
                                <h1>Quotation Number</h1>
                                <input
                                    type="text"
                                    name="Quotation Number"
                                    placeholder="Enter Quotation Number"
                                    className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
                                    onChange={(e) => {
                                        setBillDetails({
                                            ...billDetails,
                                            quotationNumber: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        {/* Receipient Details */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
                            <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                                2. Receipient Details
                            </p>
                            <div className="flex items-start justify-start flex-wrap gap-5">
                                <div className="flex items-start justify-center flex-col gap-2">
                                    <h1>Bill TO</h1>
                                    <input
                                        type="text"
                                        name="Bill To"
                                        placeholder="Enter Biller Details"
                                        className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
                                        value={billDetails.billTO}
                                        onChange={(e) => {
                                            setBillDetails({
                                                ...billDetails,
                                                billTO: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="flex items-start justify-center flex-col gap-2">
                                    <h1>Address</h1>
                                    <input
                                        type="text"
                                        name="Customer Address"
                                        placeholder="Enter Biller Address"
                                        className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
                                        value={billDetails.customerAddress}
                                        onChange={(e) => {
                                            setBillDetails({
                                                ...billDetails,
                                                customerAddress: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Items Details Details */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
                            <form
                                className="flex items-start justify-start flex-col"
                                onSubmit={handleAddItem}
                            >
                                <div className="flex flex-row items-center justify-between w-full pb-3">
                                    <p className="text-xl font-semibold uppercase text-blue-600">
                                        3. Items
                                    </p>
                                    <button
                                        type="submit"
                                        className="bg-green-400 px-3 py-0.5 rounded-md text-green-950"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex items-center justify-start flex-wrap gap-3">
                                    <div className="flex items-start justify-center flex-col gap-2">
                                        <h1>Description</h1>
                                        <input
                                            type="text"
                                            name="Description"
                                            value={tableItems.description}
                                            placeholder="Enter Quotation Number"
                                            className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
                                            onChange={(e) => {
                                                setTableItems({
                                                    ...tableItems,
                                                    description: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-start justify-center flex-col gap-2">
                                        <h1>Quantity</h1>
                                        <input
                                            type="number"
                                            name="Quantity"
                                            value={tableItems.quantity}
                                            placeholder="Enter No. Of Products"
                                            className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
                                            onChange={(e) => {
                                                setTableItems({
                                                    ...tableItems,
                                                    quantity: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-start justify-center flex-col gap-2">
                                        <h1>Unit Price</h1>
                                        <input
                                            type="number"
                                            name="Unit Price"
                                            value={tableItems.unitPrice}
                                            placeholder="Single Product Price"
                                            className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
                                            onChange={(e) => {
                                                setTableItems({
                                                    ...tableItems,
                                                    unitPrice: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
                            <p className="text-xl font-semibold uppercase text-blue-600">
                                4. GST Info
                            </p>
                            <label
                                htmlFor="SGST"
                                onClick={() => {
                                    setSGST(!sgst);
                                }}
                            >
                                SGST
                            </label>
                            <input type="checkbox" name="sgst" id="SGST" />
                            <label
                                htmlFor="CGST"
                                onClick={() => {
                                    setCGST(!cgst);
                                }}
                            >
                                CGST
                            </label>
                            <input type="checkbox" name="cgst" id="CGST" />
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="w-full font-[Lora] bg-white flex items-center justify-center">
                    <div className="overflow-x-scroll w-full xl:w-[60rem]">
                        <div className="flex items-center justify-center flex-col w-[60rem]">
                            {/* Starting Row */}
                            <div className="flex items-center justify-start flex-row h-[15rem]">
                                <div className="h-full w-[20rem] border border-black">
                                    <div className=" flex items-center justify-center h-[50%]">
                                        <p className="text-center font-bold text-2xl">Quotation</p>
                                    </div>
                                    <div className="h-[50%] border-t border-black px-5 py-2">
                                        <p className="font-semibold text-lg">Bill to:</p>
                                        <p>{billDetails.billTO}</p>
                                        <p>{billDetails.customerAddress}</p>
                                    </div>
                                </div>
                                <div className="h-full w-[40rem] border-l-0 border border-black flex flex-col justify-between">
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="w-[70%]">
                                            <p className="font-semibold text-xl">GSTIN: <span className="font-medium text-base">37AKOPY6766H1Z4</span></p>
                                            <p className="font-medium">DESIGN BLOCKS</p>
                                            <p className="font-semibold text-lg pt-2">Address:</p>
                                            <p>Flat No 406, 5th Floor, Botcha Square, Madhavadhara, VISAKHAPATNAM-530007</p>
                                        </div>
                                        <img src="https://designblocks.in/img/DB.png" alt="Design Blocks Logo" className="w-[20%]"/>
                                    </div>
                                    <div className="flex items-center justify-between flex-row h-10 px-5 border-t border-black">
                                        <div>
                                            <p className="font-semibold text-lg">Quotation No: <span className="font-normal text-base">{billDetails.quotationNumber}</span></p>
                                        </div>
                                        <div>
                                            <p>Date: <span>{date.toLocaleDateString("en-GB")}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Blank Row */}
                            <div className="h-10 w-full border-x border-black"></div>
                            {/* Items Row */}
                            <table className="w-[60rem]">
                                <thead>
                                    <tr>
                                        <td className="border border-black text-center">Item</td>
                                        <td className="border border-black text-center w-[30rem]">Description</td>
                                        <td className="border border-black text-center">Quantity</td>
                                        <td className="border border-black text-center">Unit Price (Rs.)</td>
                                        <td className="border border-black text-center">Total Price (Rs.)</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   
                                        billDetails.items.length>0 &&
                                        billDetails.items.map((items,key)=>{
                                            return(
                                            <tr key={key}>
                                                <td>{key+1}</td>
                                                <td>{items.description}</td>
                                                <td>{items.quantity}</td>
                                                <td>{items.unitPrice}</td>
                                                <td>{(items.quantity*items.unitPrice).toFixed(2)}</td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
