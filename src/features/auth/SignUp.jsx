import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "./../../app/api/authApi";
import { useDispatch } from 'react-redux';
import { addNotification  } from "./../notifications/notificationSlice";
import { useState } from 'react';

export default function SignUp() {

  const [nameErr, setNameErr] = useState(null)
  const [emailErr, setEmailErr] = useState(null)
  const [passErr, setPassErr] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signUp, { data, error, isLoading }] = useSignUpMutation()
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    try {
      const newUser = { name, email, password }
      const creatingUser = await signUp(newUser).unwrap()
      if (creatingUser?.user) {
        form.reset()
        setNameErr(null)
        setEmailErr(null)
        setPassErr(null)
        dispatch(addNotification({
          id: Date.now(),
          message: "Sign up successful!",
          type: "success",
          duration: 3000
        }))
        navigate("/", { replace: true })
        localStorage.setItem("userData", JSON.stringify({name, email}) )
      }
    } catch (err) {
      const errors = err?.data?.errors
      if (errors) {
        setNameErr(errors.name)
        setEmailErr(errors.email)
        setPassErr(errors.password)
        dispatch(addNotification({
          id: Date.now(),
          message: "Failed to Sign up",
          type: "error",
          duration: 3000
        }))
      }
    }
  }

  return (
    <div className="my-10 text-center px-2 ">
      <form onSubmit={handleSignUp} className="space-y-4 w-full md:w-[80vw] lg:w-[60vw] mx-auto">
        <div className="relative brand w-full">
          <input
            type="text"
            name="name"
            required
            className="input-field peer"
            placeholder=" "
          />
          <label htmlFor="name" className="input-label">
            Name
          </label>
          {nameErr && <p className="err-msg ">{nameErr}</p>}
        </div>
        <div className="relative category w-full">
          <input
            type="email"
            name="email"
            required
            className="input-field peer"
            placeholder=" "
          />
          <label htmlFor="email" className="input-label">
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
            <label htmlFor="password" className="input-label">
              Password
            </label>
            {passErr && <p className="err-msg">{passErr}</p>}
          </div>
        </div>
        <input type="submit" value={"Sign up"} className="btn" />
      </form>
      <p>Already have an account? <Link to={"/log-in"}>Sign in</Link> </p>
    </div>
  )
}