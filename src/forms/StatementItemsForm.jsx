// react imports
import { useState, useEffect, useCallback, useRef } from "react";

// redux imports
import { useGetRetirementStatementTypeQuery } from "../slices/sharedApiSlice.js";
import {
  useGetListOfRetirementStatementItemQuery,
  useLazyGetListOfFormulaGroupSettingQuery,
} from "../slices/retirementStatementApiSlice.js";

// mui imports
import { CalendarTodayOutlined as CalenderIcon } from "@mui/icons-material";
import { CircularProgress, Box } from "@mui/material";

// library imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// components
import GroupFormulaForm from "./GroupFormulaForm.jsx";

// utils
import { selectStyles, selectSettings } from "../utils/reactSelect";
import { datePickerStyles, datePickerWrapperStyles } from "../utils/datePicker";

function StatementItemsForm() {
  const inputRef = useRef(null);

  // MAIN STATES
  const [data, setData] = useState({});
  const [formulaGroups, setFormulaGroups] = useState(null);

  // LOOK UP STATES
  const [statementTypes, setStatementTypes] = useState([]);
  const [statementItems, setStatementItems] = useState([]);

  // DATE STATES
  const [selectedRunDate, setSelectedRunDate] = useState(null);
  const [isRunDateCalenderOpen, setIsRunDateCalenderOpen] = useState(false);

  const animatedComponents = makeAnimated();

  const [
    getFormulaGroups,
    {
      isLoading: getFormulaGroupsIsLoading,
      isFetching: getFormulaGroupsIsFetching,
    },
  ] = useLazyGetListOfFormulaGroupSettingQuery();

  // FETCH FORMULA GROUPS FUNCTION
  const fetchFormulaGroups = useCallback(
    async (retirementStatementItemID) => {
      try {
        const res = await getFormulaGroups({
          retirementStatementItemID,
        }).unwrap();
        setFormulaGroups(res);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    },
    [getFormulaGroups]
  );

  // GET LOOKUP DATA
  const {
    data: statementTypesComboItems,
    isSuccess: statementTypesIsSuccess,
    isFetching: statementTypesIsFetching,
    isLoading: statementTypesIsLoading,
    error: statementTypesError,
  } = useGetRetirementStatementTypeQuery({});

  const {
    data: formulaGroupSettingComboItems,
    isSuccess: formulaGroupSettingIsSuccess,
    isFetching: formulaGroupSettingIsFetching,
    isLoading: formulaGroupSettingIsLoading,
    error: formulaGroupSettingError,
  } = useGetListOfRetirementStatementItemQuery();

  // FETCH LOOK UP DATA
  useEffect(() => {
    if (statementTypesIsSuccess) {
      setStatementTypes(statementTypesComboItems.itemList);
    }
  }, [statementTypesIsSuccess, statementTypesComboItems]);

  useEffect(() => {
    if (formulaGroupSettingIsSuccess) {
      setStatementItems(formulaGroupSettingComboItems);
    }
  }, [formulaGroupSettingIsSuccess, formulaGroupSettingComboItems]);

  // FETCH FORMULA GROUPS ON USER SELECTED ITEM
  useEffect(() => {
    if (data.retirementStatementItemID) {
      fetchFormulaGroups(data.retirementStatementItemID.value);
    }
  }, [data.retirementStatementItemID, fetchFormulaGroups]);

  // HANLDE ERRORS
  useEffect(() => {
    if (statementTypesError) {
      console.log(statementTypesError);
    }
  }, [statementTypesError]);

  useEffect(() => {
    if (formulaGroupSettingError) {
      console.log(formulaGroupSettingError);
    }
  }, [formulaGroupSettingError]);

  // SELECT OPTIONS
  const statementTypeOptions = statementTypes.map((statementType) => ({
    value: statementType.retirementStatementTypeID,
    label: statementType.retirementStatementTypeName,
  }));

  const formulaGroupSettingOptions = statementItems
    // ONLY SHOW ACTIVE ITEMS
    .filter((item) => item.isActive)
    .map((item) => ({
      value: item.retirementStatementItemID,
      label: item.retirementStatementItemName,
    }));

  // DATE HANDLER
  const hadnleRunDateOpenChange = (open) => {
    setIsRunDateCalenderOpen(open);
  };

  const handleRunDateChange = (date) => {
    setSelectedRunDate(date);
    setIsRunDateCalenderOpen(false);
  };

  // DATA HANDLERS
  const handleStatementItemChange = (selectedOption, actionMeta) => {
    const name = actionMeta.name;
    const value = selectedOption;
    setData({ ...data, [name]: value });
  };

  // FUNCTION TO HANDLE OURSIDE CLICK
  const handleOutsideClick = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsRunDateCalenderOpen(false);
    }
  };

  // EVENT LISTENER FOR HANLDE OURSIDE CLICK
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const content = (
    <>
      <section className="flex-col formContainer">
        <form method="POST" className="grid grid--col-4" noValidate>
          <div className="inputBox__form">
            <InputDatePicker
              defaultValue={null}
              value={selectedRunDate}
              onChange={handleRunDateChange}
              onOpenChange={hadnleRunDateOpenChange}
              format={"jYYYY/jMM/jDD"}
              suffixIcon={<CalenderIcon color="action" />}
              open={isRunDateCalenderOpen}
              style={datePickerStyles}
              wrapperStyle={datePickerWrapperStyles}
              pickerProps={{
                ref: inputRef,
              }}
            />
            <div className="inputBox__form--readOnly-label">
              <span>*</span> تاریخ اجرا
            </div>
          </div>

          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={statementTypeOptions}
            isClearable={true}
            isLoading={statementTypesIsLoading || statementTypesIsFetching}
            placeholder={
              <div className="react-select-placeholder">نوع حکم</div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
          />

          <div className="inputBox__form col-span-2 row-span-2">
            <textarea
              type="text"
              className="inputBox__form--input"
              name="retirementStatementDesc"
              required
              id="retirementStatementDesc"
            ></textarea>
            <label
              className="inputBox__form--label"
              htmlFor="retirementStatementDesc"
            >
              شرح حکم
            </label>
          </div>

          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={formulaGroupSettingOptions}
            onChange={handleStatementItemChange}
            name="retirementStatementItemID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                تنظیمات آیتم های حکم
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={
              formulaGroupSettingIsFetching || formulaGroupSettingIsLoading
            }
          />
          <div>&nbsp;</div>
        </form>
      </section>

      {getFormulaGroupsIsFetching || getFormulaGroupsIsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : data.retirementStatementItemID && formulaGroups ? (
        <GroupFormulaForm
          formulaGroups={formulaGroups}
          retirementStatementItemID={data.retirementStatementItemID.value}
        />
      ) : null}
    </>
  );

  return content;
}

export default StatementItemsForm;
