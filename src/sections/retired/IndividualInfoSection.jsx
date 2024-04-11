// react imports
import { useEffect, useState } from "react";

// component imports
import RetiredAdditionalInfo from "../../forms/RetiredAdditionalInfo";
import RetiredStaffInfoForm from "../../forms/RetiredStaffInfoForm";
import RetiredPersonalInfoForm from "../../forms/RetiredPersonalInfoForm";
import FolderTree from "../../components/FolderTree";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetRetiredQuery } from "../../slices/retiredApiSlice.js";

// mui imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  Save as SaveIcon,
  ArrowDropDown as ArrowDropDownIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  AdfScannerOutlined as AdfScannerOutlinedIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// library imports
import { toast } from "react-toastify";

function IndividualInfoSection() {
  const [personObject, setPersonObject] = useState({});
  const { token } = useSelector((state) => state.auth);
  const { selectedRequestData } = useSelector((state) => state.requestsData);

  const dispatch = useDispatch();

  const {
    data: retiredData,
    isSuccess,
    error,
    refetch,
  } = useGetRetiredQuery({ token, personId: selectedRequestData?.personId });

  useEffect(() => {
    refetch();
    if (isSuccess) {
      setPersonObject(retiredData?.itemList[0]);
    }
  }, [
    refetch,
    dispatch,
    isSuccess,
    retiredData,
    selectedRequestData?.personId,
  ]);

  useEffect(() => {
    console.log("personObject", personObject);
  }, [personObject]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const content = (
    <section className="pensionersAffairs">
      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات فردی بازنشسته
        </AccordionSummary>
        <AccordionDetails>
          <RetiredPersonalInfoForm
            personObject={personObject}
            setPersonObject={setPersonObject}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات پرسنلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredStaffInfoForm
            personObject={personObject}
            setPersonObject={setPersonObject}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          اطلاعات تکمیلی
        </AccordionSummary>
        <AccordionDetails>
          <RetiredAdditionalInfo personID={selectedRequestData?.personId} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          color: "#333533",
          backgroundColor: "#c0c0c0",
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          پرونده الکترونیک
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex-col">
            <div className="flex-row">
              <FolderTree />
              <img src="./images/sample-statement.png" />
            </div>
            <div style={{ marginRight: "auto" }} className="flex-row">
              <LoadingButton
                dir="ltr"
                endIcon={<DeleteOutlinedIcon />}
                variant="contained"
                color="error"
                sx={{ fontFamily: "sahel" }}
              >
                <span>حذف</span>
              </LoadingButton>
              <Button
                dir="ltr"
                endIcon={<AdfScannerOutlinedIcon />}
                variant="contained"
                color="primary"
                sx={{ fontFamily: "sahel" }}
              >
                <span>اسکن</span>
              </Button>
              <Button
                dir="ltr"
                endIcon={<AddIcon />}
                variant="contained"
                color="primary"
                sx={{ fontFamily: "sahel" }}
              >
                <span>اضافه</span>
              </Button>
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
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
  );

  return content;
}

export default IndividualInfoSection;