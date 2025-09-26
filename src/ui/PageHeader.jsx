import styled from "styled-components";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { useSidebar } from "../contexts/SidebarContext";
import { usePageTitle as usePageTitleContext } from "../contexts/PageTitleContext";
import { useAuth } from "../contexts/AuthContext";
import { FullscreenIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const StyledPageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.5rem;
  background: linear-gradient(to right, var(--color-brand-900), #044a04ad);
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  min-height: 4rem;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  color: white;
  background-color: transparent;
  position: relative;
  &:hover {
    color: var(--color-dark);
    background-color: transparent;
    border: none;
    outline: none;
  }
  &:active {
    color: var(--color-dark);
    background-color: transparent;
    border: none;
    outline: none;
  }
  &:focus {
    color: var(--color-dark);
    background-color: transparent;
    border: none;
    outline: none;
  }
`;
const ToggleButton = styled.button`
  width: 3rem;
  height: 3rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  border: none;
  outline: none;
  &:hover {
    background: var(--color-dark);

    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
    background: var(--color-dark);
  }
  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;
const FullscreenButton = styled.button`
  width: 3rem;
  height: 3rem;
  color: white;
  display: flex;
  align-items: center;
  background: transparent;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;
const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 1rem;
  width: 3rem;
  height: 3rem;
`;

const SettingsButton = styled.button`
  width: 3rem;
  height: 3rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  position: absolute;
  top: 7%;
  left: 0;
  z-index: 1000;
  border: none;
  outline: none;
  background: transparent;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 2rem;
  left: 3.5rem;
  width: 20rem;
  background: #0f172a;
  border-radius: 0.8rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const UserSection = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #10b981, #22c55e);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const UserInfo = styled.div`
  flex: 1;
  color: white;
`;

const UserName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const UserEmail = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.4rem;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const MenuItems = styled.div`
  padding: 1rem 0;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: right;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  span {
    font-size: 1rem;
    color: #fff;
    font-weight: 500;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const PageTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  direction: rtl;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;
function PageHeader() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { pageTitle } = usePageTitleContext();
  const { user, logout } = useAuth();
  const [, setIsFullscreen] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const closeSettingsDropdown = () => {
    setShowSettingsDropdown(false);
  };

  const handleLogout = () => {
    logout();
    setShowSettingsDropdown(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeSettingsDropdown();
      }
    }

    if (showSettingsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettingsDropdown]);

  return (
    <StyledPageHeader>
      <HeaderLeft>
        <ToggleButton
          onClick={toggleSidebar}
          style={{
            color: "white",
            backgroundColor: "transparent",
            zIndex: 1000,
          }}
          title="إعدادات الشريط الجانبي"
        >
          {isCollapsed ? <HiOutlineBars3 /> : <HiOutlineXMark />}
        </ToggleButton>
        <FullscreenButton onClick={toggleFullscreen}>
          <FullscreenIcon />
        </FullscreenButton>
      </HeaderLeft>

      <HeaderCenter>
        <PageTitle>{pageTitle ? pageTitle : "لوحة التحكم"}</PageTitle>
      </HeaderCenter>

      <HeaderRight>
        <SettingsButton onClick={toggleSettingsDropdown}>
          <HiCog6Tooth />
        </SettingsButton>

        {showSettingsDropdown && (
          <>
            <Backdrop />
            <DropdownMenu ref={dropdownRef}>
              <UserSection>
                <UserAvatar>{getInitials(user?.name)}</UserAvatar>
                <UserInfo>
                  <UserName>{user?.name || "مستخدم"}</UserName>
                  <UserEmail>{user?.email || "user@example.com"}</UserEmail>
                </UserInfo>
                <LogoutButton onClick={handleLogout}>
                  <HiArrowRightOnRectangle />
                </LogoutButton>
              </UserSection>
              <MenuItems>
                <MenuItem>
                  <span>بياناتي</span>
                </MenuItem>
                <MenuItem>
                  <span>تغيير كلمة المرور</span>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <span>تسجيل الخروج</span>
                </MenuItem>
              </MenuItems>
            </DropdownMenu>
          </>
        )}
      </HeaderRight>
    </StyledPageHeader>
  );
}

export default PageHeader;
