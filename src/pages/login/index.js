import React, {useState} from "react";
import login from "../../api/auth/login";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import handleAxiosResponseError from "../../helpers/handleAxiosResponseError";

export default function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const callLoginRequest = (event) => {
        login(email, password).then((response) => {
            if (response.success) {
                toast.success("Vous êtes authentifié");
                Cookies.set('jwt', response.success.token, {expires: 91});
                Cookies.set('username', response.success.username, {expires: 91});
                Cookies.set('email', response.success.email, {expires: 91});
                setTimeout(() => {
                    props.history.push('/dashboard');
                }, 500);
            }
            else if (response.warning)
                toast.warning(response.warning)
        }).catch((error) => {
            toast.error(handleAxiosResponseError(error))
        });
        event.preventDefault()
    }

    return (
      <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="https://pickeat.fr/images/logo.png"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Pickeat BackOffice</h2>
            </div>

            <div className="mt-8">
              <div>
                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Let's Gooo !!</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form noValidate className="space-y-6" onSubmit={(e) => callLoginRequest(e)}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        onChange={(event => setEmail(event.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        onChange={(event => setPassword(event.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://www.pexels.com/photo/2983101/download/?search_query=food&tracking_id=en8m7xcss1s"
            alt=""
          />
        </div>
      </div>
    )
  }
