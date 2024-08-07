import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteTodo = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id) => request.delete(`/todos/${id}`).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries(["get-todo"]);
    },
  });
};
