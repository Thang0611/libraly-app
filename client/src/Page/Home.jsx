import React, { useEffect, useState } from "react";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import DataTable from "react-data-table-component";
import { Alert, Button, Space, message } from "antd";
import axios from "axios";
import { HomeOutlined } from "@ant-design/icons";
  import { Link, useNavigate } from "react-router-dom";
function Home() {
  const URLBase = "http://localhost:3000/book";
  const [book, setBook] = useState([]);
  const [isAdmin, setIsAdmin] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const setHeader = () => {
    let token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const fullname = localStorage.getItem("fullname");
  useEffect(() => {
    getBook();
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  const getBook = async () => {
    await axios
      .get(`${URLBase}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const handleDeleteCheck = (params) => {
      if (window.confirm("Bấm OK để tiếp tục xóa") === true) {
        handleDelete(params);
      } else {
        console.log("ko xoa");
      }
    };

  const handleDelete = (id) => {
    console.log(id);
    // let token = localStorage.getItem('token')
    axios
      .delete(`${URLBase}/${id}`, setHeader())
      .then((res) => {
        console.log("Bạn đã xóa sách thành công");
        successDelete();
        getBook();
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleView = (id) => {
    navigate("/detail", { state: { id: id } });
  };
  const handleAdd = () => {
    navigate("/detail");
  };

  // useEffect(()=>{

  // },[])

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

  const handleLogout = () => {
    localStorage.clear();
    console.log(token);
    window.location.reload();
    navigate("/")
  };
  const successDelete = () => {
    messageApi.open({
      type: 'success',
      content: 'Xóa sách thành công',
    });
  };

  const success = (message) => {
    messageApi.open({
      //   key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        // key,
        type: "success",
        content: `${message}`,
        duration: 2,
      });
    }, 1000);
  };

  const convertDate = (time)=>{
    const dateString = time;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'});
    return formattedDate
}
  const columns = [
    {
      name: "Bìa sách",
      selector: (book) => (<div><img  src={book.image.url} alt={'bìa sách'}/></div>),  
    },
    {
      name: "Tiêu đề",
      selector: (book) => book.title,
      minWidth: "260px",
      sortable: true,
    },
    {
      name: "Tác giả",
      selector: (book) => book.author,
      style: {},
      sortable: true,
    },
    {
      name: "Nhà xuất bản",
      selector: (book) => book.publishingCompany,
      minWidth: "120px",
      sortable: true,
    },
    {
      name: "Thể loại",
      selector: (book) => book.category,
      sortable: true,
    },
    {
      name: "Số trang",
      selector: (book) => book.numOfPage,
      sortable: true,
    },
    {
      name: "Ngày phát hành",
      selector: (book) => convertDate(book.date),
      minWidth: "120px",
      //   sortable:true
      // selector: row => moment(row.date.format('DD/MM/YYYY')),
    },
    {
      name: "Action",
      minWidth: "120px",
      selector: (book) => (
        <div>
          {contextHolder}
          <button
            className="w-12 h-8 rounded-md bg-green-600 hover:text-white"
            onClick={() => handleView(book.id)}
          >
            Xem
          </button>
          <button
            className="w-12 h-8 ml-2 rounded-md bg-red-600 hover:text-white"
            onClick={() => handleDeleteCheck(book.id)}
          >
            Xóa
          </button>
        </div>
      ),
      omit: !(role === "admin"),
    },
    {
      name: "Action",
      selector: (book) => (
        <div>
          <button
            className="w-12 h-8 rounded-md bg-green-600 hover:text-white"
            onClick={() => handleView(book.id)}
          >
            Xem
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
        // display:'inline-block',
        // textAlign:"center",
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
    <div className="relative w-full   pb-5">
      <div className=" flex justify-between h-max-[48px] h-[48px]  w-full shadow-md z-10 bg-white">
        <div className="flex">
            <button className="flex mx-5 my-1 h-[48px]  text-3xl hover:text-zinc-600" onClick={()=>goHome()}>
              {/* <HomeOutlined style={{ fontSize: "32px", marginRight: "8px" }} /> */}
              <p>LIBRALY</p>
            </button>
            {(!isAdmin&&isLogin)&&<button className=" justify-items-end mx-5 h-[48px] text-sm text-center inline-block px-3 hover:bg-gray-600 hover:text-white " onClick={()=>goOrder()}>
              Sách đã mua
            </button>}
        </div>
        
        <div className="flex justify-end">
          {!isLogin && (

              <button className=" right-0 mx-6 my-1 bg-green-600 px-4 py-2 rounded-2xl hover:text-white" onClick={()=>goLogin()}>
                Đăng nhập
              </button>
          )}
          {isLogin && (
            <div className="flex">
              <div className="justify-center text-green-600 text-center  text-lg"><div className="text-sm text-gray-600">Xin Chào</div>{fullname}</div>
              <button
                className=" mx-6 my-1 bg-lime-500 px-4 py-2 rounded-2xl hover:text-white"
                onClick={() => handleLogout()}
              >
                Đăng xuất
              </button>
            </div>
              
          )}
        </div>
      </div>
      <div className="flex justify-center my-5">
        <div className="w-[90%]">
          {/* <div className="flex justify-center text-4xl mt-20 mb-5 text-[#372948]">LIBRALY</div> */}
          {isAdmin && (
            <div className="flex justify-end">
              <button
                className="bg-green-600 px-4 py-2 rounded-xl hover:text-white"
                onClick={() => handleAdd()}
              >
                Thêm sách
              </button>
            </div>
          )}
          <div className="w-full my-4">
            <DataTable
              columns={columns}
              data={book}
              pagination
              customStyles={customStyles}
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
