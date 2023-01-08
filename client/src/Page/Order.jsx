import { message } from 'antd';
import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom";
function Order() {
  const [isAdmin, setIsAdmin] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [order, setOrder] = useState([]);
  const [book, setBook] = useState([]);
  const [count,setCount]=useState(0)
  const [amount,setAmount]=useState()
  const [messageApi, contextHolder] = message.useMessage();
  const navigate=useNavigate()
  const token=localStorage.getItem('token')
  const setHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };
  const role = localStorage.getItem("role");
  const userId=localStorage.getItem('id')
  const fullname = localStorage.getItem("fullname");
  
    useEffect(()=>{
    if(!token){
      navigate('/login')
    }
    else {
      setIsLogin(true)
    }
  },[])
  const getOrder=async ()=>{
    axios.get(`http://localhost:3000/order/${userId}`,setHeader())
    .then(res=>{
      setOrder(res.data)
      console.log(res.data)
      // setBook(res.data?.book)


    })
    .catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getOrder()
  },[])
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: `${message}`,
    });
  };

  const warning = (message) => {
    messageApi.open({
      type: 'warning',
      content: `${message}`,
    });
  };
  const handleDelete = async (id) => {
    // let formData = new FormData();
    // formData.append('bookId', order.book.id)
    // formData.append('orderId', order.id);
    // formData.append('amount', order.amount);


    // const data={
    //   bookId:order.book.id,
    //   orderId:order.id,
    //   amount:order.amount
    // }
    // console.log(data);
    await axios
      .delete(`http://localhost:3000/order/${id}`,{ headers: { Authorization: `Bearer ${token}` } })
      .then( async (res) => {
        // alert('xóa sách thành công')
         success("Hủy đặt sách thành công");
        // setInterval(success("Hủy đặt sách thành công"),100);
        console.log("Hủy đặt sách thành công");
        setInterval(()=>getOrder(),500);
      })
      .catch((err) => {
        console.log(err);
        warning("Hủy đặt sách thất bại!")
      });
  };

  const handleDeleteCheck = (id) => {
    if (window.confirm("Bấm OK để tiếp tục xóa") === true) {
      handleDelete(id);
    } else {
      console.log("ko xoa");
    }
  };

  const goHome=()=>{
    navigate('/')
    window.location.reload()
  }
  const goLogin=()=>{
    navigate('/login')
  }
  const goOrder=()=>{
    navigate('/order')
  }
  const handleView = (id) => {
    navigate("/detail", { state: { id: id } });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/")
  };
  // const handleDeleteCheck = (params) => {
  //   if (window.confirm("Bấm OK để tiếp tục xóa") === true) {
  //     handleDelete(params);
  //   } else {
  //     console.log("ko xoa");
  //   }
  // };
  const columns = [
    // {
    //   name: "Bìa sách",
    //   selector: (order) => (<div><img  src={.image.url} alt={'bìa sách'}/></div>),  
    // },
    {
      name: "Tiêu đề",
      selector: (order) => order.book.title,
      minWidth: "260px",
      sortable: true,
    },
    {
      name: "Tác giả",
      selector: (order) => order.book.author,
      // maxWidth: "100px",
      style: {},
      sortable: true,
    },
    {
      name: "Số lượng",
      selector: (order) => order.amount,
      minWidth: "50px",
      // maxWidth: "100px",
      //   sortable:true
      // selector: row => moment(row.date.format('DD/MM/YYYY')),
    },
    // {
    //   name: "Action",
    //   minWidth: "50px",
    //   // maxWidth: "100px",
    //   selector: (book) => (
    //     <div>
    //       {contextHolder}
    //       <button
    //         className="px-3 py-2 rounded-md bg-green-600"
    //         onClick={() => handleView(book.id)}
    //       >
    //         Xem
    //       </button>
    //       <button
    //         className="px-3 py-2 ml-2 rounded-md bg-red-600"
    //         // onClick={() => handleDeleteCheck(book.id)}
    //       >
    //         Xóa
    //       </button>
    //     </div>
    //   ),
    //   omit: !(role === "admin"),
    // },
    {
      name: "Action",
      selector: (order) => (
        <div className='flex justify-center'>
          <button
            className="h-8 w-16 rounded-md bg-green-600"
            onClick={() => handleView(order.book.id)}
          >
            Xem
          </button>
          {contextHolder}
          <button
            className="h-8 w-16 ml-2 rounded-md bg-red-600"
            onClick={() => handleDeleteCheck(order.id)}
          >
            Hủy đặt
          </button>
        </div>
        
      ),
      omit: !(role === "user"),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "100px", // override the row height
      },
    },
    headCells: {
      style: {
        // textAlign:"right",
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "14px",
        backgroundColor: "#B7C4CF",
        marginLeft:'1px'
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        backgroundColor: "#EFF5F5",
      },
    },
  };
  return (
    <div><div className="relative w-full   pb-5">
    <div className=" flex justify-between h-max-[48px] h-[48px]  w-full shadow-md z-10 bg-white">
      <div className="flex">
          <button className="flex mx-5 my-1 h-[48px]  text-3xl hover:text-zinc-600" onClick={()=>goHome()}>
            {/* <HomeOutlined style={{ fontSize: "32px", marginRight: "8px" }} /> */}
            <p>LIBRALY</p>
          </button>
          <button className=" justify-items-end mx-5 h-[48px] text-sm text-center px-3 inline-block bg-gray-600 text-white" onClick={()=>goOrder()}>
            Sách đã mua
          </button>
      </div>

      <div className="flex justify-end">
        {!isLogin && (

            <button className=" right-0 mx-6 my-1 bg-green-600 px-4 py-2 rounded-2xl" onClick={()=>goLogin()}>
              Đăng nhập
            </button>
        )}
        {isLogin && (
            <button
              className=" mx-6 my-1 bg-lime-500 px-4 py-2 rounded-2xl"
              onClick={() => handleLogout()}
            >
              Đăng xuất
            </button>
        )}
      </div>
    </div>
    <div className="flex justify-center my-5">
      <div className="w-[70%]">
      <div className="w-full my-4">
        <div className='py-2 px-2 font-bold'>Danh sách sách đã đặt mua</div>
            <DataTable
              columns={columns}
              data={order}
              pagination
              customStyles={customStyles}
              highlightOnHover
            />
          </div>
      </div>
    </div>
  </div></div>
  )
}

export default Order