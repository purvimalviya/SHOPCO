// import React from 'react'
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {

    const location = useLocation();
    const pathParts = location.pathname.split("/").filter((part) => part!=='');


  return (
    <div className="flex flex-row">

        {pathParts.map((part, index) => {
            const fullPath = `/${pathParts.slice(0, index + 1).join("/")}`;
            const breadcrumbName = part;

            return (
            <span key={index} className="flex flex-row items-center font-semibold">
                <span className="mx-1">{'>'}</span>
                <Link to={fullPath} className="text-gray-600 hover:underline">
                {breadcrumbName}
                </Link>
            </span>
            );
        })}
    </div>
  )
}

export default Breadcrumbs
