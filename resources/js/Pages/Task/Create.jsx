import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Create({ auth, users, projects }) {
  const { data, setData, post, errors, processing, reset } = useForm({
    image: "",
    name: "",
    status: "",
    priority: "",
    description: "",
    due_date: "",
    assigned_user_id: "",
    project_id: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("task.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create new Task
          </h2>
        </div>
      }
    >
      <Head title="New Task" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="overflow-auto">
              <form
                onSubmit={onSubmit}
                className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
              >
                <div className="my-4">
                  <InputLabel htmlFor="project" value="Project" />
                  <SelectInput
                    id="project"
                    name="project_id"
                    value={data.project_id}
                    className="block w-full mt-1"
                    onChange={(e) => setData("project_id", e.target.value)}
                  >
                    <option value="">Select project</option>
                    {projects.data.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.project_id} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="task_image_path" value="Task Image" />
                  <TextInput
                    id="task_image_path"
                    type="file"
                    name="image"
                    className="block w-full mt-1"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="task_name" value="Task Name" />
                  <TextInput
                    id="task_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="block w-full mt-1"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor="task_description"
                    value="Task Description"
                  />
                  <TextAreaInput
                    id="task_description"
                    name="description"
                    value={data.description}
                    className="block w-full mt-1"
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="flex items-center justify-evenly">
                  <div className="mt-4">
                    <InputLabel htmlFor="task_status" value="Task Status" />
                    <SelectInput
                      id="task_status"
                      name="status"
                      value={data.status}
                      className="block w-full mt-1"
                      onChange={(e) => setData("status", e.target.value)}
                    >
                      <option value="">Select status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </SelectInput>
                    <InputError message={errors.status} className="mt-2" />
                  </div>
                  <div className="mt-4">
                    <InputLabel htmlFor="task_priority" value="Task Priority" />
                    <SelectInput
                      id="task_priority"
                      name="priority"
                      value={data.priority}
                      className="block w-full mt-1"
                      onChange={(e) => setData("priority", e.target.value)}
                    >
                      <option value="">Select priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </SelectInput>
                    <InputError message={errors.priority} className="mt-2" />
                  </div>
                  <div className="mt-4">
                    <InputLabel htmlFor="assigned_user" value="Assigned User" />
                    <SelectInput
                      id="assigned_user"
                      name="assigned_user_id"
                      value={data.assigned_user_id}
                      className="block w-full mt-1"
                      onChange={(e) =>
                        setData("assigned_user_id", e.target.value)
                      }
                    >
                      <option value="">Select user</option>
                      {users.data.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </SelectInput>
                    <InputError
                      message={errors.assigned_user_id}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                  <TextInput
                    id="task_due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    className="block w-full mt-1"
                    onChange={(e) => setData("due_date", e.target.value)}
                  />
                  <InputError message={errors.due_date} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4 text-right">
                  <Link
                    href={route("task.index")}
                    className="px-3 py-1 mr-2 text-sm text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                  >
                    Cancel
                  </Link>
                  <button className="px-3 py-1 text-sm text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600">
                    Add New
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
