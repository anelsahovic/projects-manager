import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";

export default function Dashboard({
  auth,
  myPendingTasks,
  totalPendingTasks,
  totalInProgressTasks,
  myInProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12 mx-10">
        <div className="grid grid-cols-3 gap-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-center text-amber-500">
                Pending Tasks
              </h3>
              <div className="flex items-center justify-evenly">
                <p className="flex items-center justify-end space-x-2 ">
                  <span className="text-sm text-gray-500 uppercase">Total</span>
                  <span className="font-bold">{totalPendingTasks}</span>
                </p>
                |
                <p className="flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-500 uppercase ">My</span>
                  <span className="font-bold">{myPendingTasks}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-center text-blue-500">
                In progress Tasks
              </h3>
              <div className="flex items-center justify-evenly">
                <p className="flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-500 uppercase ">
                    Total
                  </span>{" "}
                  <span className="font-bold">{totalInProgressTasks}</span>
                </p>
                |
                <p className="flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-500 uppercase ">My</span>
                  <span className="font-bold">{myInProgressTasks}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-semibold text-center text-green-500">
                Completed Tasks
              </h3>
              <div className="flex items-center justify-evenly">
                <p className="flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-500 uppercase ">
                    Total
                  </span>{" "}
                  <span className="font-bold">{totalCompletedTasks}</span>
                </p>
                |
                <p className="flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-500 uppercase ">My</span>
                  <span className="font-bold">{myCompletedTasks}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <table className="w-full mt-3 text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-3 py-3">ID</th>
              <th className="px-3 py-3">Project Name</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {activeTasks.data.map((task) => (
              <tr key={task.id}>
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2 text-white hover:underline">
                  <Link href={route("project.show", task.project.id)}>
                    {task.project.name}
                  </Link>
                </td>
                <td className="px-3 py-2 text-white hover:underline">
                  <Link href={route("task.show", task.id)}>{task.name}</Link>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-nowrap text-white " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
