import React from 'react'
import SearchField from "./searchField.jsx";
import Card from "./card.jsx";
import {LuUserRound} from "react-icons/lu";

const ManageEmployeeLogin = () => {
  return (
      <div>
          <div
              className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <h1 className="text-xl font-medium">Employees  </h1>
                  <div className="flex items-center justify-center space-x-2">
                      <LuUserRound className="text-xl"/>
                      <p className="text-xl">- Staff Login</p>
                  </div>
              </div>
          </div>


          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-3">
                  <SearchField/>
              </div>
              <div className="lg:col-span-9 mr-8">
                  <Card/>
              </div>
          </div>
      </div>
  )
}

export default ManageEmployeeLogin