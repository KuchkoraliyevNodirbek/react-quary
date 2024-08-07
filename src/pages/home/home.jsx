import React from "react";
import { useGetTodos } from "./service/query/useGetTodos";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userCreateTodo } from "./service/mutation/userCreateTodo";
import { useDeleteTodo } from "../deleteTodo/service/mutation/userDeleteTodo";

export const Home = () => {
  const { isLoading, data } = useGetTodos();
  const { mutate, isPending } = userCreateTodo();
  const { mutate: deleteTodo, isPending: deletePending } = useDeleteTodo();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    mutate(data, {
      onSuccess: () => {
        console.log("done");
      },
    });
    reset();
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <input
            {...register("title")}
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Title"
          />
        </div>
        <div>
          <input
            {...register("description")}
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>

      {isPending && <p className="text-center text-gray-500">Loading...</p>}
      {isLoading ? (
        <h1 className="text-center text-gray-500">Loading...</h1>
      ) : (
        <div className="mt-4 space-y-4">
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-gray-300 rounded"
            >
              <Link
                to={`/user/${item.id}`}
                className="text-blue-500 hover:underline"
              >
                <h1>{item.title}</h1>
              </Link>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/change-todo/${item.id}`)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
