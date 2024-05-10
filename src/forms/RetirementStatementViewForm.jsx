// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetRetirementStatementQuery } from "../slices/retirementStatementApiSlice";

// mui imports
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

function RetirementStatementViewForm({ RetirementStatementID }) {
  const {
    data: retirementStatement,
    isLoading,
    isSuccess,
    error,
  } = useGetRetirementStatementQuery({ RetirementStatementID });

  useEffect(() => {
    if (isSuccess) {
      console.log(retirementStatement);
    }
  }, [isSuccess, retirementStatement]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const checkBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #a0a0a0",
    borderRadius: "6px",
    columnGap: "10px",
    padding: "0px 15px",
  };

  const pStyle = {
    marginBottom: "0",
    color: "#b63f00",
    flex: 1,
  };

  const checkBoxLabelStyle = {
    color: "#707070",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "5px",
    flex: 1,
  };

  const firstGridStyle = {
    border: "2px solid #a0a0a0",
    borderRadius: "6px",
    padding: "10px",
  };

  const arrowsStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    paddingTop: "100px",
    columnGap: "5px",
  };

  const gridTitleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  };

  const gridItemsStyle = {
    backgroundColor: "#f8f8f8",
    border: "2px solid #a0a0a0",
    padding: "5px 10px",
  };

  return (
    <section className="formContainer formContainer--width-lg  flex-col">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="melli"
          />
          <label className="inputBox__form--label" htmlFor="melli">
            <span>*</span> کد ملی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personName"
          />
          <label className="inputBox__form--label" htmlFor="personName">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personFamily"
          />
          <label className="inputBox__form--label" htmlFor="personFamily">
            نام خانوادگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personSHSH"
          />
          <label className="inputBox__form--label" htmlFor="personSHSH">
            شماره شناسنامه
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personFather"
          />
          <label className="inputBox__form--label" htmlFor="personFather">
            نام پدر
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personGender"
          />
          <label className="inputBox__form--label" htmlFor="personGender">
            جنسیت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personBirth"
          />
          <label className="inputBox__form--label" htmlFor="personBirth">
            تاریخ تولد
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personPlaceBirth"
          />
          <label className="inputBox__form--label" htmlFor="personPlaceBirth">
            محل تولد
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personMarital"
          />
          <label className="inputBox__form--label" htmlFor="personMarital">
            وضعیت تاهل
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personRetiredNum"
          />
          <label className="inputBox__form--label" htmlFor="personRetiredNum">
            شماره بازنشستگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personDegree"
          />
          <label className="inputBox__form--label" htmlFor="personDegree">
            مدرک تحصیلی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personTreatCode"
          />
          <label className="inputBox__form--label" htmlFor="personTreatCode">
            کد درمانی
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personChildren"
          />
          <label className="inputBox__form--label" htmlFor="personChildren">
            تعداد فرزند
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personGroup"
          />
          <label className="inputBox__form--label" htmlFor="personGroup">
            گروه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personPostal"
          />
          <label className="inputBox__form--label" htmlFor="personPostal">
            کد پستی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="personRetiredDate"
          />
          <label className="inputBox__form--label" htmlFor="personRetiredDate">
            تاریخ بازنشستگی
          </label>
        </div>

        <div style={checkBoxStyle} className="col-span-4">
          <p style={pStyle}>وضعیت ایثارگری</p>

          <div style={itemStyle}>
            <input type="checkbox" id="khShahid" value="khShahid" />
            <label htmlFor="khShahid" style={checkBoxLabelStyle}>
              {" "}
              خانواده شهید
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="warrior" value="warrior" />
            <label htmlFor="warrior" style={checkBoxLabelStyle}>
              رزمنده
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="shahidChild" value="shahidChild" />
            <label htmlFor="shahidChild" style={checkBoxLabelStyle}>
              فرزند شهید
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="sacreficed" value="sacreficed" />
            <label htmlFor="sacreficed" style={checkBoxLabelStyle}>
              جانباز
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="warSacreficed" value="warSacreficed" />
            <label htmlFor="warSacreficed" style={checkBoxLabelStyle}>
              شهید
            </label>
          </div>

          <div style={itemStyle}>
            <input type="checkbox" id="free" value="free" />
            <label htmlFor="free" style={checkBoxLabelStyle}>
              آزاده
            </label>
          </div>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="jobTitle"
          />
          <label className="inputBox__form--label" htmlFor="jobTitle">
            عنوان شغل
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="martabeh"
          />
          <label className="inputBox__form--label" htmlFor="martabeh">
            مرتبه
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="maskanYaraneh"
          />
          <label className="inputBox__form--label" htmlFor="maskanYaraneh">
            یارانه حق مسکن
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="lastMilitary"
          />
          <label className="inputBox__form--label" htmlFor="lastMilitary">
            آخرین محل خدمت
          </label>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="lastPost"
          />
          <label className="inputBox__form--label" htmlFor="lastPost">
            آخرین پست سازمانی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="realSanatavat"
          />
          <label className="inputBox__form--label" htmlFor="realSanatavat">
            سنوات خدمت واقعی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="bonusSanatavat"
          />
          <label className="inputBox__form--label" htmlFor="bonusSanatavat">
            سنوات ارفاقی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="retiredSanatavat"
          />
          <label className="inputBox__form--label" htmlFor="retiredSanatavat">
            سنوات بازنشستگی
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-md">
        <h4 className="title-secondary">اطلاعات حکم بازنشستگی</h4>
      </div>

      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form col-span-2">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="statementType"
          />
          <label className="inputBox__form--label" htmlFor="statementType">
            <span>*</span> نوع حکم
          </label>
        </div>
        <div className="inputBox__form col-span-2">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="statementSerial"
          />
          <label className="inputBox__form--label" htmlFor="statementSerial">
            سریال حکم
          </label>
        </div>

        <div className="inputBox__form col-span-4">
          <textarea
            type="text"
            className="inputBox__form--input"
            required
            id="statementDesc"
          ></textarea>
          <label className="inputBox__form--label" htmlFor="statementDesc">
            توضیحات
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-md">
        <h4 className="title-secondary">اطلاعات پشتیبان</h4>
      </div>

      <form method="POSt" className="grid grid--col-4">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="backupName"
          />
          <label className="inputBox__form--label" htmlFor="backupName">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="backupFamily"
          />
          <label className="inputBox__form--label" htmlFor="backupFamily">
            نام خانوادگی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="backupRelation"
          />
          <label className="inputBox__form--label" htmlFor="backupRelation">
            نسبت
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="backupTell"
          />
          <label className="inputBox__form--label" htmlFor="backupTell">
            تلفن
          </label>
        </div>
      </form>
      <form method="POST" className="grid grid--col-7 u-margin-top-md">
        <div style={firstGridStyle} className="row-span-4 col-span-2">
          <p style={pStyle}>شرح حکم</p>
        </div>
        <div style={firstGridStyle} className="row-span-4 col-span-2">
          <p style={pStyle}>آیتم های حکم</p>
        </div>
        <div style={arrowsStyle}>
          <p style={pStyle}>&lt;&lt;</p>
          <p style={pStyle}>&gt;&gt;</p>
        </div>
        <div style={firstGridStyle} className="row-span-4 col-span-2">
          <p style={pStyle}>آیتم حکم</p>
        </div>
      </form>

      <form className="grid grid--col-3 u-margin-top-md">
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="runDate"
          />
          <label className="inputBox__form--label" htmlFor="runDate">
            <span>*</span> تاریخ اجرا
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="issueDate"
          />
          <label className="inputBox__form--label" htmlFor="issueDate">
            تاریخ صدور
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            className="inputBox__form--input"
            required
            id="statementNum"
          />
          <label className="inputBox__form--label" htmlFor="statementNum">
            شماره حکم
          </label>
        </div>
      </form>

      <div className="Modal__header u-margin-top-md">
        <h4 className="title-secondary">موظفین</h4>
      </div>

      <div style={gridTitleStyle}>
        <div style={gridItemsStyle}>ردیف</div>
        <div style={gridItemsStyle}>کد ملی</div>
        <div style={gridItemsStyle}>نام</div>
        <div style={gridItemsStyle}>نام خانوادگی</div>
        <div style={gridItemsStyle}>نام پدر</div>
        <div style={gridItemsStyle}>نسبت</div>
        <div style={gridItemsStyle}>تاریخ تولد</div>
        <div style={gridItemsStyle}>حقوق وظیفه</div>
        <div style={gridItemsStyle}>بازنشستگی تکمیلی</div>
        <div style={gridItemsStyle}>حق تاهل</div>
        <div style={gridItemsStyle}>حق اولاد</div>
      </div>

      <div style={{ marginRight: "auto" }}>
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          variant="contained"
          color="success"
          sx={{ fontFamily: "sahel" }}
        >
          <span>ذخیره</span>
        </LoadingButton>
      </div>
    </section>
  );
}

export default RetirementStatementViewForm;