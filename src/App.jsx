import React, { useState, useRef, useEffect } from "react";
import { ToWords } from 'to-words';
import ReactToPrint from "react-to-print";

function App() {
    const date=new Date();
    const toWords = new ToWords();
    const [quotation, setQuotation] = useState(true);
    const [invoice, setInvoice] = useState(false);
    const [sgst, setSGST] = useState(false);
    const [cgst, setCGST] = useState(false);
    const printRef = useRef(null);
    const [taxableValue, setTaxableValue] = useState(0);
    const [invoiceValue, setInvoiceValue] = useState(0);
    const [SGST, setSGSTValue] = useState(0);
    const [CGST, setCGSTValue] = useState(0);

    const [billDetails, setBillDetails] = useState({
        billTO: "",
        customerAddress: "",
        customerGSTIN:"",
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

    useEffect(() => {
        // Calculate taxable value and taxes whenever billDetails.items changes
        const newTaxableValue = billDetails.items.reduce((acc, item) => {
            return acc + item.quantity * item.unitPrice;
        }, 0);
        let totalValue=0;
        if(sgst)
        {
            setSGSTValue((newTaxableValue * 0.09).toFixed(2));
        }
        else{
            setSGSTValue(0);
        }
        if(cgst)
        {
            setCGSTValue((newTaxableValue * 0.09).toFixed(2));
        }
        else{
            setCGSTValue(0);
        }
        setTaxableValue(newTaxableValue);
        totalValue+=(Number(taxableValue)+Number(SGST)+Number(CGST));
        setInvoiceValue(totalValue);
    }, [billDetails.items, cgst, sgst, CGST, SGST, taxableValue]);

    const handleAddItem = (e) => {
        e.preventDefault();
        setBillDetails({
            ...billDetails,
            items: [...billDetails.items, tableItems],
        });
        setTableItems({ description: "", quantity: "", unitPrice: "" });
    };

    const handleItem=(item)=>{
        let removedArray=billDetails.items.filter(e=>e!=item);
        console.log(removedArray);
        setBillDetails({...billDetails,items:removedArray});
        console.log(billDetails);
    }

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-5 px-5 flex-col py-10 w-full">
                <div className="w-full flex items-center justify-center">
                    <div className="font-[Poppins] w-full lg:w-[50rem]">
                        {/* Heading */}
                        <div className="pb-5 text-3xl">
                            <p className="font-bold text-blue-500">
                                Design{" "}
                                <span className="text-green-400">Blocks</span>
                            </p>
                        </div>
                        <div className="flex items-center justify-start gap-5 mb-5">
                            <div className={`cursor-pointer px-4 py-1 ${quotation?"bg-green-400":"bg-transparent"} border-2 border-green-400 rounded`} onClick={()=>{setQuotation(!quotation),setInvoice(!invoice)}}>Quotation</div>
                            <div className={`cursor-pointer px-4 py-1 ${invoice?"bg-green-400":"bg-transparent"} border-2 border-green-400 rounded`} onClick={()=>{setQuotation(!quotation),setInvoice(!invoice)}}>Invoice</div>
                        </div>
                        {/* Invoice Details */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg p-5 bg-gray-50">
                            <p className="pb-3 text-xl font-semibold uppercase text-blue-600">
                                1. {invoice?"Invoice":"Quotation"} Details
                            </p>
                            <div className="flex items-center justify-start flex-wrap gap-3">
                                <h1>{invoice?"Invoice":"Quotation"} Number</h1>
                                <input
                                    type="text"
                                    name="Quotation Number"
                                    placeholder={`Enter ${invoice?"Invoice":"Quotation"} Number`}
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
                            <div className="flex items-start justify-start flex-wrap gap-3">
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
                                <div className="flex items-start justify-center flex-col gap-2">
                                    <h1>Customer GSTIN</h1>
                                    <input
                                        type="text"
                                        name="Customer Address"
                                        placeholder="Enter Biller Address"
                                        className="outline-none rounded px-2 py-1 border border-blue-500 shadow-md shadow-black/20"
                                        value={billDetails.customerGSTIN}
                                        onChange={(e) => {
                                            setBillDetails({
                                                ...billDetails,
                                                customerGSTIN: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Items Details Details */}
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50 w-full">
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
                                        className="bg-green-400 px-3 py-2 py-0.5 rounded-md text-green-950 shadow-md shadow-black/30"
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
                                            required
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
                                            required
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
                                            required
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
                            {
                                billDetails.items.length>0 &&
                                <div className="overflow-x-scroll w-full py-5">
                                    <div className="w-[50rem]">
                                        <table className="w-full">
                                            <tbody className="w-full">
                                                {
                                                    billDetails.items.map((item, index) => {
                                                        return (
                                                            <tr key={index} className="">
                                                                <td className="border border-blue-500 px-3 py-2">{index + 1}</td>
                                                                <td className="border border-blue-500 px-3 py-2">{item.description}</td>
                                                                <td className="border border-blue-500 px-3 py-2">{item.quantity}</td>
                                                                <td className="border border-blue-500 px-3 py-2">{item.unitPrice}</td>
                                                                <td className="px-3">
                                                                    <p className="bg-red-500 px-2 py-1 rounded-lg text-center cursor-pointer text-white" onClick={()=>handleItem(item)}>Delete</p>
                                                                </td>
                                                            </tr>
                                                        );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="border-dashed border-2 border-slate-400 rounded-lg my-7 p-5 bg-gray-50">
                            <p className="text-xl font-semibold uppercase text-blue-600">
                                4. GST Info
                            </p>
                            <div className="flex items-center justify-start gap-5 mt-3">
                                <label
                                    htmlFor="SGST"
                                    onClick={() => {
                                        setSGST(!sgst);
                                    }}
                                    className={`${sgst?"bg-red-400":"bg-green-400"} px-5 py-1 rounded duration-300`}
                                >
                                    SGST
                                </label>
                                <input type="checkbox" name="sgst" id="SGST" className="hidden"/>
                                <label
                                    htmlFor="CGST"
                                    onClick={() => {
                                        setCGST(!cgst);
                                    }}
                                    className={`${cgst?"bg-red-400":"bg-green-400"} px-5 py-1 rounded duration-300`}
                                >
                                    CGST
                                </label>
                                <input type="checkbox" name="cgst" id="CGST" className="hidden"/>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
                <ReactToPrint
                    trigger={() => (
                        <button className="text-white bg-red-500 font-medium px-4 py-1 rounded mb-5">
                            Print Receipt
                        </button>
                    )}
                    content={() => printRef.current}
                    pageStyle="@page { size: A4 portrait; margin: 20mm; } body { margin: 20px; }"
                />
                <div className="w-full font-[Lora] bg-white flex items-center justify-center">
                    <div className="overflow-x-scroll w-full xl:w-[60rem]">
                        <div ref={printRef} className="flex items-center justify-center flex-col w-[60rem]">
                            {/* Starting Row */}
                            <div className="flex items-center justify-start flex-row h-[15rem]">
                                <div className="h-full w-[20rem] border border-black">
                                    <div className=" flex items-center justify-center h-[30%]">
                                        <p className="text-center font-bold text-2xl">{invoice?"Invoice":"Quotation"}</p>
                                    </div>
                                    <div className="h-[70%] border-t border-black px-5 py-2">
                                        <p className="font-semibold text-lg">Bill to:</p>
                                        {
                                            billDetails.customerGSTIN !="" &&
                                            <p><span className="font-medium">GSTIN:</span> {billDetails.customerGSTIN}</p>
                                        }
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
                                            <p className="font-semibold text-lg">{invoice?"Invoice":"Quotation"} No: <span className="font-normal text-base">{billDetails.quotationNumber}</span></p>
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
                                    <tr className="h-10">
                                        <td className="border border-black text-center">Item</td>
                                        <td className="border border-black text-center w-[30rem]">Description</td>
                                        <td className="border border-black text-center">Quantity</td>
                                        <td className="border border-black text-center">Unit Price (Rs.)</td>
                                        <td className="border border-black text-center">Total Price (Rs.)</td>
                                    </tr>
                                </thead>
                                <tbody className="border border-black">
                                    {   
                                        billDetails.items.length>0 &&
                                        billDetails.items.map((items,key)=>{
                                            return(
                                            <tr key={key} className="h-10">
                                                <td className="text-center border border-black">{key+1}.</td>
                                                <td className="px-2 border border-black">{items.description}</td>
                                                <td className="px-2 border border-black">{items.quantity}</td>
                                                <td className="px-2 border border-black">{items.unitPrice}</td>
                                                <td className="px-2 border border-black">{(items.quantity*items.unitPrice).toFixed(2)}</td>
                                            </tr>
                                            )
                                        })
                                    }
                                    <tr className="border border-black h-10">
                                        <td className=""></td>
                                        <td></td>
                                        <td></td>
                                        <td className="px-2 text-red-700 font-semibold border border-black">Taxable Value</td>
                                        <td className="px-2 border border-black">{taxableValue.toFixed(2)}</td>
                                    </tr>
                                    <tr className="h-10 w-full"></tr>
                                    {
                                        sgst && 
                                        <tr className="h-10 border border-black">
                                            <td className="border border-black text-center">i</td>
                                            <td className="px-2">SGST@9.00%</td>
                                            <td className=""></td>
                                            <td className=""></td>
                                            <td className="border border-black px-2">{
                                                // (taxableValue*(9/100)).toFixed(2)
                                                SGST
                                            }</td>
                                        </tr>
                                    }
                                    {
                                        cgst && 
                                        <>
                                            <tr className="h-10 border border-black">
                                                <td className="border border-black text-center">ii</td>
                                                <td className="px-2">CGST@9.00%</td>
                                                <td className=""></td>
                                                <td className=""></td>
                                                <td className="border border-black px-2">{
                                                    // (taxableValue*(9/100)).toFixed(2)
                                                    CGST
                                                }</td>
                                            </tr>
                                        </>
                                    }
                                    {
                                        (cgst || sgst) && 
                                        <>
                                            <tr className="border border-black h-10">
                                                <td className=""></td>
                                                <td></td>
                                                <td></td>
                                                <td className="px-2 text-red-700 font-semibold border border-black">Invoice Value</td>
                                                <td className="px-2 border border-black">{invoiceValue}</td>
                                            </tr>
                                            <tr className="h-10 w-full"></tr>
                                        </>
                                    }
                                    <tr className="border border-black h-10">
                                        <td></td>
                                        <td><span className="font-semibold">In Words: </span>{toWords.convert(invoiceValue>0?invoiceValue:taxableValue)}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} className="p-2">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold">BANK DETAILS:-</p>
                                                    <p>UNION BANK OF INDIA , MURALI NAGAR,VISAKHAPATNAM</p>
                                                    <p><span className="font-semibold">A/C NUMBER-</span> 753601010050187 ; <span className="font-semibold">IFSC:</span> UBIN0810746</p>
                                                    <p><span className="font-semibold">UPI ID:</span> designblocks@ybl</p>
                                                </div>
                                                <div>
                                                    <p className="text-xl">For <span className="uppercase font-bold mr-10">Design Blocks</span></p>
                                                </div>
                                            </div>
                                            <div className="text-center mt-3">
                                                Thank You
                                            </div>
                                        </td>
                                    </tr>
                                    {
                                        quotation && 
                                        <tr>
                                            <td colSpan={5} className="p-2 border border-black">
                                                <div className="text-sm">
                                                    <p className="font-semibold  mb-5">Terms and Conditions.</p>
                                                    <p>Quotation prices are valid for 20 days from the date of issue.</p>
                                                    <p>Any increase in project scope will result in an additional cost.</p>
                                                </div>
                                            </td>
                                        </tr>
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
