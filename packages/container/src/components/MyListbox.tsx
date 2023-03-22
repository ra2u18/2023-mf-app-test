import React, { useState, Fragment, useCallback } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

type DepartmentType = {
  id: number;
  name: string;
  contact: string;
};

const departments: DepartmentType[] = [
  { id: 1, name: 'Marketing', contact: 'Durward Reynolds' },
  { id: 2, name: 'HR', contact: 'Kenton Towne' },
  { id: 3, name: 'Sales', contact: 'Therese Wunsch' },
  { id: 4, name: 'Finance', contact: 'Benedict Kessler' },
  { id: 5, name: 'Customer service', contact: 'Katelyn Rohan' },
];

const compareDepartments = (depA: DepartmentType, depB: DepartmentType) => {
  return depA.name.toLowerCase() === depB.name.toLowerCase();
};

const MyListbox = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  return (
    <Listbox
      value={selectedDepartment}
      by={compareDepartments}
      onChange={setSelectedDepartment}
      name='asignee'
      horizontal
    >
      {/* <Listbox.Label>Assignee:</Listbox.Label> */}
      <Listbox.Button>{selectedDepartment.name}</Listbox.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Listbox.Options className='border-2 border-red-500 p-5'>
          {departments.map((department) => (
            <Listbox.Option key={department.id} value={department}>
              {department.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default MyListbox;
