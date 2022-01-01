import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import key from "./key";
import SelectDropdown from "react-native-select-dropdown";

const API_KEY = key;
const CITY_LIST = {
  korea: "한국",
  seoul: "서울",
  busan: "부산",
  daegu: "대구",
  incheon: "인천",
  gwangju: "광주",
  daejeon: "대전",
  ulsan: "울산",
  sejong: "세종",
  gyeonggi: "경기",
  gangwon: "강원",
  chungbuk: "충북",
  chungnam: "충남",
  jeonbuk: "전북",
  jeonnam: "전남",
  gyeongbuk: "경북",
  gyeongnam: "경남",
  jeju: "제주",
};

const CITY_LIST2 = {
  한국: "korea",
  서울: "seoul",
  부산: "busan",
  대구: "daegu",
  인천: "incheon",
  광주: "gwangju",
  대전: "daejeon",
  울산: "ulsan",
  세종: "sejong",
  경기: "gyeonggi",
  강원: "gangwon",
  충북: "chungbuk",
  충남: "chungnam",
  전북: "jeonbuk",
  전남: "jeonnam",
  경북: "gyeongbuk",
  경남: "gyeongnam",
  제주: "jeju",
};

export default function App() {
  const [region, setRegion] = useState({});
  const [total, setTotal] = useState({});

  const [city, setCity] = useState([]);
  const [view, setView] = useState({});
  const [locate, setLocate] = useState("");
  const getData = async () => {
    const totalResponse = (
      await axios.get(`https://api.corona-19.kr/korea/?serviceKey=${API_KEY}`)
    ).data;
    // console.log("getData for total", totalResponse);
    const regionResponse = (
      await axios.get(
        `https://api.corona-19.kr/korea/country/new/?serviceKey=${API_KEY}`
      )
    ).data;
    console.log("getData for region", regionResponse);

    const newCity = Object.values(CITY_LIST);
    console.log(Object.values(CITY_LIST));

    setCity(newCity);
    setTotal(totalResponse);
    setRegion(regionResponse);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("view", view);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>코로나19 감염 현황</Text>
        <View style={styles.select}>
          <SelectDropdown
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            defaultButtonText="지역 선택"
            data={city}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setLocate(selectedItem);
              console.log(region[CITY_LIST2[selectedItem]]);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text>{locate}</Text>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignContent: "space-between",
    backgroundColor: "white",
  },
  headerText: { textAlign: "center", fontSize: 28, marginTop: 50 },
  select: {
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginTop: 20,
  },
  selectText: { fontSize: 22 },
  content: {
    flex: 8,
  },
  buttonStyle: {
    backgroundColor: "#dee1e3",
  },
  buttonTextStyle: { fontSize: 20 },
  footer: {
    flex: 1,
    backgroundColor: "red",
  },
});
