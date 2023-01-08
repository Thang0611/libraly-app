import React from "react";
import loginImg from "../assets/login.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { HomeOutlined } from "@ant-design/icons";
import { message } from "antd";
const URLBase = "http://localhost:3000/user";
export default function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
    const [err,setErr]=useState(false)
    const [messageApi, contextHolder] = message.useMessage();

  const handleChange = async (e) => {
    await setInput({ ...input, [e.target.name]: e.target.value });
    // console.log(input);
  };


  const handleRegister = async (input) => {
    console.log(input)
    await axios.post(`http://localhost:3000/user/register`, input)
      .then((res) => {
        console.log(res)
          // alert(res.data.message);
          alert('Đăng kí thành công')
          navigate("/login");
      }
      )
      .catch((err) => {
        console.log(err)
        setErr(err.response.data.message[0]);
      });
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <div>
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="Img"
      />
      <Link to={"/"}><button className="absolute top-0 left-0 mx-5 my-5"><HomeOutlined style = { { fontSize : '32px' ,color:"white"  } } /></button></Link>
      </div>
      <div className=" flex justify-center items-center h-full ">
        <form className="bg-white w-full max-w-[400px] mx-auto px-8 py-3 relative">
          <h2 className="text-3xl font-bold flex justify-center items-center py-1">
            Register
          </h2>
          <div className="flex flex-col py-2 px-2">
            <label>Tên đăng nhập</label>
            <input
              name="username"
              className="px-2 py-2 rounded-md bg-gray-200 outline-0"
              type="text"
              required
              value={input.username || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2  ">
            <label>Mật khẩu</label>
            <input
              name="password"
              type="password"
              className=" rounded-md px-2 py-2 bg-gray-200 outline-0"
              required
              value={input.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2  ">
            <label>Nhập lại mật khẩu</label>
            <input
              name="passwordcf"
              type="password"
              className=" rounded-md px-2 py-2 bg-gray-200 outline-0"
              required
              value={input.passwordcf || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2  ">
            <label>Họ và tên</label>
            <input
              name="fullname"
              type="text"
              className=" rounded-md px-2 py-2 bg-gray-200 outline-0"
              required
              value={input.fullname || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2  ">
            <label>Email</label>
            <input
              name="email"
              type="text"
              className=" rounded-md px-2 py-2 bg-gray-200 outline-0"
              required
              value={input.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="h-6">
            {err&&(<div>
                <p className="text-red-600 ">{err}</p>
            </div>)}
          </div>
    
          <div className="">
            {contextHolder}
            <button
              type="button"
              className="bg-indigo-600  w-full flex justify-center py-2 my-1 text-white"
              onClick={() => handleRegister(input)}
            >
              Register
            </button>
          </div>

          <div>
            <p>
              Allready have an account?{" "}
              <Link to={"/login"} className="text-blue-700 underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
