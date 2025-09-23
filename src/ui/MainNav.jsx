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
  z-index: 1;
  background-color: transparent;
  justify-content: ${(props) => (props.isCollapsed ? "center" : "flex-start")};

  /* Base pseudo-elements (always present so transitions sync) */
  /* &::after,
  &::before {
    content: "";
    position: absolute;
    right: 1rem;
    height: 100%;
    background-color: transparent;
    z-index: 0;
    transform: ${(props) => (props.isCollapsed ? "scale(0)" : "scale(1)")};
    transition: transform 0.1s ease;
  } */
  /* &::after {
    top: -75%;
    width: 4.1875rem;
    right: 192px;
    rotate: -5deg;
    clip-path: path(
      "M0,12 C-15,-58 -77,-157 -2,-41 C-7,56 35,32 48,40 C70,49 55,40 63,49 C-48,108 56,-3 78,108 C42,116 34,120 26,49 C18,124 8,124 0,118 L0,12 Z"
    );
  }

  &::before {
    top: 77%;
    right: 190px;
    width: 4.1875rem;
    rotate: 108deg;
    clip-path: path(
      "M0,12 C-15,-58 -77,-157 -2,-41 C-7,56 35,32 48,40 C70,49 55,40 63,49 C-48,108 56,-3 78,108 C42,116 34,120 26,49 C18,124 8,124 0,118 L0,12 Z"
    );
  } */
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
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  &:hover::after,
  &.active::after,
  &[aria-current="page"]::after {
    background-color: var(--color-grey-100);
  }

  &:hover::before,
  &.active::before,
  &[aria-current="page"]::before {
    background-color: var(--color-grey-100);
  }

  &.active svg,
  &[aria-current="page"] svg {
    color: var(--color-brand-600);
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
  z-index: 1;
  background-color:  props.isCollapsed  ?transparent : var(--color-grey-100);
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
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    transition: all 0.1s ease;
  }
  &:active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }

  &:hover svg {
    color: var(--color-grey-800);
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
    color: var(--color-brand-200);
    font-weight: 600;
    background-color: var(--color-grey-100);
    & svg {
      color: var(--color-brand-600);
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

  /* Tree connector line
  &::before {
    content: "";
    position: absolute;
    left: 1.2rem;
    top: -0.5rem;
    width: 3px;
    height: ${(props) => (props.isOpen ? "calc(100% + 2.4rem)" : "0")};
    background-color: var(--color-grey-100);
    transition: height 0.15s ease;
    z-index: 0;
  } */

  /* Pseudo-elements for submenu container
  &::after,
  &::before {
    content: "";
    position: absolute;
    right: 1rem;
    height: 100%;
    background-color: transparent;
    z-index: 0;
    transition: background-color 1s ease;
  }

  &::after {
    top: -20%;
    width: 4.1875rem;
    rotate: 279deg;
    clip-path: path(
      "M0,12 C-15,-58 -77,-157 -2,-41 C-7,56 35,32 48,40 C70,49 55,40 63,49 C-48,108 56,-3 78,108 C42,116 34,120 26,49 C18,124 8,124 0,118 L0,12 Z"
    );
  }

  &::before {
    top: 80%;
    width: 4.1875rem;
    rotate: 180deg;
    clip-path: path(
      "M0,12 C-15,-58 -77,-157 -2,-41 C-7,56 35,32 48,40 C70,49 55,40 63,49 C-48,108 56,-3 78,108 C42,116 34,120 26,49 C18,124 8,124 0,118 L0,12 Z"
    );
  } */

  /* Show pseudo-elements when submenu is open */
  ${(props) =>
    props.isOpen &&
    `
    &::after,
    &::before {
      background-color: var(--color-grey-100);
    }
  `}
`;

const SubItem = styled.li`
  margin: 0.5rem 0;
  position: relative;
  /* 
  /* Tree branch connector */
  /* &::before {
    content: "";
    position: absolute;
    left: 1.2rem;
    top: 50%;
    width: 1rem;
    height: 3px;
    background-color: var(--color-grey-100);
    z-index: 0;
  } */
`;

const Tooltip = styled.div`
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--color-grey-100);
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  white-space: nowrap;
  z-index: 99999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  margin-right: 1rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.25);

  &::before {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 0.6rem solid transparent;
    border-left-color: var(--color-grey-800);
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
  z-index: 1;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: inherit;
    position: relative;
    z-index: 2;
  }

  & span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    color: var(--color-grey-700);
    background-color: var(--color-grey-100);
  }

  &.active,
  &[aria-current="page"] {
    color: var(--color-brand-600);
    background-color: var(--color-grey-100);
    font-weight: 500;
  }

  &.active::after,
  &[aria-current="page"]::after {
    background-color: var(--color-grey-100);
  }

  &.active::before,
  &[aria-current="page"]::before {
    background-color: var(--color-grey-100);
  }

  &.active svg,
  &[aria-current="page"] svg {
    color: var(--color-brand-600);
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
  z-index: 1;
  background-color: var(--color-grey-100);
  transition: all 0.1s ease;
  border-radius: 2rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }

  &.active,
  &[aria-current="page"] {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  &.active svg,
  &[aria-current="page"] svg {
    color: var(--color-brand-600);
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
  z-index: 1;
  background-color: var(--color-grey-100);
  transition: all 0.1s ease;
  border-radius: 2rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-600);
  }

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
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
      const newState = {
        ...prev,
        [menuKey]: !prev[menuKey],
      };
      // Save to localStorage
      localStorage.setItem(
        "saudi-dash-expanded-menus",
        JSON.stringify(newState)
      );
      return newState;
    });
  };

  const handleNavClick = () => {
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
                  <SubNavLink to="/dashboard" onClick={handleNavClick}>
                    <HiOutlineHome />
                    <span>الرئيسية</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/analytics" onClick={handleNavClick}>
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
                  <SubNavLink to="/dashboard" onClick={handleNavClick}>
                    <HiOutlineHome />
                    <span>الرئيسية</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/analytics" onClick={handleNavClick}>
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
            <CollapsedNavLink to="/new-request" onClick={handleNavClick}>
              <HiOutlinePlusCircle />
              <Tooltip>تقديم طلب جديد</Tooltip>
            </CollapsedNavLink>
          ) : (
            <StyledNavLink
              to="/new-request"
              isCollapsed={isCollapsed}
              onClick={handleNavClick}
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
                  <SubNavLink to="/projects-log" onClick={handleNavClick}>
                    <HiOutlineClipboardDocumentList />
                    <span>سجل المشاريع</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/risks-log" onClick={handleNavClick}>
                    <HiOutlineExclamationTriangle />
                    <span>سجل المخاطر</span>
                  </SubNavLink>
                </SubItem>
              </Tooltip>
            </CollapsedExpandableItem>
          ) : (
            <>
              <ExpandableItem
                isExpanded={expandedMenus.records}
                isCollapsed={isCollapsed}
                onClick={() => toggleMenu("records")}
              >
                <ExpandableContent>
                  <HiOutlineClipboardDocumentList />
                  <span>السجلات</span>
                </ExpandableContent>
                {expandedMenus.records ? (
                  <HiOutlineChevronUp style={{ marginLeft: "1rem" }} />
                ) : (
                  <HiOutlineChevronDown style={{ marginLeft: "1rem" }} />
                )}
              </ExpandableItem>
              <SubList isOpen={expandedMenus.records}>
                <SubItem>
                  <SubNavLink to="/projects-log" onClick={handleNavClick}>
                    <HiOutlineClipboardDocumentList />
                    <span>سجل المشاريع</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/risks-log" onClick={handleNavClick}>
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
            <CollapsedNavLink to="/schedules" onClick={handleNavClick}>
              <HiOutlineCalendarDays />
              <Tooltip>الجداول الزمنية</Tooltip>
            </CollapsedNavLink>
          ) : (
            <StyledNavLink
              to="/schedules"
              isCollapsed={isCollapsed}
              onClick={handleNavClick}
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
                  <SubNavLink to="/incoming-letters" onClick={handleNavClick}>
                    <HiOutlineEnvelope />
                    <span>الخطابات الواردة</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/outgoing-letters" onClick={handleNavClick}>
                    <HiOutlineEnvelope />
                    <span>الخطابات الصادرة</span>
                  </SubNavLink>
                </SubItem>
              </Tooltip>
            </CollapsedExpandableItem>
          ) : (
            <>
              <ExpandableItem
                isExpanded={expandedMenus.correspondence}
                isCollapsed={isCollapsed}
                onClick={() => toggleMenu("correspondence")}
              >
                <ExpandableContent>
                  <HiOutlineEnvelope />
                  <span>الخطابات والمراسلات</span>
                </ExpandableContent>
                {expandedMenus.correspondence ? (
                  <HiOutlineChevronUp style={{ marginLeft: "1rem" }} />
                ) : (
                  <HiOutlineChevronDown style={{ marginLeft: "1rem" }} />
                )}
              </ExpandableItem>
              <SubList isOpen={expandedMenus.correspondence}>
                <SubItem>
                  <SubNavLink to="/incoming-letters" onClick={handleNavClick}>
                    <HiOutlineEnvelope />
                    <span>الخطابات الواردة</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/outgoing-letters" onClick={handleNavClick}>
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
                  <SubNavLink to="/quality-control" onClick={handleNavClick}>
                    <HiOutlineStar />
                    <span>مراقبة الجودة</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/quality-reports" onClick={handleNavClick}>
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
                  <SubNavLink to="/quality-control" onClick={handleNavClick}>
                    <HiOutlineStar />
                    <span>مراقبة الجودة</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/quality-reports" onClick={handleNavClick}>
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
                  <SubNavLink to="/budget-planning" onClick={handleNavClick}>
                    <HiOutlineScale />
                    <span>تخطيط الميزانية</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/budget-tracking" onClick={handleNavClick}>
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
                  <SubNavLink to="/budget-planning" onClick={handleNavClick}>
                    <HiOutlineScale />
                    <span>تخطيط الميزانية</span>
                  </SubNavLink>
                </SubItem>
                <SubItem>
                  <SubNavLink to="/budget-tracking" onClick={handleNavClick}>
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
