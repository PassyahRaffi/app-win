import React, { useState, useContext } from "react";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Profile() {
  const [preview, setPreview] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    image: "",
  });

  const { image } = form;

  const handleImageChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    console.log(form);
  };

  const handleImageSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);

      const response = await API.patch(
        `/user/edit/image/${state.user.id}`,
        formData,
        config
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-full flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            My Profile
          </h2>
        </div>

        <form
          className="text-center flex justify-center pt-20"
          onSubmit={handleImageSubmit}
        >
          <label
            htmlFor="image"
            className="rounded-full flex items-center"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Change Picture"
          >
            <input
              type="file"
              id="image"
              name="image"
              className="sr-only"
              onChange={handleImageChange}
            />
            <img
              src={preview ? preview : state.user.image}
              alt="user"
              className="rounded-full border-2 w-40 hover:brightness-75 cursor-pointer"
            />
            {preview && (
              <button className="bg-green-600 text-white text-sm px-5 rounded-full mx-3">
                Save
              </button>
            )}
          </label>
        </form>

        <div className="flex justify-center">
          <Link to="/editProfile">
            <span
              className="flex object-right-top bg-gray-400 text-white rounded-lg py-1 px-2 hover:bg-gray-200 active:bg-gray-400 focus:outline-none focus:ring-gray-300"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 30 30"
              >
                {" "}
                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
              </svg>
              <p className="text-sm">Edit Profile</p>
            </span>
          </Link>
        </div>

        <form>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullname" className="">
                Fullname
                <input
                  disabled
                  className="cursor-not-allowed disabled:text-gray-700 disabled:shadow-none bg-gray-200 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={state.user.fullname}
                />
              </label>
            </div>

            <div>
              <label htmlFor="username" className="">
                Username
                <input
                  disabled
                  className="cursor-not-allowed disabled:text-gray-700 disabled:shadow-none bg-gray-200 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={state.user.username}
                />
              </label>
            </div>

            <div>
              <label htmlFor="gender" className="">
                Gender
                <input
                  disabled
                  className="cursor-not-allowed disabled:text-gray-700 disabled:shadow-none bg-gray-200 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={state.user.gender}
                />
              </label>
            </div>
            
            <div>
              <label htmlFor="phone" className="">
                Phone Number
                <input
                  disabled
                  className="cursor-not-allowed disabled:text-gray-700 disabled:shadow-none bg-gray-200 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={state.user.phone}
                />
              </label>
            </div>

            <div>
              <label htmlFor="address" className="">
                Address
                <input
                  disabled
                  className="cursor-not-allowed disabled:text-gray-700 disabled:shadow-none bg-gray-200 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={state.user.address}
                />
              </label>
            </div>

            <div>
              <label htmlFor="email" className="">
                Email
                <input
                  disabled
                  className="cursor-not-allowed disabled:text-gray-700 disabled:shadow-none bg-gray-200 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={state.user.email}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
