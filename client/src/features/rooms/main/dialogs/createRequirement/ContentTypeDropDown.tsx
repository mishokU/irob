import {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {contentTypes} from "./CreateRequirementFormPage";

export interface ContentTypeDropDownProps {
    type: any,
    setType: (value : any) => void
}

export function ContentTypeDropDown({type, setType}: ContentTypeDropDownProps) {
    return (<div className="lg:w-40 w-full">
            <Listbox value={type} onChange={setType}>
                <div className="mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg h-[45px] bg-transparent border-2 border-[#29303A] py-2 pl-3 pr-10
                    text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white
                    focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm z-20">
                        <span className="block truncate">{type.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg
                        ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {contentTypes.map((person, personIdx) => (<Listbox.Option
                                    key={personIdx}
                                    className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                                    value={person}
                                >
                                    {({selected}) => (<>
                      <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {person.name}
                      </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>) : null}
                                        </>)}
                                </Listbox.Option>))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>)
}