import { useState } from "react";
import styled from "styled-components";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useAuth } from "../contexts/AuthContext";
import ButtonIcon from "./ButtonIcon";

const StyledHeader = styled.header`
  padding: 1.2rem;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-600)
  );
  border-radius: 0.8rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const UserAvatar = styled.img`
  display: block;
  width: 3rem;
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
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  outline: 2px solid var(--color-grey-100);
`;

const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
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
      <ButtonIcon onClick={logout} style={{ color: "white" }}>
        <HiArrowRightOnRectangle />
      </ButtonIcon>
    </StyledHeader>
  );
}

export default Header;
