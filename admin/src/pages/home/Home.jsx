import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
//import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create(
  {
    baseURL: process.env.REACT_APP_API_URL,
  })

export default function Home() {
  const MONTHS = useMemo(
    () =>
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    []
  );

  const [userStats, setUserStats] = useState([]);


  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axiosInstance.get("/users/stats", {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTBmMTIxMzAzNjcyNjk5MjJhYWZkNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjE5MDYxNywiZXhwIjoxNjQyNjIyNjE3fQ.aE2oP4u4aHQ-R21OW9-SmfutGP05qdrhgeNFgmyAmvo"
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err)
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
