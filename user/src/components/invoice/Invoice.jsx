import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './invoice.css';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../baseUrl.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Invoice = () => {
  const token = localStorage.getItem('userToken');
  const orderId = useSelector((state) => state.order.orderId);
  const [id, setId] = useState(orderId);
  const [order, setOrder] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  const [cupon,setCoupon]=useState('')
  
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/orderDetails`, {
        params: { id },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.order)
        console.log(res.data.order.coupons)
        setCoupon(res.data.order.coupons)
        setOrder(res.data.order.shippingAddress);
        setOrderedItems(res.data.order.orderedItems)
        
      }).then((res)=>{
        console.log("cupon",res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  
  
  const total = orderedItems.reduce((accumulator, order) => accumulator + order.price, 0);

  const handleDownload = () => {
    const input = document.getElementById('order_invoice');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${order.fullName || 'unknown'}.pdf`);
    });
  }

  return (
    <div className="flex justify-center items-center">
      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button onClick={handleDownload} className="btn btn-success col-md-5 bg-green-500 text-[#ffff] w-[100px] rounded-lg font-semibold h-[30px]">
            Download
          </button>
        </div>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <div className="font-Playfair text-[25px]">Neom</div>
            </div>
            <div id="project">
              <div>
                <span>Name: </span>{order.fullName}
              </div>
              <div>
                <span>Address: </span>{order.address}
              </div>
              <div>
                <span>Phone: </span> {order.phone1}
              </div>
              <div>
                <span>Status: </span>{orderedItems[0]?.paymentStatus}
              </div>
            </div>
          </header>
          <main>
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
               {orderedItems.map((product, index) => (
                 <tr key={product._id}>
                   <td className="service">{index + 1}</td>
                   <td className="desc">{product.product}</td>
                   <td className="unit">₹ {product.price}</td>
                   <td className="qty">{product.quantity}</td>
                   <td className="total">₹ {product.price}</td>
                 </tr>
               ))}

<tr>
                  <td colSpan="4">
                    <b>CUPON APPLIED</b>
                  </td>
                  <td className="total">₹ {total}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>SUBTOTAL</b>
                  </td>
                  <td className="total">₹ {total}</td>
                </tr>

                <tr>
                  <td colSpan="4" className="grand total">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="grand total">₹ {total}</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>NOTICE:</div>
              <div className="notice">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer>
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
