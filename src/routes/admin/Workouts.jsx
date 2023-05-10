import facade from "../../ApiFacade";
import { Fragment, useEffect, useState, useRef } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

export default function AdminWorkout() {
  const [input, setInput] = useState("");
  const [muscles, setMuscles] = useState("");
  const [image, setImage] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openArrow, setOpenArrow] = useState(false);
  const [workoutName, setWorkoutName] = useState({ name: "" });
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const cancelButtonRef = useRef(null);
  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState(exercises[0]);
  const [selectedWorkout, setSelectedWorkout] = useState(workouts[0]);
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);

  async function handleGeneratePhoto(muscles) {
    const imageUrl = await facade.generatePhoto(muscles);
    setImage(imageUrl);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    facade.getExercises().then((data) => setExercises(data));
  }, []);

  useEffect(() => {
    facade.fetchWorkouts().then((data) => setWorkouts(data));
  }, []);

  // function that adds an exercise to a workout
  function addExerciseToWorkout(workoutId, exerciseId) {
    facade.linkExerciseToWorkout(workoutId, exerciseId);
    console.log(workoutId, exerciseId);
  }

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
                    <tr key={workout.id}>
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
                    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
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
                                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Workout Name"
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => setOpenExerciseModal(true)}
                              className="mt-2 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Add exercises
                            </button>
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
                          onClick={onSubmit}
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

      {/* Add exercises modal */}
      <Transition.Root show={openExerciseModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenExerciseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900"></Dialog.Title>
                      <div className="mt-2">
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                  <span className="block truncate">{selected}</span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {workouts.map((workout) => (
                                      <Listbox.Option
                                        key={workout.id}
                                        className={({ active }) =>
                                          classNames(
                                            active ? "bg-indigo-600 text-white" : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-8 pr-4"
                                          )
                                        }
                                        value={workout.name}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}
                                              onChange={(e) => setSelectedWorkout(e.target.value)}
                                            >
                                              {workout.name}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active ? "text-white" : "text-indigo-600",
                                                  "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                                )}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                        <fieldset>
                          <legend className="text-base font-semibold leading-6 text-gray-900">Exercises</legend>
                          <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                            {exercises.map((exercise) => (
                              <div key={exercise.id} className="relative flex items-start py-4">
                                <div className="min-w-0 flex-1 text-sm leading-6">
                                  <label htmlFor={`exercise-${exercise.id}`} className="select-none font-medium text-gray-900">
                                    {exercise.name}
                                  </label>
                                </div>
                                <div className="ml-3 flex h-6 items-center">
                                  <input
                                    id={`exercise-${exercise.id}`}
                                    name={`exercise-${exercise.id}`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    onChange={(e) => {
                                      setSelectedExercise(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => addExerciseToWorkout(selectedExercise, selectedWorkout)}
                    >
                      Add to workout
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setOpenExerciseModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
}
