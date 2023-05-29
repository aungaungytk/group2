import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { carReservationData } from "../../page/dashboard/admin-dashboard";
import axios from "axios";
import { useEffect } from "react";
interface Column {
  id:
    | "id"
    | "title"
    | "start_time"
    | "end_time"
    | "date"
    | "destination"
    | "no_of_traveller"
    | "car_id"
    | "user_id"
    | "status"
    | "remark"
    | "approved_by";

  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: string | number | boolean | Date) => JSX.Element | string; // Update the parameter type to include Date
}

const columns: readonly Column[] = [
  { id: "id", label: "ID" },
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "start_time",
    label: "Start time",
    align: "center",
  },
  {
    id: "end_time",
    label: "Ended_time",
    align: "center",
  },

  {
    id: "date",
    label: "Date",
    align: "center",
  },

  {
    id: "destination",
    label: "Destination",
    align: "center",
  },

  {
    id: "no_of_traveller",
    label: "No of passenger",
    align: "center",
  },

  {
    id: "car_id",
    label: "Car No",
    align: "center",
    minWidth: 100,
  },

  {
    id: "user_id",
    label: "User",
    align: "center",
  },

  {
    id: "status",
    label: "Status",
    align: "center",
  },

  {
    id: "remark",
    label: "Remark",
    minWidth: 170,
    align: "center",
  },
  {
    id: "approved_by",
    label: "Approved by",
    minWidth: 170,
    align: "center",
  },
];

interface Data {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
  destination: string;
  no_of_traveller: number;
  car_id: number;
  user_id: number;
  status: string;
  remark: string;
  approved_by: string;
}

function createData(
  id: number,
  title: string,
  start_time: string,
  end_time: string,
  date: string,
  destination: string,
  no_of_traveller: number,
  car_id: number,
  user_id: number,
  status: string,
  remark: string,
  approved_by: string
): Data {
  return {
    id,
    title,
    start_time,
    end_time,
    date,
    destination,
    no_of_traveller,
    car_id,
    user_id,
    status,
    remark,
    approved_by,
  };
}

const rows = [
  createData(
    1,
    "Client meeting",
    "10:00:00",
    "11:00:00",
    "2023-5-20",
    "Destination",
    3,
    1,
    1,
    "Success",
    "Remark",
    "Admin"
  ),
  createData(
    2,
    "Client meeting",
    "10:00:00",
    "11:00:00",
    "2023-5-20",
    "Destination",
    3,
    1,
    1,
    "Success",
    "Remark",
    "Admin"
  ),
];


export interface carData {
  id: number,
  brand: string,
  licence_no: string,
  capacity: number,
  image: string,
}

export interface userData {
  id: number;
  name: string;
  email: string;
  phone: string;
  employee_id: string;
}

interface AdminCarReserveTableProps {
  data: carReservationData[];
}

export default function AdminCarReserveTable(props: AdminCarReserveTableProps) {
  const [car, setCar] = React.useState<carData[]>([]);
  const [user, setUser] = React.useState<userData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getCar().then((response: any) => {
      setCar(response.data);
    })

    getUser().then((response: any) => {
      setUser(response.data);
    })
  }, []);

  const getCar = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/cars")
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getUser = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/users")
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows: Data[] = props.data.map((item) =>
    createData(
      item.id,
      item.title,
      item.start_time.toString(),
      item.end_time,
      item.date,
      item.destination,
      item.no_of_traveller,
      car.map((cr) => {
        if(item.car_id == cr.id){
          return cr.licence_no;
        }
      }),
      user.map((usr) => {
        if(item.user_id == usr.id){
          return usr.name;
        }
      }),
      item.status == 1 ? "Success" : "Pending",
      item.remark,
      item.approved_by
    )
  );
  console.log(rows);

  function createData(
    id: number,
    title: string,
    start_time: string,
    end_time: string,
    date: string,
    destination: string,
    no_of_traveller: number,
    car_id: any,
    user_id: any,
    status: string,
    remark: string,
    approved_by: string
  ): Data {
    return {
      id,
      title,
      start_time,
      end_time,
      date,
      destination,
      no_of_traveller,
      car_id,
      user_id,
      status,
      remark,
      approved_by,
    };
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "50px" }}>
      <TableContainer sx={{ maxHeight: 200 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ fontWeight: 600, fontSize: "35px" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof Data];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof column.format === "function"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
