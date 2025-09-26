import styled from "styled-components";
import { HiCog6Tooth, HiArrowRightOnRectangle } from "react-icons/hi2";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef } from "react";
import { LogOut } from "lucide-react";

const SettingsButton = styled.button`
  position: relative;
  top: 27px;
  left: 1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.2s ease;
  outline: none;
  border: none;

  &:hover {
    color: var(--color-brand-400);
    border-color: var(--color-brand-500);
    transform: scale(1.05);
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
    width: 2rem;
    height: 2rem;
  }
`;

const DropdownMenu = styled.div`
  position: fixed;
  top: 7rem;
  left: 2rem;
  width: 32rem;
  background: #0f172a;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  overflow: hidden;
`;

const UserSection = styled.div`
  padding: 2rem;
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-900)
  );
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const UserAvatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 3px solid rgba(255, 255, 255, 0.3);
`;

const AvatarFallback = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  border: 3px solid rgba(255, 255, 255, 0.3);
`;

const UserName = styled.span`
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
  flex: 1;
`;

const LogoutIcon = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.6rem;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
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
  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const MenuItems = styled.div`
  padding: 1.6rem 0;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 1.6rem 2rem;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: right;

  &:hover {
    background: #5a565656;
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
  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #0f172a;
  }

  span {
    font-size: 1.5rem;
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

function GlobalSettingsDropdown() {
  const {
    user,
    showSettingsDropdown,
    toggleSettingsDropdown,
    closeSettingsDropdown,
    logout,
  } = useAuth();
  const dropdownRef = useRef(null);

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
  }, [showSettingsDropdown, closeSettingsDropdown]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <SettingsButton onClick={toggleSettingsDropdown}>
        <HiCog6Tooth />
      </SettingsButton>

      {showSettingsDropdown && (
        <>
          <Backdrop />
          <DropdownMenu ref={dropdownRef}>
            <UserSection>
              <LogoutIcon onClick={logout}>
                <HiArrowRightOnRectangle />
              </LogoutIcon>
              <UserName>{user?.name || "Super Admin"}</UserName>
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </UserSection>
            <MenuItems>
              <MenuItem>
                <span>بياناتي</span>
              </MenuItem>
              <MenuItem>
                <span>تغيير كلمة المرور</span>
              </MenuItem>
              <MenuItem onClick={logout}>
                <span>تسجيل الخروج</span>
              </MenuItem>
            </MenuItems>
          </DropdownMenu>
        </>
      )}
    </>
  );
}

export default GlobalSettingsDropdown;
