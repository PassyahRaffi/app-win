import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ModalLoginContext, ModalRegisterContext } from "../context/context";

export default function Jumbotron() {
  const [openModalRegister, setOpenModalRegister] =
    useContext(ModalRegisterContext);
  const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext);

  return (
    <>
      <nav className="bg-jumbotron bg-no-repeat bg-cover bg-gray-300">
        <div className="md:w-9/12 md:m-auto relative md:py-4">
          <div className="absolute md:flex justify-between items-center w-full z-20">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>

            <div className="buttonGroup flex gap-4">
              <button
                onClick={() => setOpenModalLogin(!openModalLogin)}
                className="rounded px-6 py-1 border-2 border-black text-black font-bold"
              >
                Login
              </button>
              <button
                onClick={() => setOpenModalRegister(!openModalRegister)}
                className="rounded px-6 py-2 bg-gray-500 text-white font-bold hover:bg-gray-400"
              >
                Register
              </button>
            </div>
          </div>

          <div className="md:py-32">
            <h1 className="flex justify-center text-7xl text-black font-bold ledaing-5">
              Hello World!
            </h1>
          </div>
        </div>
      </nav>
    </>
  );
};

