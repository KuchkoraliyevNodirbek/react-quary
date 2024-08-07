import React from "react";
import { useForm } from "react-hook-form";

export const Form = ({ title, description, submit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { title, description },
  });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-[300px] mx-auto space-y-4"
    >
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
  );
};
