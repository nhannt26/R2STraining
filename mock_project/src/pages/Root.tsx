import { Link, Outlet } from "react-router-dom"

const Root = () => {
  return (
    <>
      <Link to='/product'>List product</Link>
      <Outlet/>
    </>
  )
}

export default Root