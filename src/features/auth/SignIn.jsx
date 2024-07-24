import { Link, useNavigate } from "react-router-dom"
import { useSignInMutation } from "./../../app/api/authApi"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNotification } from "./../notifications/notificationSlice"

export default function SignIn() {
  const [emailErr, setEmailErr] = useState(null)
  const [passErr, setPassErr] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [signIn, { data, isError, isLoading }] = useSignInMutation()
    
    const handleSignIn = async(e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        try {
            const user = { email, password }
            const loginUser = await signIn(user).unwrap()
            if (loginUser?.user) {
                form.reset()
                setEmailErr(null)
                setPassErr(null)
                dispatch(addNotification({
                id: Date.now(),
                message: "Sign ip successful!",
                type: "success",
                duration: 3000
                }))
                navigate("/", { replace: true })
                localStorage.setItem("userData", JSON.stringify({email, token: loginUser?.token }) )
            }
        } catch (err) {
            const errors = err?.data?.errors
            if (errors) {
                setEmailErr(errors.email)
                setPassErr(errors.password)
                dispatch(addNotification({
                id: Date.now(),
                message: "Failed to Sign in",
                type: "error",
                duration: 3000
                }))
            }
        }
    }

  return (
    <div className="my-10 text-center px-2 ">
          <form onSubmit={handleSignIn} className="space-y-4 w-full md:w-[80vw] lg:w-[60vw] mx-auto">
                <div className="relative category w-full">
                        <input
                            type="email"
                            name="email"
                            required
                            className="input-field peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="input-label"
                        >
                            Email
                  </label>
          {emailErr && <p className="err-msg">{emailErr}</p>}
                    </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative title w-full">
                        <input
                            type="password"
                            name="password"
                            required
                            className="input-field peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="input-label"
                        >
                            Password
                      </label>
            {passErr && <p className="err-msg">{passErr}</p>}
                    </div>
                </div>
                <input type="submit" value={"Sign in"} className="btn" />
          </form>
          <p>New in here? <Link to={"/sign-up"} className="font-medium hover:text-primary duration-500 " >Sign up</Link> </p>
        </div>
  )
}