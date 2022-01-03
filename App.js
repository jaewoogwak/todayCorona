import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import key from "./key";
import SelectDropdown from "react-native-select-dropdown";
import Pie from "./pieChart";

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
  const [ok, setOk] = useState(false);
  const [region, setRegion] = useState({});
  const [total, setTotal] = useState({});
  const [city, setCity] = useState([]);

  const [locate, setLocate] = useState("");
  const [view, setView] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [cn, setCn] = useState("");
  const [tc, setTc] = useState(0);
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
    console.log("totalREs", totalResponse);
    // const v = newCity.map((value) => `-> ${value}`);
    // console.log("vvvvvvv", v);
    // setCity(v);
    console.log("total", totalResponse);
    setCity(newCity);
    setTotal(totalResponse);
    setRegion(regionResponse);
    const allCase = total.TotalCase;
    const cityCase = view.totalCase;
    console.log("all, city", allCase, cityCase);
    console.log(
      "percentage",
      ((parseInt(cityCase) / parseInt(allCase)) * 100).toFixed(2)
    );
    const newPercentage = (
      (parseInt(cityCase) / parseInt(allCase)) *
      100
    ).toFixed(2);
    setPercentage(newPercentage);

    // const newCn = await totalResponse.NowCase;
    // consaole.log("newCn", newCn);
    // const newPer = (totalResponse.city1p * 0.01).toFixed(1);
    // console.log("setPer", newPer);
    // setPercentage(newPer);
  };

  useEffect(() => {
    getData();
  }, [view, percentage]);

  console.log("view", view);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
              setView(region[CITY_LIST2[selectedItem]]);
              setOk(false);
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
        <View style={styles.updateView}>
          <Text style={styles.updateTime}>{total.updateTime}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.data}>
          <View style={styles.mainView}>
            <View style={styles.mv1}>
              <Text
                style={{
                  marginVertical: 5,
                  textAlign: "center",
                  fontSize: 22,
                  color: "white",
                }}
              >
                {" "}
                확진환자{" "}
              </Text>
              <Text style={({ ...styles.dataText }, styles.totalCase)}>
                {view.totalCase}
              </Text>
              <Text style={styles.newCase}>{view.newCase}🔺</Text>
            </View>
            <View style={styles.mv2}>
              <Text
                style={{
                  marginVertical: 5,
                  textAlign: "center",
                  fontSize: 22,
                  color: "white",
                }}
              >
                {" "}
                사망자{" "}
              </Text>
              <Text style={({ ...styles.dataText }, styles.totalDeath)}>
                {view.death}
              </Text>
            </View>
          </View>
          <Text
            style={{
              ...styles.dataText,
              marginVertical: 40,
              fontWeight: "600",
            }}
          >
            {`${new Date().getMonth() + 1}.${new Date().getDate()}`} 신규합계{" "}
            <Text style={{ color: "red", fontWeight: "800" }}>
              {view.newCase}
            </Text>
          </Text>
          <Text
            style={{
              ...styles.dataText,
              fontSize: 24,
              marginVertical: -40,
              fontWeight: "400",
            }}
          >
            완치자 수{" "}
            <Text style={{ color: "blue", fontWeight: "600" }}>
              {view.recovered}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.pie}>
        {console.log("Pie rendered", total.city1n)}
        <Pie countryName={view.countryName} percentage={percentage}></Pie>
      </View>

      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignContent: "space-between",
    backgroundColor: "#004170",
    paddingTop: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 50,
    color: "white",
  },
  updateView: { marginVertical: 5, marginBottom: 15 },
  updateTime: {
    textAlign: "center",
    fontWeight: "800",
    color: "white",
  },
  select: {
    alignItems: "center",
    // marginHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    backgroundColor: "#004170",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "white",
    borderBottomColor: "white",
    marginVertical: 0,
  },
  selectText: { fontSize: 22 },
  content: {
    flex: 5,
    marginTop: 30,
  },
  data: {},
  dataText: {
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  totalCase: { fontSize: 35, fontWeight: "700", color: "white" },
  totalDeath: { fontSize: 35, fontWeight: "700", color: "white" },
  newCase: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  nc1: { fontWeight: "500" },
  mainView: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#004170",
    paddingVertical: 10,
  },
  mv1: {
    backgroundColor: "white",
    marginHorizontal: 30,
    backgroundColor: "#004170",
  },
  mv2: {
    backgroundColor: "white",
    marginHorizontal: 45,
    backgroundColor: "#004170",
  },
  buttonStyle: {
    backgroundColor: "#004170",
    borderRadius: 40,
  },
  buttonTextStyle: { fontSize: 30, color: "white", fontWeight: "600" },
  pie: { flex: 4 },
  footer: {
    flex: 1,
    backgroundColor: "white",
  },
});
