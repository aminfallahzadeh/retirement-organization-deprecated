// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetRetirementStatementTypeQuery } from "../slices/sharedApiSlice.js";
import { useGetListOfRetirementStatementItemQuery } from "../slices/retirementStatementApiSlice.js";

// mui imports
import { CalendarTodayOutlined as CalenderIcon } from "@mui/icons-material";

// library imports
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// utils
import { selectStyles, selectSettings } from "../utils/reactSelect";

function StatementItemsForm() {
  // MAIN STATES
  const [data, setData] = useState({});

  // LOOK UP STATES
  const [statementTypes, setStatementTypes] = useState([]);
  const [statementItems, setStatementItems] = useState([]);

  // DATE STATES
  const [selectedRunDate, setSelectedRunDate] = useState(null);
  const [isRunDateCalenderOpen, setIsRunDateCalenderOpen] = useState(false);

  const animatedComponents = makeAnimated();

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

  const content = (
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
            style={{
              border: "none",
              cursor: "pointer",
            }}
            wrapperStyle={{
              border: "1px solid var(--color-input-border)",
              width: "100%",
              height: "100%",
              paddingLeft: "20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
          <div className="inputBox__form--readOnly-label">
            <span>*</span> تاریخ اجرا
          </div>
        </div>

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={statementTypeOptions}
          isLoading={statementTypesIsLoading || statementTypesIsFetching}
          placeholder={<div className="react-select-placeholder">نوع حکم</div>}
          noOptionsMessage={selectSettings.noOptionsMessage}
          loadingMessage={selectSettings.loadingMessage}
          styles={selectStyles}
        />

        <div className="inputBox__form col-span-2 row-span-4">
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
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={formulaGroupSettingOptions}
          onChange={handleStatementItemChange}
          name="retirementStatementItemID"
          placeholder={
            <div className="react-select-placeholder">تنظیمات آیتم های حکم</div>
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
  );

  return content;
}

export default StatementItemsForm;
