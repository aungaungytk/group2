import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import SearchComponent from "../search/search";
interface DataRow {
  id: number;
  brand: string;
  licence_no: string;
  capacity: number;
}

function CarReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [carData, setCarData] = useState<DataRow[]>([]);
  const [filterText, setFilterText] = useState("");

  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCarData().then((response: any) => {
      console.log(response.data);
      //   setIsUpdated(false);
      //   setT(response.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getCarData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/cars", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          setCarData(response.data.data);
          //   setTeamList(response.data);
          //   setUserData(response.data);
          //   console.log(response.data.data);
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const columns: TableColumn<DataRow>[] = useMemo(
    () => [
      {
        name: "Id",
        selector: (row: DataRow) => row.id,
      },
      {
        name: "Brand",
        selector: (row: DataRow) => row.brand,
      },
      {
        name: "Licence_No",
        selector: (row: DataRow) => row.licence_no,
      },
      {
        name: "Capacity",
        selector: (row: DataRow) => row.capacity,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filterText.trim() === "") {
      return carData;
    } else {
      return carData.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item.brand.toLowerCase().includes(searchText) ||
          item.licence_no.toLowerCase().includes(searchText) ||
          item.capacity.toString().toLowerCase().includes(searchText)
        );
      });
    }
  }, [carData, filterText]);

  const handleFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterText("");
  };
  // console.log();
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ margin: "15px", fontSize: "30px" }}>Car List Report</h1>
        <SearchComponent
          onFilter={handleFilterTextChange}
          onClear={handleClearFilter}
          filterText={filterText}
        />
      </div>

      <DataTable
        columns={columns}
        className={darkMode ? "darkTable" : ""}
        data={filteredData}
        theme="solarized"
        pagination
        customStyles={{
          table: {
            style: {
              backgroundColor: "#000",
            },
          },
        }}
      />
    </>
  );
}

export default CarReport;
