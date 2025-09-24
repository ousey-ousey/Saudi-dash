import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  HiOutlineHome,
  HiOutlinePlusCircle,
  HiOutlineCog6Tooth,
  HiOutlineClipboardDocumentList,
  HiOutlineExclamationTriangle,
  HiOutlineCalendarDays,
  HiOutlineEnvelope,
  HiOutlineStar,
  HiOutlineScale,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi2";

const Sidebar = styled.nav`
  width: 100%;
  padding: 1rem;
  background: transparent;
  overflow: visible;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(16, 185, 129, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(34, 197, 94, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(22, 163, 74, 0.1) 0%,
        transparent 50%
      );
    pointer-events: none;
    z-index: -10;
  }
`;

const NavList = styled.ul.withConfig({
  shouldForwardProp: (prop) => prop !== "isCollapsed",
})`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  width: ${(props) => (props.isCollapsed ? "5rem" : "23rem")};
  margin: 0;
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: ${(props) => (props.isCollapsed ? "5rem" : "21rem")};
  padding: ${(props) => (props.isCollapsed ? "1.2rem" : "1.2rem 2.4rem")};
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  text-decoration: none;
  position: relative;
  z-index: 5;
  background-color: transparent;
  justify-content: ${(props) => (props.isCollapsed ? "center" : "flex-start")};

  ${(props) =>
    props.isCollapsed &&
    `
    &::after,
    &::before {
      background-color: transparent;
      transform: scale(0);
   }
  `}

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    position: relative;
    z-index: 2;
    color: var(--color-grey-600);
  }

  & span {
    position: relative;
    z-index: 2;
    display: ${(props) => (props.isCollapsed ? "none" : "block")};
  }

  border-radius: 2rem;

  &:hover,
  &.active,
  &[aria-current="page"] {
    color: white;
    background-color: var(--color-dark);
  }

  &:hover::after,
  &.active::after,
  &[aria-current="page"]::after {
    background-color: var(--color-dark);
  }

  &:hover::before,
  &.active::before,
  &[aria-current="page"]::before {
    background-color: var(--color-dark);
  }

  &.active svg,
  &[aria-current="page"] svg {
    color: #fff;
  }
`;

const ExpandableItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isExpanded", "isCollapsed"].includes(prop),
})`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isCollapsed ? "center" : "space-between"};
  gap: 1.2rem;
  padding: ${(props) => (props.isCollapsed ? "1.2rem" : "1.2rem 2.4rem")};
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  position: relative;
  width: ${(props) => (props.isCollapsed ? "5rem" : "21rem")};
  z-index: 5;
  background-color: props.isCollapsed ? transparent : var(--color-dark);
  transition: all 0.1s ease;
  border-radius: 2rem;

  Green indicator line when expanded
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: ${(props) => (props.isExpanded && !props.isCollapsed ? "4px" : "0")};
    height: 60%;
    background-color: var(--color-brand-600);
    border-radius: 2px 0 0 2px;
    transition: width 0.15s ease;
  }

  &:hover {
    color: white;
    background-color: var(--color-dark);
    transition: all 0.1s ease;
  }
  &:active {
    color: white;
    background-color: var(--color-dark);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #fff;
  }

  &:hover svg {
    color: #fff;
  }
  ${(props) =>
    props.isCollapsed &&
    `
    &::after,
    &::before {
      background-color: transparent;
   }
  `}
  /* Change colors when expanded */
  ${(props) =>
    props.isExpanded &&
    !props.isCollapsed &&
    `
    color: white;
    font-weight: 200;
    background-color: var(--color-dark);
    & svg {
      color: #fff;
    }
  `}
`;

const ExpandableContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const SubList = styled.ul`
  list-style: none;
  padding: 0;
  width: ${(props) => (props.isCollapsed ? "5rem" : "21rem")};
  margin: 0;
  padding-right: 2rem;
  max-height: ${(props) => (props.isOpen ? "auto" : "0")};
  overflow: hidden;
  font-size: 1.4rem;
  transition: all 0.15s ease;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  position: relative;

  /* Show pseudo-elements when submenu is open */
  /* ${(props) =>
    props.isOpen &&
    `
    &::after,
    &::before,&active {
 color: white;
    font-weight: 200;
    background-color: var(--color-dark);
    & svg,&active svg {
      color: #fff;
    }      
    }
  `} */
`;

const SubItem = styled.li`
  margin: 0.5rem 0;
  position: relative;
`;

const Tooltip = styled.div`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-dark);
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  white-space: nowrap;
  z-index: 999999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  margin-right: 1rem;

  &::before {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 0.6rem solid transparent;
    border-left-color: #fff;
  }
`;

const SubNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.6rem;
  padding-left: 3.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-grey-500);
  text-decoration: none;
  border-radius: 1rem;
  transition: all 0.15s ease;
  position: relative;
  z-index: 5;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: #fff;
    position: relative;
    z-index: 2;
  }

  & span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    color: white;
    background-color: var(--color-dark);
  }

  &.active,
  &[aria-current="page"] {
    background-color: var(--color-dark);
    font-weight: 600;
    color: white;
    font-weight: 200;
    background-color: var(--color-dark);
  }

  &.active::after,
  &[aria-current="page"]::after {
    background-color: var(--color-dark);
  }

  &.active::before,
  &[aria-current="page"]::before {
    background-color: var(--color-dark);
  }

  &.active svg,
  &[aria-current="page"] svg {
    color: #fff;
  }
`;

const CollapsedNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  text-decoration: none;
  position: relative;
  z-index: 10;
  transition: all 0.1s ease;
  border-radius: 2rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #fff;
  }

  &:hover {
    color: white;
    background-color: var(--color-dark);
  }

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }

  &.active,
  &[aria-current="page"] {
    color: white;
    background-color: var(--color-dark);
  }

  &.active svg,
  &[aria-current="page"] svg {
    color: #fff;
  }
`;

const CollapsedExpandableItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  position: relative;
  z-index: 10;
  transition: all 0.1s ease;
  border-radius: 2rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #fff;
  }

  &:hover {
    color: white;
    background-color: var(--color-dark);
  }

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
  &::active {
    color: white;
    background-color: var(--color-dark);
  }
