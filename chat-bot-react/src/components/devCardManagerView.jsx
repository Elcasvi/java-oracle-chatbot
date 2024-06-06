import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import EyeIcon from "./eyeIcon";
import "../styles/devCardManagerViewStyle.css";

const columnLabels = {
  name: "Name",
  role: "Role",
  tasks: "Tasks",
  actions: "Actions"
};

const renderCell = (user, columnKey) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <User
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
          <p className="text-bold text-sm capitalize text-default-400">Team</p>
        </div>
      );
    case "tasks":
      return (
        <span>
          Num Task: {user.tasks ? user.tasks.length : 0}
        </span>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <Link to={`/tasks/${user.id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </Link>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};

const columns = [
  { name: "Name", uid: "name" },
  { name: "Tasks", uid: "tasks" },
  { name: "Ver Task", uid: "actions" }
];

export default function DevCardManagerView({ users }) {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id} className="table-row">
                {(columnKey) => (
                  <TableCell data-label={columnLabels[columnKey]}>
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
