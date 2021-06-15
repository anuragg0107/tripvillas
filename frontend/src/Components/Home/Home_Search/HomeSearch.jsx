import React, { useState } from "react";
import homeSearchStyles from "./HomeSearch.module.css";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import DateRangePicker from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchdata } from "../../../Redux/SearchDataHome/action";
import Loadingg from "../../Loading/Loadingg";
import { setPriceVariables } from "../../../Redux/Pricing_Final/action";
export const HomeSearch = () => {
  const [value, setValue] = useState([null, null]);
  const [guest, setGuest] = useState("");
  const [query2, setQuery2] = useState("");
  const [isLoading, setLoadng] = useState(false);
  const dispatch = useDispatch();

  const payload = {
    location: query2,
    checkinDate : value[0],
    checkOutDate : value[1],
    noOfGuest : guest,
  }

  const handleGuest = (event) => {
    setGuest(event.target.value);
    // const pricingAction = setPriceVariables(payload)
    // dispatch(pricingAction);

  };


  const handleChange = () => {
    console.log(query2, guest, value);
    console.log(payload);

    // const addTodoAction = searchdata(query2);
    // dispatch(addTodoAction);
    const pricingAction = setPriceVariables(payload)
    dispatch(pricingAction);
  };
  if (isLoading) return <Loadingg />;
  return (
    <>
      <div className={homeSearchStyles.mainDiv}>
        <img
          src="https://d2v8elt324ukrb.cloudfront.net/static/new_template/media/Pimal2-1.2d5d237dbd32.jpg"
          alt="backGround"
        />
        <div className={homeSearchStyles.textDiv}>
          <h1 style={{ fontWeight: "bold", color: "white" }}>
            Book <span style={{ textDecoration: "line-through" }}>Hotels</span>{" "}
            Vacation Rentals <br /> Top Holiday Homes - Villas, Apartments &
            Homestays
          </h1>
          <div className={homeSearchStyles.searchWidget}>
            <div className={homeSearchStyles.inp_location}>
              <span className={homeSearchStyles.searchIcon}>
                <SearchIcon />
              </span>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                onChange={(e) => setQuery2(e.target.value)}
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Check In"
                endText="Check Out"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField
                      {...startProps}
                      helperText=""
                      className={homeSearchStyles.chckk}
                      size="small"
                    />
                    <TextField
                      {...endProps}
                      helperText=""
                      className={homeSearchStyles.chckk}
                      size="small"
                    />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
            <div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel
                    size="small"
                    id="guest-select-label"
                    className={homeSearchStyles.guestInput}
                  >
                    Select Guests
                  </InputLabel>
                  <Select
                    labelId="guest-select-label"
                    id="guest-select"
                    autoWidth={true}
                    size="small"
                    sx={{ minWidth: "160px" }}
                    value={guest}
                    label="Select Guests"
                    onChange={handleGuest}
                  >
                    {new Array(50).fill(0).map((item, index) => {
                      return (
                        <MenuItem key={`${index}gsts`} value={index + 1}>
                          {index === 0
                            ? `${index + 1} guest`
                            : `${index + 1} guests`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <Link to="search">
              <button
                className={homeSearchStyles.searchBtn}
                onClick={handleChange}
              >
                SEARCH
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
