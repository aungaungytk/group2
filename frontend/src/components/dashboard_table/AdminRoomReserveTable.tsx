import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { roomReservationData } from "../../page/dashboard/admin-dashboard";
import { useEffect } from "react";
import axios from "axios";

interface Column {
  id:
    | "id"
    | "title"
    | "description"
    | "start_time"
    | "end_time"
    | "date"
    | "room_id"
    | "user_id";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: string | number | boolean | Date) => JSX.Element | string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID" },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 170, align: "center" },
  {
    id: "date",
    label: "Date",

  },
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
  { id: "room_id", label: "Room", align: "center" },
  { id: "user_id", label: "User", align: "center" },
];

interface Data {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  room_id: any;
  user_id: any;
}

interface AdminRoomReserveTableProps {
  data: roomReservationData[];
}

export interface roomData {
  id: number;
  name: string;
  capacity: number;
  amenities: string;
  image: string;
}

export interface userData {
  id: number;
  name: string;
  email: string;
  phone: string;
  employee_id: string;
}


export default function AdminRoomReserveTable(
  props: AdminRoomReserveTableProps
) {
  const [room, setRoom] = React.useState<roomData[]>([]);
  const [user, setUser] = React.useState<userData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getRoom().then((response: any) => {
      setRoom(response.data);
    })

    getUser().then((response: any) => {
      setUser(response.data);
    })
  }, []);

  const getRoom = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/rooms")
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
      item.description,
      item.date,
      item.start_time.toString(),
      item.end_time,
      room.map((rm) => {
        if(item.room_id == rm.id){
          return rm.name;
        }
      }),

      user.map((usr) => {
        if(item.user_id == usr.id){
          return usr.name;
        }
      }),

    )
  );
  console.log(user);

  function createData(
    id: number,
    title: string,
    description: string,
    date: string,
    start_time: string,
    end_time: string,
    room_id: any,
    user_id: any
  ): Data {
    return {
      id,
      title,
      description,
      date,
      start_time,
      end_time,
      room_id,
      user_id,
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
