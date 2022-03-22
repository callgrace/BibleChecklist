import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import OTNT from "./components/data/BibleBooks.json";
import moment from "moment";
import DrawerNavigator from "./navigation/DrawerNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = React.createContext();

class AppContextProvider extends React.Component {
  state = {
    OT: [], //name, chapters, percentage, checkedChapters, current
    NT: [],
    totalPercentage: 0,
    isOT: true,
    // start date
    dateString: moment(new Date()).format("MMMM D, YYYY"),
    date: new Date(),
    show: false,
    initial: true,
    // end date
    endDateDateString: moment(new Date()).format("MMMM D, YYYY"),
    endDateDate: new Date(),
    endDateShow: false,
    endDateInitial: true,
    //
    averageChapters: 0,
    appDate: new Date(),
    todayCount: 0,
    isDarkTheme: false,
    isColors: false,
    themeColor: "#94C757", // "#8BC34A" default green
    colors: [
      "#EB77A0", // pink
      "#F49C3A", // orange
      "#fdd835", // yellow
      "#94C757", // green
      "#5CBEDA", // blue
      "#6679C2", // indigo
      "#AC70C2", // purple
      "#909090", // gray
    ],
  };

  constructor(props) {
    super(props);
    this.getData();
    // this.removeData();
  }

  componentDidMount() {
    const OldTestament = OTNT[0];
    const NewTestament = OTNT[1];
    const BooksToSwitch = [OldTestament.OT, NewTestament.NT];
    BooksToSwitch.forEach(function (bookToSwitch) {
      bookToSwitch.forEach(function (book) {
        book.percentage = 0;
        book.checkedChapters = [];
        book.current = false;
      });
    });
    var end = new Date();
    this.setState({
      OT: OldTestament.OT,
      NT: NewTestament.NT,
    });
  }

  toggleDarkTheme = async () => {
    try {
      await this.setState({ isDarkTheme: !this.state.isDarkTheme });
      await AsyncStorage.setItem(
        "isDarkTheme",
        JSON.stringify(this.state.isDarkTheme)
      );
    } catch (err) {
      console.log(err);
    }
  };

  setThemeColor = async (color) => {
    this.setState({ themeColor: color });
    await AsyncStorage.setItem("themeColor", JSON.stringify(color));
  };

  setIsColors = () => {
    this.setState({ isColors: !this.state.isColors });
  };

  setCurrentBook = (bookName) => {
    const BooksToSwitch = [this.state.OT, this.state.NT];
    BooksToSwitch.forEach(function (bookToSwitch) {
      bookToSwitch.forEach(function (book) {
        if (book.name === bookName) {
          book.current = true;
        } else {
          book.current = false;
        }
      });
    });
    this.setState({
      OT: this.state.OT,
      NT: this.state.NT,
    });
  };

