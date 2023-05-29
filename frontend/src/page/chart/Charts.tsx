import RoomReservationChart from "../../components/chart/RoomBarChart";
import CarBarChart from "../../components/chart/CarBarChart";
import RoomPieChart from "../../components/chart/RoomPieChart";
import CarPieChart from "../../components/chart/CarPieChart";

const Charts = () => {
  return (
    <div className="charts">
      <div className="width-50 align-center">
        <RoomReservationChart />
      </div>
      <div className="width-50 align-center">
        <CarBarChart />
      </div>
      <div className="width-50 align-center mt">
        <RoomPieChart />
      </div>
      <div className="width-50 align-center mt">
        <CarPieChart />
      </div>
    </div>
  );
};

export default Charts;
