// react imports
import { useState, useEffect, useCallback } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports

import { useInsertHeirMutation } from "../slices/heirApiSlice";
import {
  useGetRelationshipQuery,
  useGetLookupDataQuery,
  useLazyGetLookupDataQuery,
  useGetPensionaryStatusQuery,
} from "../slices/sharedApiSlice.js";

// mui imports
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  CalendarTodayOutlined as CalenderIcon,
} from "@mui/icons-material";

// helpers
import { convertToPersianNumber, convertToEnglishNumber } from "../helper.js";

// libary imports
import { toast } from "react-toastify";
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function CreateHeirForm({ setShowCreateHeirModal }) {
  // DATE STATES
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);
  const [isBirthCalenderOpen, setIsBirthCalenderOpen] = useState(false);
  const [selectedBaseFinishDate, setSelectedBaseFinishDate] = useState(null);
  const [isBaseFinishDateCalenderOpen, setIsBaseFinishDateCalenderOpen] =
    useState(false);

  // HEIR STATE
  const [heirObject, setHeirObject] = useState({});

  const [insertHeir, { isLoading }] = useInsertHeirMutation();

  // LOOP UP STATES
  const [relationCombo, setRelationCombo] = useState([]);
  const [maritialStatusCombo, setMaritialStatusCombo] = useState([]);
  const [pensionaryStatusCombo, setPensionaryStatusCombo] = useState([]);
  const [bankCombo, setBankCombo] = useState([]);
  const [bankBranchCombo, setBankBranchCombo] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parentPersonID = searchParams.get("personID");

  // GET LOOK UP DATA
  const { data: relationComboItems, isSuccess: isRelationComboSuccess } =
    useGetRelationshipQuery();

  const { data: maritialStatusComboItems, isSuccess: isMaritialComboSuccess } =
    useGetLookupDataQuery({ lookUpType: "MaritialStatus" });

  const [getLookupData, { isLoading: isBankBranchComboLoading }] =
    useLazyGetLookupDataQuery();

  const {
    data: pensionaryStatusComboItems,
    isSuccess: isPensionaryStatusComboSuccess,
  } = useGetPensionaryStatusQuery({ pensionaryStatusCategory: "H" });

  const {
    data: bankComboItems,
    isSuccess: isBankComboSuccess,
    isLoading: isBankComboLoading,
  } = useGetLookupDataQuery({
    lookUpType: "Bank",
  });

  const fetchBankBranchData = useCallback(
    async (bankID) => {
      try {
        const bankBranchRes = await getLookupData({
          lookUpType: "BankBranch",
          lookUpParentID: convertToEnglishNumber(bankID),
        }).unwrap();
        setBankBranchCombo(bankBranchRes.itemList);
      } catch (err) {
        console.log(err);
      }
    },
    [getLookupData, setBankBranchCombo]
  );

  // FETCH LOOK UP DATA
  useEffect(() => {
    if (isRelationComboSuccess) {
      setRelationCombo(relationComboItems.itemList);
    }
  }, [isRelationComboSuccess, relationComboItems]);

  useEffect(() => {
    if (isMaritialComboSuccess) {
      setMaritialStatusCombo(maritialStatusComboItems.itemList);
    }
  }, [isMaritialComboSuccess, maritialStatusComboItems]);

  useEffect(() => {
    if (isPensionaryStatusComboSuccess) {
      setPensionaryStatusCombo(pensionaryStatusComboItems.itemList);
    }
  }, [isPensionaryStatusComboSuccess, pensionaryStatusComboItems]);

  useEffect(() => {
    if (isBankComboSuccess) {
      setBankCombo(bankComboItems.itemList);
    }
  }, [isBankComboSuccess, bankComboItems]);

  // GET BANK BRANCH ON USER BANK SELECT
  useEffect(() => {
    if (heirObject.bankID) {
      fetchBankBranchData(heirObject.bankID);
    }
  }, [heirObject.bankID, fetchBankBranchData]);

  // DATE HANDLERS
  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
    setIsBirthCalenderOpen(false);
  };

  const handleBaseFinishDateChange = (date) => {
    setSelectedBaseFinishDate(date);
    setIsBaseFinishDateCalenderOpen(false);
  };

  const handleBirthOpenChange = (open) => {
    setIsBirthCalenderOpen(open);
  };

  const handleBaseFinishDateOpenChange = (open) => {
    setIsBaseFinishDateCalenderOpen(open);
  };

  const handleHeirObjectChange = (e) => {
    const { name, value } = e.target;
    setHeirObject({
      ...heirObject,
      [name]: convertToPersianNumber(value),
    });
  };

  const handleInsertHeir = async () => {
    try {
      // Adjusting for timezone difference
      const personBirthDate = new Date(selectedBirthDate);
      personBirthDate.setMinutes(
        personBirthDate.getMinutes() - personBirthDate.getTimezoneOffset()
      );

      const pensionaryBaseFinishDate = new Date(selectedBaseFinishDate);
      pensionaryBaseFinishDate.setMinutes(
        pensionaryBaseFinishDate.getMinutes() -
          pensionaryBaseFinishDate.getTimezoneOffset()
      );

      const insertRes = await insertHeir({
        ...heirObject,
        parentPersonID,
        pensionaryStatusID: convertToEnglishNumber(
          heirObject.pensionaryStatusID
        ),
        personCertificatetNo: convertToEnglishNumber(
          heirObject.personCertificatetNo
        ),
        personNationalCode: convertToEnglishNumber(
          heirObject.personNationalCode
        ),
        relationshipWithParentID: convertToEnglishNumber(
          heirObject.relationshipWithParentID
        ),
        personRegion:
          parseInt(convertToEnglishNumber(heirObject.personRegion)) || null,
        personArea:
          parseInt(convertToEnglishNumber(heirObject.personArea)) || null,
        personBirthDate,
        pensionaryBaseFinishDate,
        accountNo: convertToEnglishNumber(heirObject?.accountNo),
        insuranceCoef:
          parseFloat(convertToEnglishNumber(heirObject?.insuranceCoef)) || 0,
        insuranceAmount:
          parseFloat(convertToEnglishNumber(heirObject?.insuranceAmount)) || 0,
        ledgerCode:
          parseInt(convertToEnglishNumber(heirObject.ledgerCode)) || 0,
      }).unwrap();
      setShowCreateHeirModal(false);
      toast.success(insertRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    console.log(heirObject);
  }, [heirObject]);

  const content = (
    <section className="formContainer formContainer--width-lg flex-col">
      <form method="POST" className="grid grid--col-3">
        <div className="inputBox__form">
          <select
            type="text"
            className="inputBox__form--input"
            required
            name="relationshipWithParentID"
            onChange={handleHeirObjectChange}
            id="relationshipWithParentID"
          >
            <option value=" ">انتخاب نسبت</option>
            {relationCombo.map((relation) => (
              <option
                key={relation.relationshipID}
                value={relation.relationshipID}
              >
                {relation.relationshipName}
              </option>
            ))}
          </select>
          <label
            className="inputBox__form--label"
            htmlFor="relationshipWithParentID"
          >
            <span>*</span> نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="personFirstName"
            value={heirObject?.personFirstName}
            onChange={handleHeirObjectChange}
            required
            id="personFirstName1"
          />
          <label className="inputBox__form--label" htmlFor="personFirstName1">
            <span>*</span> نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personLastName}
            onChange={handleHeirObjectChange}
            name="personLastName"
            required
            id="personLastName1"
          />
          <label className="inputBox__form--label" htmlFor="personLastName1">
            <span>*</span> نام خانوادگی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="personNationalCode"
            value={heirObject?.personNationalCode}
            onChange={handleHeirObjectChange}
            required
            id="personNationalCode2"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personNationalCode2"
          >
            <span>*</span> کد ملی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personCertificatetNo}
            onChange={handleHeirObjectChange}
            required
            name="personCertificatetNo"
            id="personCertificatetNo2"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personCertificatetNo2"
          >
            <span>*</span> شماره شناسنامه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personFatherName}
            onChange={handleHeirObjectChange}
            required
            name="personFatherName"
            id="personFatherName1"
          />
          <label className="inputBox__form--label" htmlFor="personFatherName1">
            نام پدر
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            value={selectedBirthDate}
            onChange={handleBirthDateChange}
            format={"jYYYY-jMM-jDD"}
            onOpenChange={handleBirthOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isBirthCalenderOpen}
            style={{
              border: "2px solid #cfcfcf",
              borderRadius: "6px",
              marginLeft: "0.5rem",
            }}
            wrapperStyle={{
              border: "none",
              cursor: "pointer",
            }}
          />
          <div className="inputBox__form--readOnly-label">تاریخ تولد</div>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personBirthPlace}
            onChange={handleHeirObjectChange}
            required
            name="personBirthPlace"
            id="personBirthPlace1"
          />
          <label className="inputBox__form--label" htmlFor="personBirthPlace1">
            محل تولد
          </label>
        </div>
        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            name="maritalStatusID"
            onChange={handleHeirObjectChange}
            required
            id="maritalStatusID1"
          >
            <option value=" ">انتخاب کنید</option>
            {maritialStatusCombo.map((maritalStatus) => (
              <option
                key={maritalStatus.lookUpID}
                value={maritalStatus.lookUpID}
              >
                {maritalStatus.lookUpName}
              </option>
            ))}
          </select>
          <label className="inputBox__form--label" htmlFor="maritalStatusID1">
            وضعیت تاهل
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            value={heirObject?.personPhone}
            onChange={handleHeirObjectChange}
            name="personPhone"
            id="personPhone11"
          />
          <label className="inputBox__form--label" htmlFor="personPhone11">
            تلفن ثابت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            name="personCellPhone"
            value={heirObject?.personCellPhone}
            onChange={handleHeirObjectChange}
            required
            id="personCellPhone222"
          />
          <label className="inputBox__form--label" htmlFor="personCellPhone222">
            تلفن همراه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personArea}
            onChange={handleHeirObjectChange}
            required
            name="personArea"
            id="personArea1"
          />
          <label className="inputBox__form--label" htmlFor="personArea1">
            ناحیه سکونت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personRegion}
            onChange={handleHeirObjectChange}
            required
            name="personRegion"
            id="personRegion1"
          />
          <label className="inputBox__form--label" htmlFor="personRegion1">
            منطقه سکونت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            value={heirObject?.personCountry}
            onChange={handleHeirObjectChange}
            name="personCountry"
            id="personCountry1"
          />
          <label className="inputBox__form--label" htmlFor="personCountry1">
            کشور
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            value={heirObject?.personState}
            onChange={handleHeirObjectChange}
            required
            name="personState"
            id="personState1"
          />
          <label className="inputBox__form--label" htmlFor="personState1">
            استان
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personCity"
            value={heirObject?.personCity}
            onChange={handleHeirObjectChange}
            id="personCity1"
          />
          <label className="inputBox__form--label" htmlFor="personCity1">
            شهر
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personPostalCode"
            value={heirObject?.personPostalCode}
            onChange={handleHeirObjectChange}
            id="personPostalCode1"
          />
          <label className="inputBox__form--label" htmlFor="personPostalCode1">
            کد پستی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            name="personSpecialDisease"
            value={heirObject?.personSpecialDisease}
            onChange={handleHeirObjectChange}
            id="personSpecialDisease1"
          />
          <label
            className="inputBox__form--label"
            htmlFor="personSpecialDisease1"
          >
            بیماری خاص
          </label>
        </div>
        <div className="inputBox__form col-span-3">
          <input
            type="text"
            className="inputBox__form--input"
            required
            value={heirObject?.personAddress}
            onChange={handleHeirObjectChange}
            name="personAddress"
            id="personAddress1"
          />
          <label className="inputBox__form--label" htmlFor="personAddress1">
            نشانی
          </label>
        </div>
        <div className="inputBox__form col-span-3 row-span-2">
          <textarea
            type="text"
            className="inputBox__form--input"
            required
            name="heirDesc"
            id="heirDesc"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="heirDesc">
            توضیحات
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary"> اطلاعات وظیفه بگیری </h4>
      </div>

      <form className="grid grid--col-4">
        <div className="inputBox__form">
          <select
            className="inputBox__form--input"
            onChange={handleHeirObjectChange}
            name="pensionaryStatusID"
            required
            id="pensionaryStatusID"
          >
            <option value=" ">انتخاب کنید</option>
            {pensionaryStatusCombo.map((status) => (
              <option
                key={status.pensionaryStatusID}
                value={status.pensionaryStatusID}
              >
                {status.pensionaryStatusName}
              </option>
            ))}
          </select>
          <label className="inputBox__form--label" htmlFor="pensionaryStatusID">
            <span>*</span> وضعیت موظف
          </label>
        </div>

        <div className="inputBox__form">
          <InputDatePicker
            value={selectedBaseFinishDate}
            onChange={handleBaseFinishDateChange}
            format={"jYYYY-jMM-jDD"}
            onOpenChange={handleBaseFinishDateOpenChange}
            suffixIcon={<CalenderIcon color="action" />}
            open={isBaseFinishDateCalenderOpen}
            style={{
              border: "2px solid #cfcfcf",
              borderRadius: "6px",
              marginLeft: "0.5rem",
            }}
            wrapperStyle={{
              border: "none",
              cursor: "pointer",
            }}
          />
          <div className="inputBox__form--readOnly-label">
            تاریخ مبنای قطع سهم
          </div>
        </div>
      </form>

      <div className="Modal__header u-margin-top-sm">
        <h4 className="title-secondary"> اطلاعات بانکی وظیفه بگیر </h4>
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <select
            disabled={isBankComboLoading}
            type="text"
            id="bankID"
            name="bankID"
            onChange={handleHeirObjectChange}
            value={convertToEnglishNumber(heirObject.bankID) || " "}
            className="inputBox__form--input"
          >
            <option value=" ">انتخاب</option>
            {bankCombo.map((bank) => (
              <option key={bank.lookUpID} value={bank.lookUpID}>
                {bank.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="bankID" className="inputBox__form--label">
            بانک
          </label>
        </div>

        <div className="inputBox__form">
          <select
            disabled={bankBranchCombo.length === 0 || isBankBranchComboLoading}
            type="text"
            id="bankBranchID"
            name="bankBranchID"
            value={heirObject.bankBranchID || ""}
            onChange={handleHeirObjectChange}
            className="inputBox__form--input"
            required
          >
            <option value=" ">انتخاب</option>
            {bankBranchCombo.map((bankBranch) => (
              <option key={bankBranch.lookUpID} value={bankBranch.lookUpID}>
                {bankBranch.lookUpName}
              </option>
            ))}
          </select>
          <label htmlFor="bankBranchID" className="inputBox__form--label">
            شعبه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            onChange={handleHeirObjectChange}
            value={heirObject?.accountNo || ""}
            name="accountNo"
            id="accountNoHeir"
          />
          <label className="inputBox__form--label" htmlFor="accountNoHeir">
            حساب
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleHeirObjectChange}
            value={heirObject?.ledgerCode || ""}
            required
            name="ledgerCode"
            id="ledgerCodeHeir"
          />
          <label className="inputBox__form--label" htmlFor="ledgerCodeHeir">
            ردیف ورثه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleHeirObjectChange}
            name="insuranceCoef"
            value={heirObject?.insuranceCoef || ""}
            required
            id="insuranceCoefHeir"
          />
          <label className="inputBox__form--label" htmlFor="insuranceCoefHeir">
            ضریب بیمه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            onChange={handleHeirObjectChange}
            value={heirObject?.insuranceAmount || ""}
            required
            name="insuranceAmount"
            id="insuranceAmountHeir"
          />
          <label
            className="inputBox__form--label"
            htmlFor="insuranceAmountHeir"
          >
            بیمه تبعی
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          onClick={handleInsertHeir}
          loading={isLoading}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>
    </section>
  );

  return content;
}

export default CreateHeirForm;