  setCheckedChapters = async (chapter) => {
    let count = this.state.todayCount;
    const BooksToSwitch = [this.state.OT, this.state.NT];
    BooksToSwitch.forEach(function (bookToSwitch) {
      bookToSwitch.forEach(function (book) {
        if (book.current === true) {
          // toggle chapter
          if (book.checkedChapters.indexOf(chapter) > -1) {
            book.checkedChapters.splice(
              book.checkedChapters.indexOf(chapter),
              1
            );
            count = count - 1;
          } else {
            book.checkedChapters.push(chapter);
            count = count + 1;
          }
        } else {
          book.percentage = book.percentage;
          book.checkedChapters = book.checkedChapters;
        }
        book.percentage = (book.checkedChapters.length / book.chapters) * 100;
      });
    });
    try {
      await this.setState({
        OT: this.state.OT,
        NT: this.state.NT,
        totalPercentage: this.totalPercentage(),
        todayCount: count,
      });
      await AsyncStorage.setItem("ot", JSON.stringify(this.state.OT));
      await AsyncStorage.setItem("nt", JSON.stringify(this.state.NT));
      await AsyncStorage.setItem(
        "percentage",
        JSON.stringify(this.state.totalPercentage)
      );
      await AsyncStorage.setItem(
        "todayCount",
        JSON.stringify(this.state.todayCount)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // calculate percentage with chapter update
  setToggleCheckAll = async () => {
    let count = this.state.todayCount;
    const BooksToSwitch = [this.state.OT, this.state.NT];
    BooksToSwitch.forEach(function (bookToSwitch) {
      bookToSwitch.forEach(function (book) {
        if (book.current === true) {
          // uncheck all
          if (book.checkedChapters.length === book.chapters) {
            count = count - book.checkedChapters.length;
            book.checkedChapters = [];
          } else {
            // check all
            count = count - book.checkedChapters.length;
            count = count + book.chapters;
            //clear all before check all
            book.checkedChapters = [];
            book.checkedChapters.push(...Array(book.chapters).keys());
          }
          book.percentage = (book.checkedChapters.length / book.chapters) * 100;
        }
      });
    });
    try {
      await this.setState({
        OT: this.state.OT,
        NT: this.state.NT,
        totalPercentage: this.totalPercentage(),
        todayCount: count,
      });
      await AsyncStorage.setItem("ot", JSON.stringify(this.state.OT));
      await AsyncStorage.setItem("nt", JSON.stringify(this.state.NT));
      await AsyncStorage.setItem(
        "percentage",
        JSON.stringify(this.state.totalPercentage)
      );
      await AsyncStorage.setItem(
        "todayCount",
        JSON.stringify(this.state.todayCount)
      );
    } catch (err) {
      console.log(err);
    }
  };

  totalPercentage = () => {
    let totalCheckedChapters = 0;
    const BooksToSwitch = [this.state.OT, this.state.NT];
    BooksToSwitch.forEach(function (bookToSwitch) {
      bookToSwitch.forEach(function (book) {
        totalCheckedChapters =
          totalCheckedChapters + book.checkedChapters.length;
      });
    });
    return Math.round((totalCheckedChapters / 1189) * 100);
  };

  // OT and NT
  OTNTPercentage = (books, pages) => {
    let checkedChapters = 0;
    books.forEach(function (book) {
      checkedChapters = checkedChapters + book.checkedChapters.length;
    });
    return Math.round((checkedChapters / pages) * 100);
  };

  OTNTCheckedChapters = (books) => {
    let checkedChapters = 0;
    books.forEach(function (book) {
      checkedChapters = checkedChapters + book.checkedChapters.length;
    });
    return checkedChapters;
  };

  setOTButton = async () => {
    try {
      await this.setState({ isOT: true });
      await AsyncStorage.setItem("isOT", JSON.stringify(this.state.isOT));
    } catch (err) {
      console.log(err);
    }
  };

  setNTButton = async () => {
    try {
      await this.setState({ isOT: false });
      await AsyncStorage.setItem("isOT", JSON.stringify(this.state.isOT));
    } catch (err) {
      console.log(err);
    }
  };

  // start date
  setShow = async () => {
    try {
      await this.setState({ show: true, initial: false });
      await AsyncStorage.setItem("show", JSON.stringify(this.state.show));
      await AsyncStorage.setItem("initial", JSON.stringify(this.state.initial));
    } catch (err) {
      console.log(err);
    }
  };

  setChange = async (d) => {
    try {
      await this.setState({
        date: d,
        dateString: moment(d).format("MMMM D, YYYY"),
      });
      await AsyncStorage.setItem("date", JSON.stringify(d));
      await AsyncStorage.setItem(
        "dateString",
        JSON.stringify(this.state.dateString)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // setClose calulate average chapters
  setClose = async () => {
    try {
      await this.setState({
        show: false,
        initial: false,
        averageChapters: this.averageChapters(),
      });
      await AsyncStorage.setItem("show", JSON.stringify(this.state.show));
      await AsyncStorage.setItem("initial", JSON.stringify(this.state.initial));
      await AsyncStorage.setItem(
        "averageChapters",
        JSON.stringify(this.state.averageChapters)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // end date
  setEndDateShow = async () => {
    try {
      await this.setState({ endDateShow: true, endDateInitial: false });
      await AsyncStorage.setItem(
        "endDateShow",
        JSON.stringify(this.state.endDateShow)
      );
      await AsyncStorage.setItem(
        "endDateInitial",
        JSON.stringify(this.state.endDateInitial)
      );
    } catch (err) {
      console.log(err);
    }
  };

  setEndDateChange = async (d) => {
    try {
      await this.setState({
        endDateDate: d,
        endDateDateString: moment(d).format("MMMM D, YYYY"),
      });
      await AsyncStorage.setItem("endDateDate", JSON.stringify(d));
      await AsyncStorage.setItem(
        "endDateDateString",
        JSON.stringify(this.state.endDateDateString)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // setClose calulate average chapters
  setEndDateClose = async () => {
    try {
      await this.setState({
        endDateShow: false,
        endDateInitial: false,
        averageChapters: this.averageChapters(),
      });
      await AsyncStorage.setItem(
        "endDateShow",
        JSON.stringify(this.state.endDateShow)
      );
      await AsyncStorage.setItem(
        "endDateInitial",
        JSON.stringify(this.state.endDateInitial)
      );
      await AsyncStorage.setItem(
        "averageChapters",
        JSON.stringify(this.state.averageChapters)
      );
    } catch (err) {
      console.log(err);
    }
  };

  //average chapters per day, end date has to be later than the start date, both start date and end date have to be set
  averageChapters = () => {
    if (
      this.state.date.getTime() > this.state.endDateDate.getTime() ||
      this.state.date.getTime() === this.state.endDateDate.getTime()
    ) {
      return 0;
      // calculate
    } else if (this.state.date.getTime() < this.state.endDateDate.getTime()) {
      var differenceInTime =
        this.state.endDateDate.getTime() - this.state.date.getTime();
      var averagePerDay =
        1198 / Math.floor(differenceInTime / (1000 * 3600 * 24));

      return averagePerDay.toFixed(1);
    }
  };

  // removeData = async (useName) => {
  //   try {
  //     await AsyncStorage.removeItem("date");
  //     await AsyncStorage.removeItem("endDateDate");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  getData = async () => {
    const themeColorValue = await AsyncStorage.getItem("themeColor");
    const themeColorValueJason = JSON.parse(themeColorValue);
    const isDarkThemeValue = await AsyncStorage.getItem("isDarkTheme");
    const isDarkThemeValueJason = JSON.parse(isDarkThemeValue);
    const otValue = await AsyncStorage.getItem("ot");
    const otValueJason = JSON.parse(otValue);
    const ntValue = await AsyncStorage.getItem("nt");
    const ntValueJason = JSON.parse(ntValue);
    const percentageValue = await AsyncStorage.getItem("percentage");
    const percentageValueJason = JSON.parse(percentageValue);
    const todayCountValue = await AsyncStorage.getItem("todayCount");
    const todayCountValueJason = JSON.parse(todayCountValue);
    const isOTValue = await AsyncStorage.getItem("isOT");
    const isOTValueJason = JSON.parse(isOTValue);
    // start date
    const showValue = await AsyncStorage.getItem("show");
    const showValueJason = JSON.parse(showValue);
    const dateValue = await AsyncStorage.getItem("date");
    const dateValueJason = JSON.parse(dateValue);
    const dateStringValue = await AsyncStorage.getItem("dateString");
    const dateStringValueJason = JSON.parse(dateStringValue);
    const initialValue = await AsyncStorage.getItem("initial");
    const initialValueJason = JSON.parse(initialValue);
    // end date
    const endDateShowValue = await AsyncStorage.getItem("endDateShow");
    const endDateShowValueJason = JSON.parse(endDateShowValue);
    const endDateDateValue = await AsyncStorage.getItem("endDateDate");
    const endDateDateValueJason = JSON.parse(endDateDateValue);
    const endDateDateStringValue = await AsyncStorage.getItem(
      "endDateDateString"
    );
    const endDateDateStringValueJason = JSON.parse(endDateDateStringValue);
    const endDateInitialValue = await AsyncStorage.getItem("endDateInitial");
    const endDateInitialValueJason = JSON.parse(endDateInitialValue);
    //
    const averageChaptersValue = await AsyncStorage.getItem("averageChapters");
    const averageChaptersValueJason = JSON.parse(averageChaptersValue);

    if (themeColorValueJason !== null) {
      this.setState({ themeColor: themeColorValueJason });
    }
    if (isDarkThemeValueJason !== null) {
      this.setState({ isDarkTheme: isDarkThemeValueJason });
    }
    if (otValueJason !== null) {
      this.setState({ OT: otValueJason });
    }
    if (ntValueJason !== null) {
      this.setState({ NT: ntValueJason });
    }
    if (percentageValueJason !== null) {
      this.setState({ totalPercentage: percentageValueJason });
    }
    if (todayCountValueJason !== null) {
      this.setState({ todayCount: todayCountValueJason });
    }
    if (isOTValueJason !== null) {
      this.setState({ isOT: isOTValueJason });
    }
    // start date
    if (showValueJason !== null) {
      this.setState({ show: showValueJason });
    }
    if (dateValueJason !== null) {
      this.setState({ date: new Date(dateValueJason) });
    }
    if (dateStringValueJason !== null) {
      this.setState({ dateString: dateStringValueJason });
    }
    if (initialValueJason !== null) {
      this.setState({ initial: initialValueJason });
    }
    // end date
    if (endDateShowValueJason !== null) {
      this.setState({ endDateShow: endDateShowValueJason });
    }
    if (endDateDateValueJason !== null) {
      this.setState({ endDateDate: new Date(endDateDateValueJason) });
    }
    if (endDateDateStringValueJason !== null) {
      this.setState({ endDateDateString: endDateDateStringValueJason });
    }
    if (endDateInitialValueJason !== null) {
      this.setState({ endDateInitial: endDateInitialValueJason });
    }
    if (averageChaptersValueJason !== null) {
      this.setState({ averageChapters: averageChaptersValueJason });
    }
  };

  render() {
    console.log();
    // const { actions } = this.context;
    return (
      <AppContext.Provider
        value={{
          OT: this.state.OT, //name, chapters, percentage, checkedChapters, current
          NT: this.state.NT,
          totalPercentage: this.state.totalPercentage,
          isOT: this.state.isOT,
          // start date
          dateString: this.state.dateString,
          date: this.state.date,
          show: this.state.show,
          initial: this.state.initial,
          onShow: this.setShow,
          onChange: this.setChange,
          onClose: this.setClose,
          // end date
          endDateDateString: this.state.endDateDateString,
          endDateDate: this.state.endDateDate,
          endDateShow: this.state.endDateShow,
          endDateInitial: this.state.endDateInitial,
          onEndDateShow: this.setEndDateShow,
          onEndDateChange: this.setEndDateChange,
          onEndDateClose: this.setEndDateClose,
          //
          startDate: this.state.startDate, // user set date
          endDate: this.state.endDate, // user set date
          appDate: this.state.appDate,
          todayCount: this.state.todayCount,
          isDarkTheme: this.state.isDarkTheme,
          isColors: this.state.isColors,
          themeColor: this.state.themeColor, // default green
          colors: this.state.colors,
          books: this.state.isOT ? this.state.OT : this.state.NT,
          onBookPress: this.setCurrentBook,
          onChapterUpdate: this.setCheckedChapters,
          onBookChaptersHeaderPress: this.setCurrentBook,
          onToggleCheckAll: this.setToggleCheckAll,
          onOTPress: this.setOTButton,
          onNTPress: this.setNTButton,
          OTPercentage: this.OTNTPercentage(this.state.OT, 929),
          NTPercentage: this.OTNTPercentage(this.state.NT, 260),
          OTCheckedChapters: this.OTNTCheckedChapters(this.state.OT),
          NTCheckedChapters: this.OTNTCheckedChapters(this.state.NT),
          averageChapters: this.state.averageChapters,
          onValueChange: this.toggleDarkTheme,
          onColorPress: this.setIsColors,
          onColorsPress: this.setIsColors,
          onThemeColorPress: this.setThemeColor,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

class App extends React.Component {
  render() {
    return <DrawerNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {},
  light: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
});

// export default App;
export default () => (
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