`;

function MainNav({ isCollapsed }) {
  const [expandedMenus, setExpandedMenus] = useState(() => {
    // Load expanded state from localStorage
    const saved = localStorage.getItem("saudi-dash-expanded-menus");
    return saved ? JSON.parse(saved) : {};
  });

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => {
      // If the clicked menu is already open, close it
      if (prev[menuKey]) {
        const newState = {
          ...prev,
          [menuKey]: false,
        };
        localStorage.setItem(
          "saudi-dash-expanded-menus",
          JSON.stringify(newState)
        );
        return newState;
      } else {
        // If the clicked menu is closed, open it and close all others
        const newState = {
          dashboards: false,
          requests: false,
          projects: false,
          quality: false,
          risks: false,
          schedules: false,
          letters: false,
          budget: false,
          [menuKey]: true,
        };
        localStorage.setItem(
          "saudi-dash-expanded-menus",
          JSON.stringify(newState)
        );
        return newState;
      }
    });
  };

  const handleNavClick = (menuKey = null) => {
    // If a specific menu is provided, keep that menu open and close others
    if (menuKey) {
      setExpandedMenus((prev) => {
        const newState = {
          dashboards: false,
          requests: false,
          projects: false,
          quality: false,
          risks: false,
          schedules: false,
          letters: false,
          budget: false,
          [menuKey]: prev[menuKey], // Keep the current state of the clicked menu
        };
        localStorage.setItem(
          "saudi-dash-expanded-menus",
          JSON.stringify(newState)
        );
        return newState;
      });
    } else {
      // If no menu specified, close all menus
      setExpandedMenus({
        dashboards: false,
        requests: false,
        projects: false,
        quality: false,
        risks: false,
        schedules: false,
        letters: false,
        budget: false,
      });

      localStorage.setItem(
        "saudi-dash-expanded-menus",
        JSON.stringify({
          dashboards: false,
          requests: false,
          projects: false,
          quality: false,
          risks: false,
          schedules: false,
          letters: false,
          budget: false,
        })
      );
    }

    // Remove focus and selection from all elements
    if (document.activeElement) {
      document.activeElement.blur();
    }

    // Clear any text selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    // Remove focus from any focused element
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  };

  return (
    <Sidebar>
      <NavList isCollapsed={isCollapsed}>
        {/* لوحات البيانات */}
        <li>
          {isCollapsed ? (
            <CollapsedExpandableItem>
              <HiOutlineCog6Tooth />
              <Tooltip>
                <SubItem>
                  <SubNavLink
                    to="/dashboard"
                    onClick={() => handleNavClick("dashboards")}
                  >
                    <HiOutlineHome />
                    <span>الرئيسية</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/analytics"
                    onClick={() => handleNavClick("dashboards")}
                  >
                    <HiOutlineClipboardDocumentList />
                    <span>التحليلات</span>
                  </SubNavLink>
                </SubItem>
              </Tooltip>
            </CollapsedExpandableItem>
          ) : (
            <>
              <ExpandableItem
                isExpanded={expandedMenus.dashboards}
                isCollapsed={isCollapsed}
                onClick={() => toggleMenu("dashboards")}
              >
                <ExpandableContent>
                  <HiOutlineCog6Tooth />
                  <span>لوحات البيانات</span>
                </ExpandableContent>
                {expandedMenus.dashboards ? (
                  <HiOutlineChevronUp style={{ marginLeft: "1rem" }} />
                ) : (
                  <HiOutlineChevronDown style={{ marginLeft: "1rem" }} />
                )}
              </ExpandableItem>
              <SubList isOpen={expandedMenus.dashboards}>
                <SubItem>
                  <SubNavLink
                    to="/dashboard"
                    onClick={() => handleNavClick("dashboards")}
                  >
                    <HiOutlineHome />
                    <span>الرئيسية</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/analytics"
                    onClick={() => handleNavClick("dashboards")}
                  >
                    <HiOutlineClipboardDocumentList />
                    <span>التحليلات</span>
                  </SubNavLink>
                </SubItem>
              </SubList>
            </>
          )}
        </li>

        {/* تقديم طلب جديد */}
        <li>
          {isCollapsed ? (
            <CollapsedNavLink
              to="/new-request"
              onClick={() => handleNavClick("requests")}
            >
              <HiOutlinePlusCircle />
              <Tooltip>تقديم طلب جديد</Tooltip>
            </CollapsedNavLink>
          ) : (
            <StyledNavLink
              to="/new-request"
              isCollapsed={isCollapsed}
              onClick={() => handleNavClick("dashboards")}
            >
              <HiOutlinePlusCircle />
              <span>تقديم طلب جديد</span>
            </StyledNavLink>
          )}
        </li>

        {/* السجلات */}
        <li>
          {isCollapsed ? (
            <CollapsedExpandableItem>
              <HiOutlineClipboardDocumentList />
              <Tooltip>
                <SubItem>
                  <SubNavLink
                    to="/projects-log"
                    onClick={() => handleNavClick("projects")}
                  >
                    <HiOutlineClipboardDocumentList />
                    <span>سجل المشاريع</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/risks-log"
                    onClick={() => handleNavClick("risks")}
                  >
                    <HiOutlineExclamationTriangle />
                    <span>سجل المخاطر</span>
                  </SubNavLink>
                </SubItem>
              </Tooltip>
            </CollapsedExpandableItem>
          ) : (
            <>
              <ExpandableItem
                isExpanded={expandedMenus.projects}
                isCollapsed={isCollapsed}
                onClick={() => toggleMenu("projects")}
              >
                <ExpandableContent>
                  <HiOutlineClipboardDocumentList />
                  <span>السجلات</span>
                </ExpandableContent>
                {expandedMenus.projects ? (
                  <HiOutlineChevronUp style={{ marginLeft: "1rem" }} />
                ) : (
                  <HiOutlineChevronDown style={{ marginLeft: "1rem" }} />
                )}
              </ExpandableItem>
              <SubList isOpen={expandedMenus.projects}>
                <SubItem>
                  <SubNavLink
                    to="/projects-log"
                    onClick={() => handleNavClick("projects")}
                  >
                    <HiOutlineClipboardDocumentList />
                    <span>سجل المشاريع</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/risks-log"
                    onClick={() => handleNavClick("projects")}
                  >
                    <HiOutlineExclamationTriangle />
                    <span>سجل المخاطر</span>
                  </SubNavLink>
                </SubItem>
              </SubList>
            </>
          )}
        </li>

        {/* الجداول الزمنية */}
        <li>
          {isCollapsed ? (
            <CollapsedNavLink
              to="/schedules"
              onClick={() => handleNavClick("schedules")}
            >
              <HiOutlineCalendarDays />
              <Tooltip>الجداول الزمنية</Tooltip>
            </CollapsedNavLink>
          ) : (
            <StyledNavLink
              to="/schedules"
              isCollapsed={isCollapsed}
              onClick={() => handleNavClick("schedules")}
            >
              <HiOutlineCalendarDays />
              <span>الجداول الزمنية</span>
            </StyledNavLink>
          )}
        </li>

        {/* الخطابات والمراسلات */}
        <li>
          {isCollapsed ? (
            <CollapsedExpandableItem>
              <HiOutlineEnvelope />
              <Tooltip>
                {" "}
                <SubItem>
                  <SubNavLink
                    to="/incoming-letters"
                    onClick={() => handleNavClick("letters")}
                  >
                    <HiOutlineEnvelope />
                    <span>الخطابات الواردة</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/outgoing-letters"
                    onClick={() => handleNavClick("letters")}
                  >
                    <HiOutlineEnvelope />
                    <span>الخطابات الصادرة</span>
                  </SubNavLink>
                </SubItem>
              </Tooltip>
            </CollapsedExpandableItem>
          ) : (
            <>
              <ExpandableItem
                isExpanded={expandedMenus.letters}
                isCollapsed={isCollapsed}
                onClick={() => toggleMenu("letters")}
              >
                <ExpandableContent>
                  <HiOutlineEnvelope />
                  <span>الخطابات والمراسلات</span>
                </ExpandableContent>
                {expandedMenus.letters ? (
                  <HiOutlineChevronUp style={{ marginLeft: "1rem" }} />
                ) : (
                  <HiOutlineChevronDown style={{ marginLeft: "1rem" }} />
                )}
              </ExpandableItem>
              <SubList isOpen={expandedMenus.letters}>
                <SubItem>
                  <SubNavLink
                    to="/incoming-letters"
                    onClick={() => handleNavClick("letters")}
                  >
                    <HiOutlineEnvelope />
                    <span>الخطابات الواردة</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/outgoing-letters"
                    onClick={() => handleNavClick("letters")}
                  >
                    <HiOutlineEnvelope />
                    <span>الخطابات الصادرة</span>
                  </SubNavLink>
                </SubItem>
              </SubList>
            </>
          )}
        </li>

        {/* الجودة */}
        <li>
          {isCollapsed ? (
            <CollapsedExpandableItem>
              <HiOutlineStar />
              <Tooltip>
                <SubItem>
                  <SubNavLink
                    to="/quality-control"
                    onClick={() => handleNavClick("quality")}
                  >
                    <HiOutlineStar />
                    <span>مراقبة الجودة</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/quality-reports"
                    onClick={() => handleNavClick("quality")}
                  >
                    <HiOutlineClipboardDocumentList />
                    <span>تقارير الجودة</span>
                  </SubNavLink>
                </SubItem>
              </Tooltip>
            </CollapsedExpandableItem>
          ) : (
            <>
              <ExpandableItem
                isExpanded={expandedMenus.quality}
                isCollapsed={isCollapsed}
                onClick={() => toggleMenu("quality")}
              >
                <ExpandableContent>
                  <HiOutlineStar />
                  <span>الجودة</span>
                </ExpandableContent>
                {expandedMenus.quality ? (
                  <HiOutlineChevronUp style={{ marginLeft: "1rem" }} />
                ) : (
                  <HiOutlineChevronDown style={{ marginLeft: "1rem" }} />
                )}
              </ExpandableItem>
              <SubList isOpen={expandedMenus.quality}>
                <SubItem>
                  <SubNavLink
                    to="/quality-control"
                    onClick={() => handleNavClick("quality")}
                  >
                    <HiOutlineStar />
                    <span>مراقبة الجودة</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/quality-reports"
                    onClick={() => handleNavClick("quality")}
                  >
                    <HiOutlineClipboardDocumentList />
                    <span>تقارير الجودة</span>
                  </SubNavLink>
                </SubItem>
              </SubList>
            </>
          )}
        </li>

        {/* الميزانية */}
        <li>
          {isCollapsed ? (
            <CollapsedExpandableItem>
              <HiOutlineScale />
              <Tooltip>
                {" "}
                <SubItem>
                  <SubNavLink
                    to="/budget-planning"
                    onClick={() => handleNavClick("budget")}
                  >
                    <HiOutlineScale />
                    <span>تخطيط الميزانية</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/budget-tracking"
                    onClick={() => handleNavClick("budget")}
                  >
                    <HiOutlineClipboardDocumentList />
                    <span>تتبع الميزانية</span>
                  </SubNavLink>
                </SubItem>
              </Tooltip>
            </CollapsedExpandableItem>
          ) : (
            <>
              <ExpandableItem
                isExpanded={expandedMenus.budget}
                isCollapsed={isCollapsed}
                onClick={() => toggleMenu("budget")}
              >
                <ExpandableContent>
                  <HiOutlineScale />
                  <span>الميزانية</span>
                </ExpandableContent>
                {expandedMenus.budget ? (
                  <HiOutlineChevronUp style={{ marginLeft: "1rem" }} />
                ) : (
                  <HiOutlineChevronDown style={{ marginLeft: "1rem" }} />
                )}
              </ExpandableItem>
              <SubList isOpen={expandedMenus.budget}>
                <SubItem>
                  <SubNavLink
                    to="/budget-planning"
                    onClick={() => handleNavClick("budget")}
                  >
                    <HiOutlineScale />
                    <span>تخطيط الميزانية</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink
                    to="/budget-tracking"
                    onClick={() => handleNavClick("budget")}
                  >
                    <HiOutlineClipboardDocumentList />
                    <span>تتبع الميزانية</span>
                  </SubNavLink>
                </SubItem>
              </SubList>
            </>
          )}
        </li>
      </NavList>
    </Sidebar>
  );
}

MainNav.propTypes = {
  isCollapsed: PropTypes.bool,
};

export default MainNav;
