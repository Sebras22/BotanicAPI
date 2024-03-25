import { useEffect, useState } from "react";
import { LineChart } from "@mantine/charts";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

function App() {
    const [plants, setPlants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // la fonction qui va fetch les données
    const getBotanicInfo = async (url = "rates", setter) => {
        const response = await fetch(`https://api.coincap.io/v2/${url}`);

        const data = await response.json();
        console.log(data);

        setter(data.data);
    };

    const truc = [
        {
            date: "Mar 22",
            Apples: 2890,
            Oranges: 2338,
            Tomatoes: 2452,
        },
        {
            date: "Mar 23",
            Apples: 2756,
            Oranges: 2103,
            Tomatoes: 2402,
        },
        {
            date: "Mar 24",
            Apples: 3322,
            Oranges: 986,
            Tomatoes: 1821,
        },
        {
            date: "Mar 25",
            Apples: 3470,
            Oranges: 2108,
            Tomatoes: 2809,
        },
        {
            date: "Mar 26",
            Apples: 3129,
            Oranges: 1726,
            Tomatoes: 2290,
        },
    ];

    // un hook se met toujours dans le composant, jamais dans une fonction
    useEffect(() => {
        // quand le composant il se monte
        getBotanicInfo("rates", setPlants);
        return () => {
            // quand le composant il se démonte
        };
    }, []);

    const SortingValues = plants.sort((a, b) => {
        return parseFloat(a.rateUsd) - parseFloat(b.rateUsd);
    });

    return (
        <>
            <div>HA</div>
            {SortingValues.map((plant) => (
                <div key={plant.id}>
                    {plant.id} - {plant.rateUsd}
                </div>
            ))}
            <MantineProvider>
                <LineChart
                    h={300}
                    dataKey="date"
                    data={truc}
                    series={[
                        { name: "Apples", color: "indigo.6" },
                        { name: "Oranges", color: "blue.6" },
                        { name: "Tomatoes", color: "teal.6" },
                    ]}
                    curveType="bump"
                    gridAxis="xy"
                />
            </MantineProvider>
            <div></div>
        </>
    );
}

export default App;
