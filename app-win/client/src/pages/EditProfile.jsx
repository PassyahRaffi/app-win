import { useContext, useState } from "react";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function EditProfile() {
  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    fullname: state.user.fullname,
    username: state.user.username,
    gender: state.user.gender,
    phone: state.user.phone ? state.user.phone : "",
    address: state.user.address,
    email: state.user.email,
    image: "",
  });

  const { fullname, username, gender, phone, address, email } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.patch(`/user/${state.user.id}`, body, config);

      const alert = (
        <div
          className="bg-green-400 rounded-md text-center text-sm px-4 py-3 mt-4 font-bold"
          role="alert"
        >
          <p>Changes Saved!</p>
        </div>
      );
      setMessage(alert);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              Edit Profile
            </h2>
          </div>

          <div className="flex justify-center">
            <img
              src={state.user.image}
              alt="user"
              className="rounded-full border-2 mb-2 w-40 hover:brightness-75 cursor-not-allowed"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="fullname" className="">
                  Fullname
                  <input
                    id="fullname"
                    name="fullname"
                    type="fullname"
                    autoComplete="fullname"
                    required
                    onChange={handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("fullname required.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Input Fullame"
                    value={fullname}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="username" className="">
                  Username
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    onChange={handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("username required.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Input Username"
                    value={username}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="gender" className="">
                  Gender
                  <input
                    id="gender"
                    name="gender"
                    type="gender"
                    autoComplete="gender"
                    required
                    onChange={handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("gender required.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Male / Female"
                    value={gender}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="fullname" className="">
                  Phone Number
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    autoComplete="phone"
                    required
                    onChange={handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("phone required.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Input Phone Number"
                    value={phone}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="address" className="">
                  Address
                  <input
                    id="address"
                    name="address"
                    type="address"
                    autoComplete="address"
                    required
                    onChange={handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("address required.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Input Address"
                    value={address}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="email" className="">
                  Email
                  <input
                    disabled
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("email required.")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    className="cursor-not-allowed disabled:text-slate-500 disabled:shadow-none bg-gray-200 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Input Email"
                    value={email}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
            >
              Save Changes
            </button>
            {message && message}
          </form>
        </div>
      </div>
    </>
  );
}
