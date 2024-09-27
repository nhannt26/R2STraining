import { Link, Outlet } from "react-router-dom"

const Root = () => {
  return (
    <>
      <Link to='/'>List product</Link>
      <Outlet/>
    </>
  )
}

export default Root