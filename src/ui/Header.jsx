import { useState } from "react";
import styled from "styled-components";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useAuth } from "../contexts/AuthContext";
import ButtonIcon from "./ButtonIcon";

const StyledHeader = styled.header`
  background: var(--color-grey-50);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-200);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const UserAvatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const AvatarFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
  outline: 2px solid var(--color-grey-100);
`;

const UserName = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

function Header() {
  const { user, logout } = useAuth();
  const [imageError, setImageError] = useState(false);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <StyledHeader>
      <div>
        <UserInfo>
          {user.avatar && !imageError ? (
            <UserAvatar
              src={user.avatar}
              alt={`Avatar of ${user.name}`}
              onError={handleImageError}
            />
          ) : (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
          <UserName>{user.name}</UserName>
        </UserInfo>
      </div>
      <div>
        <ButtonIcon onClick={logout}>
          <HiArrowRightOnRectangle />
        </ButtonIcon>
      </div>
    </StyledHeader>
  );
}

export default Header;
