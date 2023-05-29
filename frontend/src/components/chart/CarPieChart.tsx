import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/features/Hook";
import { Pie } from "react-chartjs-2";
import axios from "axios";

interface TeamData {
  name: string;
  car_reservation_count: number;
}

const CarPieChart = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const authToken = authRedux.token;
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  useEffect(() => {
    getTeamData()
      .then((response: any) => {
        setTeamData(response.data);
        console.log(response.data);
        console.log(authToken);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [authToken]);
  const getTeamData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:8000/api/car_reserve_count_by_team`, {
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
        data: teamData.map((data) => data.car_reservation_count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF00",
          "#FF28",
          "#CCA2E5",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF00",
          "#FF28",
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

export default CarPieChart;
