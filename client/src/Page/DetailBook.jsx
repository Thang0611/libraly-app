import { DownOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Image, Input, InputNumber, Rate, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function DetailBook() {
  const [loading, setLoading] = useState(true);
  const [effect,setEffect]=useState("")
  const { state } = useLocation();
  const [book, setBook] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState("");
  const [rate,setRate]=useState()
  const [date, setDate] = useState();
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [picture,setPicture] =useState(null)
  const [imgData,setImgData] =useState(null)
  const [error,setError]=useState('')
  const [messErr,setMessErr]=useState('')
  const [inputRv,setInputRv]=useState({})
  const [star,setStar]=useState(5)
  const [quantity,setQuantity] =useState(1)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  
  const setHeader = () => {
    let token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };
  const role = localStorage.getItem("role");
  const fullname = localStorage.getItem("fullname");


  const URLBase = "http://localhost:3000/book";
  // const dateFormatList = ["DD/MM/YYYY"];

  const addBook=()=>{

  } 

  const getBook = async (id) => {
      axios
      .get(`${URLBase}/${id}`)
      .then((res) => {
        console.log(res.data.reviews)
        setBook(res.data)
        setReviews(res.data.reviews)
        // console.log(reviews)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    const token= localStorage.getItem('token')
    if(!token){
      navigate('/Login')
    }
    setIsLogin(true)
  }, [])

  useEffect(()=>{
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  })
  useEffect(() => {
    if (state){
      console.log(1)
      console.log(state.id)
      setIsEdit(true)
      setEffect('pointer-events-none ')
      getBook(state.id);

      // setReviews(book.reviews)
      setInput({
        id:book.id,
        title: book.title,
        author: book.author,
        publishingCompany: book.publishingCompany,
        category: book.category,
        date: book.date,
        decription: book.decription,
        numOfPage: book.numOfPage,
        amount: book.amount,
        image:book?.image?.url,
        reviews:book.revews
      });
      console.log(book)
      console.log(reviews)
    }
    else {
      console.log(2)
      setIsAdd(true)
      setEffect('')
    }
    
  }, [book.amount]);

  // useEffect(() => {
  //   console.log(reviews.created_at)
  // }, [book])
 
  // const handleChangeComment = e => {
  //   setInputRv(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  //   console.log(inputRv)
  // }
    
  const handleChange= (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeStar= (value) => {
    setStar(value)
  }
  

 
  const goHome=()=>{
    navigate('/')
  }
  const goLogin=()=>{
    navigate('/login')
  }
  const goOrder=()=>{
    navigate('/order')
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/")
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
    setIsSave(!isSave);
    setIsCancel(!isCancel);
    setEffect('');
  };
  const handleAdd=async (input)=>{

    let formData = new FormData();
    formData.append('image', picture)
    formData.append('title', input?.title);
    formData.append('author', input?.author);
    formData.append('publishingCompany', input?.publishingCompany);
    formData.append('category', input?.category);
    formData.append('date', input?.date);
    formData.append('numOfPage',input?.numOfPage);
    formData.append('decription', input?.decription);
    formData.append('amount', input?.amount);
    axios.post(`${URLBase}`,formData,setHeader())
    .then(res=>{
      console.log(res)
      success(`${res.data.message[0]}`);
    })
    .catch(err=>{
      // setError(true)
      // setMessErr(err.response.data.message[0])
      console.log(err)
      warning(`${err.response.data.response||err.response.data.message[0]}`)
    })
  }
  const  TimestampToDateTime=(props) =>{
    const timestamp = props // the timestamp you want to convert
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  return (
    <span>{dateString} {timeString}</span>
  );
  }
  const handleAddBookCheck=(input)=>{
    handleAdd(input)
    // if(input.title && input.author && input.decription && input.date && input.numOfPage && input.category && input.amount){
    //   console.log(input)
    //   setMessErr('')
    //   setError(false)
    //   handleAdd(input)
    //   // setLoading(true)
    // }
    // else {
    //   console.log(input)
    //   // setError(true)
    //   // setMessErr('Yêu cầu nhập đầy đủ thông tin.')
    //   warning('Yêu cầu nhập đầy đủ thông tin.')
    // }
  }

  const handleSave = async (input) => {
    let formData = new FormData();
    formData.append('image', picture)
    formData.append('title', input?.title);
    formData.append('author', input?.author);
    formData.append('publishingCompany', input?.publishingCompany);
    formData.append('category', input?.category);
    formData.append('date', input?.date);
    formData.append('numOfPage',input?.numOfPage);
    formData.append('decription', input?.decription);
    formData.append('amount', input?.amount);
    console.log(input);
    await axios
      .put(`${URLBase}/${state.id}`, formData, setHeader())
      .then(async (res) => {
        setEffect('pointer-events-none');
        console.log(res);
        success(`${res.data.message[0]}`);
        // setInterval(1000,()=>{success("Cập nhật thành công")}) ;
        setInterval(()=>{window.location.reload()},1000) ;
        // setInterval(()=>{handleEdit()},10000) ;
        // window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        // setError(true)
        // setMessErr(err.response.data.message[0])
        warning(`${err.response.data.response||err.response.data.message[0]}`)
      });
  };


  const handleCancel = () => {
    handleEdit();
    setEffect(' pointer-events-none');
  };

  const onChangeNumber = (value) => {
    setQuantity(value)
    console.log(quantity)
  };
  const onChangePicture = e => {
    if (e.target.files[0]) {
      
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      
      reader.addEventListener("load", () => {
        setImgData(reader.result);
        setInput(prevState => ({ ...prevState, image : reader.result }))
      });
      reader.readAsDataURL(e.target.files[0]);
      
    
    }
  }

  const items = [
    {
      label: "Truyện tranh",
      value: "Truyện tranh",
    },
    {
      label: "Giáo trình",
      value: "Giáo trình",
    },
    {
      label: "Truyện ngắn",
      value: "Truyện ngắn",
    },
    {
      label: "SGK",
      value: "SGK",
    },
  ];
  const menuProps = {
    items,
  };

  
  const handleBuy=()=>{
    const userId=localStorage.getItem("id")
    const bookId=book.id;
    const amount =quantity
    const data={userId:userId,bookId:bookId,amount:amount}
    console.log(data)
    axios.post('http://localhost:3000/order',data,setHeader())
    .then(async (res)=>{
      console.log(res)
      success(`${res.data.message[0]}`);
      console.log(res)
      await getBook(state.id)
      
    })
    .catch(err=>{
      warning(`${err.response.data.response||err.response.data.message[0]}`)
      console.log(err)
    })

  }
  
  
  const handleRate=async ()=>{
    const userId=localStorage.getItem("id")
    const bookId=book.id;
    const data={userId:userId,star:star,comment:input.comment}
    console.log(bookId)
    console.log(data)
    await axios.post(`${URLBase}/review/${bookId}`,data,setHeader())
    .then(data=>{
      success('Thêm đánh giá thành công')
      console.log(data)
      getBook(state.id)
      
    })
    .catch(err=>{
      warning(`${err.response.data.response||err.response.data.message[0]}`)
      console.log(err)
    })
  }

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

  return (
    <div className="w-full bg-slate-100 pb-5">
      <div className="h-[48px] flex justify-between w-full shadow-md z-10 bg-white">

          <button className=" mx-5 my-1 text-3xl flex hover:text-zinc-600" onClick={() => goHome()}>
            {/* <HomeOutlined style={{ fontSize: "32px", marginRight: "8px" }} /> */}
            <p>LIBRALY</p>
          </button>

        {!isLogin && (

            <button className="justify-end mx-6 my-1 bg-green-600 px-4 py-2 rounded-2xl" onClick={() => goLogin()}>
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
      {/* <div className="flex justify-center text-3xl mt-20 mb-5">LIBRALY</div> */}
      <div className="flex px-15 bg-white rounded-2xl mx-5 my-8 ">
        <div className=" w-[50%] h-full px-4">
          <div>
            <div className="mt-5">
              <p className=" text-lg font-bold">Tiêu đề</p>
              <Input
                className={" w-full px-2  rounded-md font-bold uppercase "+(effect)}
                type="text"
                name="title"
                id="title"
                value={input.title ? input.title : null}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between mt-3 ">
              <div>
                <p className="  ">Nhà xuất bản</p>
                <Input
                  className={" h-8 w-64 px-2  rounded-md "+(effect)}
                  type="text"
                  name="publishingCompany"
                  value={
                    input.publishingCompany ? input.publishingCompany : null
                  }
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className=" ">Tác giả</p>
                <Input
                  className={" h-8 w-64 px-2  rounded-md "+(effect)}
                  type="text"
                  name="author"
                  value={input.author ? input.author : null}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <div>
                <p className="  ">Ngày phát hành</p>
                {/* <DatePicker
                  className="h-8 w-64 px-2  rounded-md"
                  defaultValue={dayjs((date), dateFormatList[0])}
                  // defaultValue={date}
                  dateFormatList
                /> */}
                <Input
                  className={"h-8 w-64  rounded-md "+(effect)}
                  value={input.date ? input.date : null}
                  type="date"
                  name="date"
                  onChange={handleChange}
                />
              </div>
              <div name="category">
                <p className=" ">Thể loại</p>
                <Input
                  className={"h-8 w-64  rounded-md "+(effect)}
                  value={input.category ? input.category : null}
                  type="text"
                  name="category"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <div>
                <p className=" ">Số trang</p>
                <Input
                  className={" h-8 w-64  rounded-md "+(effect)}
                  type="number"
                  name="numOfPage"
                  value={input.numOfPage ? input.numOfPage : null}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className=" ">Số lượng</p>
                <Input
                  className={"h-8 w-64  rounded-md "+(effect)}
                  type="number"
                  name="amount"
                  value={input.amount  }
                  onChange={handleChange}
                />
                {/* <Input
                  className={" h-8 w-64 px-2 py-1 rounded-md "}
                  type="text"
                  
                /> */}
              </div>
            </div>
            <div className="my-3 ">
              <p className="">Mô tả</p>
              <TextArea
                className={"w-full  px-2  rounded-md "+(effect)}
                rows={4}
                type="text"
                name="decription"
                value={input.decription ? input.decription : null}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* {error&&<div className='flex justify-start'>
            <p className=' text-red-600 '>{messErr}</p>
          </div>} */}
        </div>
        <div className=" w-[50%]">
          {
          (!isEdit)&&<div className=" flex justify-center ">
          <input className={'mt-3'} type="file" name="file" id="file" accept='image/*'  onChange={onChangePicture}/>
          </div >
          }
          <div className="flex justify-center flex-col">
            <div className="flex justify-center h-[420px]">
              <Image
                className="flex justify-center border-none max-h-[440px] object-contain"
                width={"80%"}
                name="image"
                height={"420px"}
                src={input?.image}
                preview={false}
              />
            </div>
            <div>
              {!isAdmin && (
                <div className="flex justify-center my-5  h-[64px] items-center">
                  <p>Số lượng</p>
                  <div className="mx-4">
                    <InputNumber defaultValue={1} value={quantity} onChange={onChangeNumber} />
                  </div>
                  <div className="mx-4">
                  {contextHolder}
                    <Button className="bg-[#bb1f25] text-white  hover:!text-black items-center text-lg  h-12  w-32 text-center" onClick={()=>handleBuy()}>
                      Đặt mua
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {isAdmin && isAdd && (
              <div className="flex justify-end my-5  h-[64px] items-center">
                {contextHolder}
                <Button
                  className="mx-5 bg-red-600 text-white hover:!text-black"
                  onClick={() => handleAddBookCheck(input)}
                >
                  Thêm mới
                </Button>
              </div>
            )}
            {isAdmin && isEdit && (
              <div className="flex justify-end my-5  h-[64px] items-center">
                <Button
                  className="mx-5 bg-red-600 text-white hover:!text-black"
                  onClick={() => handleEdit()}
                >
                  Sửa
                </Button>
              </div>
            )}
            {isAdmin && isSave && isCancel && (
              <div className="flex justify-end my-5  h-[64px] items-center">
                {contextHolder}
                <Button
                  className="mx-5 bg-red-600 text-white hover:!text-black" onClick={() => {handleSave(input)}} >Lưu
                </Button>
                <Button
                  className="mx-5 bg-red-600 text-white hover:!text-black"
                  onClick={() => handleCancel()}
                >
                  Hủy bỏ
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      { isEdit && 
      <div className=" px-15 bg-white rounded-2xl mx-5">
        <div className="">
          <div className="my-5 mx-5 ">
            <p className="py-5">Đánh giá</p>
           
            {!isAdmin&&<div>
              <div className="flex justify-center mb-4">
                <Rate  value={star} onChange={handleChangeStar}/>
              </div>
              <div className="flex justify-center">
                <div className="w-[60%]" >
                  <TextArea 
                  className="py-1"
                  type="text"
                  name="comment"
                  value={input.comment ? input.comment : null}
                  onChange={handleChange}
                  rows={3}
                  placeholder={'Viết đánh giá ...'}
                  />
                </div>
                <div className=""> 
                  <Button className="ml-8 w-20 h-8 bg-blue-500 text-white hover:!text-black" onClick={()=>handleRate()}>
                    Gửi
                  </Button>
                </div>
              </div>  
            </div>
            }
          </div>
          
          <div className="flex justify-center">
            {
              <div className="w-[90%] ">
              {reviews.map((e, index)=>(
                  <div className="px-5 py-2 bg-[#F8F4EA] mb-3 rounded-lg">
                      <div key={index}>
                        <p>{e.user.fullname}</p>
                        <p className="text-[12px]">{TimestampToDateTime(e.created_at)}</p>
                        <Rate disabled value={e.star} className="text-[12px] pb-2" />
                        <div className="">
                          <p>{e.comment}</p>
                        </div>
                        
                      </div>
                      {/* <div className="py-3"></div> */}
                  </div>
                    
              ))} 
              
              </div>
            }
          </div>
          <div className="py-3"></div>
        </div>
      </div>}
    </div>
  );
}

export default DetailBook;
