// library imports
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  UserIcon,
  UserGroupIcon,
  CreditCardIcon,
  BuildingStorefrontIcon,
  AdjustmentsVerticalIcon,
  Bars3BottomRightIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

// redux imports
import { useDispatch } from "react-redux";
import { setGetGroupStatus } from "../slices/userReqSlice";

function SidebarNav() {
  const dispatch = useDispatch();

  const getGroupHandler = async () => {
    try {
      dispatch(setGetGroupStatus(true));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Sidebar rtl={true}>
      <Menu>
        <SubMenu
          label={
            <>
              <UserIcon width={20} color="#00863e" />
              &nbsp; &nbsp;
              <span>امور بازنشستان</span>
            </>
          }
        >
          <MenuItem> بازنشسته</MenuItem>
          <MenuItem> احکام گروهی </MenuItem>
          <MenuItem> رویت تعرفه کارمندی </MenuItem>
          <MenuItem> رویت احکام کارمندی </MenuItem>
          <MenuItem> گزارشات </MenuItem>
        </SubMenu>
        <MenuItem>
          <UserGroupIcon width={20} color="#00863e" />
          &nbsp; &nbsp; امورمشتریان
        </MenuItem>
        <MenuItem>
          <CreditCardIcon width={20} color="#00863e" />
          &nbsp; &nbsp; حقوق و دستمزد{" "}
        </MenuItem>
        <MenuItem>
          <BuildingStorefrontIcon width={20} color="#00863e" />
          &nbsp; &nbsp; اجتماعی و رفاهی
        </MenuItem>
        <MenuItem>
          <AdjustmentsVerticalIcon width={20} color="#00863e" />
          &nbsp; &nbsp; مدیریت سیستم{" "}
        </MenuItem>
        <MenuItem onClick={getGroupHandler}>
          <Bars3BottomRightIcon width={20} color="#00863e" />
          &nbsp; &nbsp; اطلاعات پایه{" "}
        </MenuItem>
        <MenuItem>
          <ClipboardDocumentListIcon width={20} color="#00863e" />
          &nbsp; &nbsp; گزارشات{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarNav;