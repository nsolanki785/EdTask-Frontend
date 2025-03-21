import React, { useEffect } from "react";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/authSlice";

const DashBoard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <>
      <div>
        <Header />
        <div class="my-5 relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  First Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((user) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.firstName}
                    </th>
                    <td class="px-6 py-4">{user.lastName}</td>
                    <td class="px-6 py-4">{user.email}</td>
                    <td class="px-6 py-4">{user.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
