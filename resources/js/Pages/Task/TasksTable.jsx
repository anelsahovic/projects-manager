import React, { useState } from "react";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({
  tasks,
  queryParams = null,
  hideProjectColumn = false,
  success,
}) {
  const [successMessage, setSuccessMessage] = useState(success);
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (!window.confirm("Are you sure you want to delete the task?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
  };
  return (
    <>
      {successMessage && (
        <div className="absolute px-4 py-2 text-white rounded shadow top-1 right-1 bg-emerald-500">
          {successMessage}
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-nowrap">
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>

              {!hideProjectColumn && <th className="px-3 py-2"></th>}

              <th className="px-3 py-2">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-3 py-2">
                {/* status search */}
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-nowrap">
              <th
                onClick={(e) => sortChanged("id")}
                className={
                  "px-3 py-2 cursor-pointer hover:underline " +
                  (queryParams.sort_field === "id"
                    ? " text-white "
                    : " text-gray-400")
                }
              >
                ID
              </th>
              <th className="px-3 py-2">Image</th>
              {!hideProjectColumn && (
                <th className="px-3 py-2">Project Name</th>
              )}

              <th
                onClick={(e) => sortChanged("name")}
                className={
                  "px-3 py-2 cursor-pointer hover:underline " +
                  (queryParams.sort_field === "name"
                    ? " text-white "
                    : " text-gray-400")
                }
              >
                Task Name
              </th>
              <th
                onClick={(e) => sortChanged("status")}
                className={
                  "px-3 py-2 cursor-pointer hover:underline " +
                  (queryParams.sort_field === "status"
                    ? " text-white "
                    : " text-gray-400")
                }
              >
                Status
              </th>
              <th
                onClick={(e) => sortChanged("priority")}
                className={
                  "px-3 py-2 cursor-pointer hover:underline " +
                  (queryParams.sort_field === "priority"
                    ? " text-white "
                    : " text-gray-400")
                }
              >
                Priority
              </th>
              <th
                onClick={(e) => sortChanged("created_at")}
                className={
                  "px-3 py-2 cursor-pointer hover:underline " +
                  (queryParams.sort_field === "created_at"
                    ? " text-white "
                    : " text-gray-400")
                }
              >
                Create date
              </th>
              <th
                onClick={(e) => sortChanged("due_date")}
                className={
                  "px-3 py-2 cursor-pointer hover:underline " +
                  (queryParams.sort_field === "due_date"
                    ? " text-white "
                    : " text-gray-400")
                }
              >
                Due Date
              </th>
              <th className="px-3 py-2">Created By</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <img src={task.image_path} style={{ width: 60 }} />
                </td>
                {!hideProjectColumn && (
                  <td className="px-3 py-3 text-nowrap">{task.project.name}</td>
                )}
                <td className="px-3 py-3 text-white text-nowrap hover:underline">
                  <Link href={route("task.show", task.id)}>{task.name}</Link>
                </td>
                <td className="px-3 py-3 text-center">
                  <span
                    className={
                      "px-2 py-1 rounded text-white " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span
                    className={
                      "px-2 py-1 rounded text-white " +
                      TASK_PRIORITY_CLASS_MAP[task.priority]
                    }
                  >
                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                  </span>
                </td>
                <td className="px-3 py-3 text-nowrap">{task.created_at}</td>
                <td className="px-3 py-3 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-3">{task.createdBy.name}</td>
                <td className="flex px-3 py-3 text-right">
                  <Link
                    href={route("task.edit", task.id)}
                    className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => deleteTask(task)}
                    className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  );
}
