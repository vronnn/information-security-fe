// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { User } from '@/pages/sandbox/table.page';
import { PaginatedApiResponse } from '@/types/api';

const UserData: User[] = [
  {
    name: 'John Doe',
    id: 'A01',
    salary: 60000,
    email: 'john.doe@example.com',
    role: 'developer',
  },
  {
    name: 'Jane Smith',
    id: 'A02',
    salary: 75000,
    email: 'jane.smith@emailprovider.com',
    role: 'manager',
  },
  {
    name: 'Alex Johnson',
    id: 'A03',
    salary: 55000,
    email: 'alex.johnson@examplemail.com',
    role: 'staff',
  },
  {
    name: 'Emily Brown',
    id: 'A04',
    salary: 65000,
    email: 'emily.brown@emailservice.net',
    role: 'developer',
  },
  {
    name: 'Michael Wilson',
    id: 'A05',
    salary: 80000,
    email: 'michael.wilson@example.org',
    role: 'manager',
  },
  {
    name: 'Sarah Davis',
    id: 'A06',
    salary: 50000,
    email: 'sarah.davis@emaildomain.com',
    role: 'staff',
  },
  {
    name: 'Kevin Lee',
    id: 'A07',
    salary: 62000,
    email: 'kevin.lee@examplemail.net',
    role: 'developer',
  },
  {
    name: 'Jessica Taylor',
    id: 'A08',
    salary: 72000,
    email: 'jessica.taylor@emailhost.org',
    role: 'manager',
  },
  {
    name: 'David Martinez',
    id: 'A09',
    salary: 53000,
    email: 'david.martinez@exampleemail.com',
    role: 'staff',
  },
  {
    name: 'Olivia Anderson',
    id: 'A10',
    salary: 68000,
    email: 'olivia.anderson@emailprovider.net',
    role: 'developer',
  },
  {
    name: 'James Nguyen',
    id: 'A11',
    salary: 60000,
    email: 'james.nguyen@example.org',
    role: 'manager',
  },
  {
    name: 'Sophia Hernandez',
    id: 'A12',
    salary: 55000,
    email: 'sophia.hernandez@examplemail.com',
    role: 'staff',
  },
  {
    name: 'William Patel',
    id: 'A13',
    salary: 70000,
    email: 'william.patel@emailservice.net',
    role: 'developer',
  },
  {
    name: 'Ava Rodriguez',
    id: 'A14',
    salary: 76000,
    email: 'ava.rodriguez@example.net',
    role: 'manager',
  },
  {
    name: 'Ethan Kim',
    id: 'A15',
    salary: 59000,
    email: 'ethan.kim@emaildomain.com',
    role: 'staff',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedApiResponse<User[]>>,
) {
  const { page, per_page, role } = req.query;

  // Calculate the starting index for pagination
  const startIndex = (Number(page) - 1) * Number(per_page);

  // Filter the role based on query
  const filteredData = role
    ? UserData.filter(({ role: filteredRole }) =>
        role.toString().split(',').includes(filteredRole),
      )
    : UserData;

  // Slice the user data based on pagination
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + Number(per_page),
  );

  const response = new Promise<void>((resolve) => {
    setTimeout(() => {
      res.status(200).json({
        code: 200,
        status: 'ok',
        data: paginatedData,
        meta: {
          page: Number(page),
          max_page: Math.ceil(filteredData.length / Number(per_page)),
          total_data: filteredData.length,
        },
      });
      resolve();
    }, 1000);
  });
  return response;
}
