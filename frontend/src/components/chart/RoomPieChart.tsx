import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/features/Hook";
import { Pie } from "react-chartjs-2";
import axios from "axios";

interface TeamData {
  name: string;
  reservation_count: number;
}

const RoomPieChart = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const authToken = authRedux.token;
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  useEffect(() => {
    getTeamData()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        setTeamData(response.data);
        console.log(response.data);
        console.log(authToken);
      })
      .catch((error) => {
        console.error(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTeamData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:8000/api/room_reserve_count_by_team`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          resolve(response.data);
          // console.log(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const chartData = {
    labels: teamData.map((data) => data.name),
    datasets: [
      {
        data: teamData.map((data) => data.reservation_count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF00",
          "#FF2800",
          "#CCA2E5",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF00",
          "#FF2800",
          "#CCA2E5",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Pie data={chartData} />
    </div>
  );
};

export default RoomPieChart;
