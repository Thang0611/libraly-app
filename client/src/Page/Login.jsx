import React from "react";
import loginImg from "../assets/login.jpg";
import { AiFillFacebook } from "react-icons/ai";
// import { useCookies } from "react-cookie";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { HomeOutlined } from '@ant-design/icons';
const URLBase = "http://localhost:3000";

export default function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [err, setErr] = useState("");

  const handleChange = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const goToHome=()=>{
    navigate("");
  }

  const handleLogin = async (input) => {
    console.log(input);
    await axios
      .post(`${URLBase}/auth/login`, input)
      .then(async (res) => {
        if (res.status == 200) {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.payload.role);
          localStorage.setItem("id", res.data.payload.userid);
          localStorage.setItem("fullname", res.data.payload.fullname);
          localStorage.setItem("email", res.data.payload.email);
          // alert('Đăng nhập thành công')
          navigate("/");
        } else {
          setErr(res.data.message || res.data.message[0]);
        }
      })
      .catch((err) => {
        console.log(err);
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
        <form className="bg-white w-full max-w-[400px] mx-auto p-8 relative">
          <h2 className="text-3xl font-bold flex justify-center items-center py-5">
            Login
          </h2>
          {/* <div className="flex justify-around">
            <button
              type="button"
              className="flex items-center bg-gray-100 px-6 py-2 hover:bg-gray-200 "
            >
              <AiFillFacebook className="mr-2" />
              Facebook
            </button>
            <button
              type="button"
              className="flex items-center bg-gray-100 px-6 py-2 hover:bg-gray-200"
            >
              <FcGoogle className="mr-2" />
              Google
            </button>
          </div> */}
          <div className="flex flex-col py-2 px-2">
            <label className="text-lg">Tên đăng nhập</label>
            <input 
              name="username"
              className="px-2 py-2 bg-slate-200 rounded-md outline-0"
              type="text"
              value={input.username || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col py-2 px-2">
            <label className="text-lg">Mật khẩu</label>
            <input
              name="password"
              type="password"
              className="px-2 py-2 bg-slate-200 rounded-md  outline-0"
              value={input.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className="h-4">
            {err && (
              <div>
                <p className="text-red-800">{err}</p>
              </div>
            )}
          </div>
          
          <div className="">
            <button
              type="button"
              className="bg-indigo-600  w-full flex justify-center py-2 my-5 text-white"
              onClick={() => {
                handleLogin(input);
              }}
            >
              Login
            </button>
          </div>
          <div className="flex justify-between">
            {/* <p>
              <input type="checkbox" name="" id="" />
              Remember Me
            </p> */}
            <Link to={"/register"} className="text-blue-700 " >Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
