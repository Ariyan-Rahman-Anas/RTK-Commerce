import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="absolute left-0 right-0 bottom-0 text-center ">
      <p>RTK-Commerce || Developed by <Link target="_blank" to={"https://ariyanrahmananas.netlify.app/"} className="hover:underline hover:text-primary duration-500 " >Ariyan Rahman Anas</Link></p>
    </footer>
  )
}