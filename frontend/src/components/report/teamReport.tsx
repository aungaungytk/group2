import {
    ChangeEvent,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";

  import DataTable, { TableColumn } from "react-data-table-component";
  import { DarkModeContext } from "../../context/darkModeContext";
  import axios from "axios";
  import { useAppSelector } from "../../redux/features/Hook";
  import SearchComponent from "../search/search";
  interface DataRow {
    id: number;
    name: string;
    team: {id:number; name:string};
  }
  
  function TeamReport(): JSX.Element {
    const { darkMode } = useContext(DarkModeContext);
    const [teamData, setTeamData] = useState<DataRow[]>([]);
    const [filterText, setFilterText] = useState("");
    const authRedux = useAppSelector((state) => state.auth);
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getTeamData().then((response: any) => {
        console.log(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getTeamData = () => {
      return new Promise((resolve, reject) => {
        axios
          .get("http://127.0.0.1:8000/api/users", {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          })
          .then((response) => {
            setTeamData(response.data.data);
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
            name: "Team_Name",
            selector: (row: DataRow) => row.team.name,
  
          },
        {
          name: "Member",
          selector: (row: DataRow) => row.name,
        },

      ],
      []
    );
  
    const filteredData = useMemo(() => {
      if (filterText.trim() === "") {
        return teamData;
      } else {
        return teamData.filter((item) => {
          const searchText = filterText.toLowerCase();
          return (
            item.name.toLowerCase().includes(searchText) ||
            item.team.name.toLowerCase().includes(searchText)
          );
        });
      }
    }, [teamData, filterText]);
  
    const handleFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFilterText(e.target.value);
    };
  
    const handleClearFilter = () => {
      setFilterText("");
    };
    return (
      <>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
              <h1 style={{ margin:"15px", fontSize:"30px" }}>Team List Report</h1>
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
  
  export default TeamReport;
  