import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index({ auth, projects, queryParams = null, success }) {
  queryParams = queryParams || {};

  const [successMessage, setSuccessMessage] = useState(success);

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
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
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project) => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
    console.log(successMessage);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSuccessMessage(null);
  //   }, 2000);
  // }, [successMessage]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Projects
          </h2>

          <Link
            href={route("project.create")}
            className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="relative py-12">
        {successMessage && (
          <div className="absolute px-4 py-2 text-white rounded shadow top-1 right-1 bg-emerald-500">
            {successMessage}
          </div>
        )}
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Project Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
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
                      <th
                        onClick={(e) => sortChanged("name")}
                        className={
                          "px-3 py-2 cursor-pointer hover:underline " +
                          (queryParams.sort_field === "name"
                            ? " text-white "
                            : " text-gray-400")
                        }
                      >
                        Name
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
                    {projects.data.map((project) => (
                      <tr
                        key={project.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <img src={project.image_path} style={{ width: 60 }} />
                        </td>
                        <th className="px-3 py-3 text-white text-nowrap hover:underline ">
                          <Link href={route("project.show", project.id)}>
                            {project.name}
                          </Link>
                        </th>
                        <td className="px-3 py-3 text-center">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-nowrap">
                          {project.created_at}
                        </td>
                        <td className="px-3 py-3 text-nowrap">
                          {project.due_date}
                        </td>
                        <td className="px-3 py-3">{project.createdBy.name}</td>
                        <td className="flex px-3 py-3 text-right">
                          <Link
                            href={route("project.edit", project.id)}
                            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteProject(project)}
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
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
