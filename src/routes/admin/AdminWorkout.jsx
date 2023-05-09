import facade from "../../ApiFacade";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

export default function AdminWorkout() {
  const [input, setInput] = useState("");
  const [muscles, setMuscles] = useState("");
  const [image, setImage] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openArrow, setOpenArrow] = useState(false);
  const [workoutName, setWorkoutName] = useState({ name: "" });

  async function handleGeneratePhoto(muscles) {
    const imageUrl = await facade.generatePhoto(muscles);
    setImage(imageUrl);
  }

  useEffect(() => {
    facade.fetchWorkouts().then((data) => setWorkouts(data));
  }, []);

  function onChange(e) {
    setWorkoutName({ ...workoutName, [e.target.id]: e.target.value });
    console.log(workoutName);
  }

  function onSubmit(event) {
    event.preventDefault();
    facade.createWorkout(workoutName);
    setOpen(false);
    window.location.reload();
  }

  return (
    <Fragment>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">workout</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the workouts in the database.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpen(true)}
          >
            Add workout
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-gray-300 sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Add to workout</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {workouts.map((workout) => (
                    <tr key={workout.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{workout.name}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Delete workout<span className="sr-only">, {workout.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE NEW WORKOUT SLIDE-IN */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl" onSubmit={onSubmit}>
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                          <div className="flex items-center justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-white">New Workout</Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-indigo-300">Create a new workout!.</p>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div>
                              <label htmlFor="project-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Workout Name
                              </label>
                              <div className="mt-2">
                                <input
                                  required
                                  type="text"
                                  name="project-name"
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Workout Name"
                                  onChange={onChange}
                                />
                              </div>
                            </div>

                            <div className="pb-6 pt-4">
                              <div className="flex text-sm">
                                <a href="#" className="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900">
                                  <LinkIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900" aria-hidden="true" />
                                  <span className="ml-2">Copy link</span>
                                </a>
                              </div>
                              <div className="mt-4 flex text-sm">
                                <a href="#" className="group inline-flex items-center text-gray-500 hover:text-gray-900">
                                  <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                  <span className="ml-2">Learn more about sharing</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Create workout
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex flex-col gap-4 bg-gray-200 mt-10 w-1/2 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            onChange={(event) => setMuscles(event.target.value)}
            className="ring-1 ring-gray-300 ring-inset rounded text-sm px-2 py-1 w-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="Input muscle groups (seperated by comma)"
          />
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            onClick={() => handleGeneratePhoto(muscles)}
          >
            Generate
          </button>
        </div>
        {image != "" && <img src={image} alt={"something"} className="" />}
      </div>
    </Fragment>
  );
}
