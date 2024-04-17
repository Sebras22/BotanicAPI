import { useEffect, useState } from "react";
import { LineChart } from "@mantine/charts";
import "./App.css";
import { List, MantineProvider, Card, Image, Text, Flex } from "@mantine/core";
import { AreaChart } from '@mantine/charts';
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

function App() {
    const [rates, setRates] = useState([]);
    const [assets, setAssets] = useState([]);
    const [num1History, setnum1History] = useState([]);
    const [num1Converted, setnum1Converted] = useState([]);
    const [num2History, setnum2History] = useState([]);
    const [num3History, setnum3History] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // la fonction qui va fetch les données
    const getMoneyInfo = async (url = "rates", setter) => {
        const response = await fetch(`https://api.coincap.io/v2/${url}`);

        const data = await response.json();
        console.log(data);

        setter(data.data);
    };

    const getMoneyHistoryInfo = async (url = "bitcoin", setter) => {
        const response = await fetch(`api.coincap.io/v2/assets/${url}/history?interval=d1`);

        const data = await response.json();
        console.log(data);

        setter(data.data);
    };

    const unixToDate = (time) => {
        const date = new Date(time*1000);
        return date.toLocaleString()
    }

    // un hook se met toujours dans le composant, jamais dans une fonction
    useEffect(() => {
        // quand le composant il se monte
        getMoneyInfo("rates", setRates);
        getMoneyInfo("assets", setAssets);

        getMoneyHistoryInfo("bitcoin", setnum1History);

        return () => {
            // quand le composant il se démonte
        };
    }, []);

    useEffect(() => {
        if (num1History?.length > 0) {
            const convertedTime = num1History.map(el => ({
                ...el,
                time: unixToDate(el.time * 1000),
                priceUsd: parseFloat(el.priceUsd)
            }));
            setnum1Converted(convertedTime);
        }
    }, [num1History])

    // const SortingValues = rates.sort((a, b) => {
    //     return parseFloat(a.rateUsd) - parseFloat(b.rateUsd);
    // });

    return (
        <>
            
            
            <MantineProvider>
                {/* {SortingValues.map((plant) => (
                    <List key={plant.id}>
                        <List.Item>{plant.id} - {plant.rateUsd}</List.Item>
                    </List>
                ))} */}
                <AreaChart
                    height={300}
                    data={setnum1Converted}
                    dataKey="time"
                    series={[
                        { name: 'Price USD', color: 'blue' }
                    ]}
                    curveType="linear"
                />
                <Flex
                mih={50}
                bg="rgba(0, 0, 0, .3)"
                gap="lg"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
                >
                {assets && assets.map((el, key) => (
                    
                    <Card
                    shadow="sm"
                    padding="xl"
                    component="a"
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    key={key}
                    w={{ base: 200, sm: 400, lg: 300 }}
                    >
                        
                        <Card.Section>
                        {el.symbol}
                        </Card.Section>
                
                        <Text fw={500} size="lg" mt="md">
                         {el.rank}. {el.name} 
                        </Text>
                
                        <Text mt="xs" c="dimmed" size="sm">
                        {el.priceUsd}
                        </Text>
                    </Card>
                ))}
                </Flex>
            </MantineProvider>
            
        </>
    );
}

export default App;
