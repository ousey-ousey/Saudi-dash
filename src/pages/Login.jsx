import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi2";
import { useAuth } from "../contexts/AuthContext";
import SpinnerMini from "../ui/SpinnerMini";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem;

  /* Animated bubbles */
  .bubble {
    position: absolute;
    border-radius: 50%;
    animation: bubbleRise linear infinite;
    opacity: 0;
    filter: blur(0.5px);
  }

  .bubble:nth-child(1) {
    width: 8rem;
    height: 8rem;
    left: 5%;
    animation-duration: 12s;
    animation-delay: 0s;
  }

  .bubble:nth-child(2) {
    width: 12rem;
    height: 12rem;
    left: 15%;
    animation-duration: 15s;
    animation-delay: 3s;
  }

  .bubble:nth-child(3) {
    width: 6rem;
    height: 6rem;
    left: 30%;
    animation-duration: 10s;
    animation-delay: 6s;
  }

  .bubble:nth-child(4) {
    width: 10rem;
    height: 10rem;
    right: 20%;
    animation-duration: 13s;
    animation-delay: 2s;
  }

  .bubble:nth-child(5) {
    width: 7rem;
    height: 7rem;
    right: 8%;
    animation-duration: 11s;
    animation-delay: 5s;
  }

  .bubble:nth-child(6) {
    width: 9rem;
    height: 9rem;
    left: 55%;
    animation-duration: 14s;
    animation-delay: 8s;
  }

  @keyframes bubbleRise {
    0% {
      bottom: -15rem;
      opacity: 0;
      background-color: #15803d;
      transform: scale(0.5) translateX(0);
    }
    15% {
      opacity: 0.7;
      transform: scale(0.8) translateX(1rem);
    }
    35% {
      background-color: #22c55e;
      transform: scale(1) translateX(-0.5rem);
    }
    50% {
      opacity: 0.8;
      background-color: #4ade80;
      transform: scale(1.1) translateX(1.5rem);
    }
    70% {
      background-color: #86efac;
      transform: scale(0.9) translateX(-1rem);
    }
    85% {
      opacity: 0.4;
      background-color: #bbf7d0;
    }
    100% {
      bottom: 110vh;
      opacity: 0;
      background-color: #dcfce7;
      transform: scale(0.3) translateX(0.5rem);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .bubble:nth-child(1) {
      width: 6rem;
      height: 6rem;
    }
    .bubble:nth-child(2) {
      width: 8rem;
      height: 8rem;
    }
    .bubble:nth-child(3) {
      width: 4rem;
      height: 4rem;
    }
    .bubble:nth-child(4) {
      width: 7rem;
      height: 7rem;
    }
    .bubble:nth-child(5) {
      width: 5rem;
      height: 5rem;
    }
    .bubble:nth-child(6) {
      width: 6rem;
      height: 6rem;
    }
  }
`;

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 100rem;
  width: 90%;
  background: transparent;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 2.5rem 5rem rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(1rem);
  position: relative;
  z-index: 10;
  border: none;
  outline: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 95%;
    max-width: 45rem;
  }
`;

const LoginFormSection = styled.div`
  padding: 4rem;
  background: #2a3441;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    order: 2;
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const LogoSection = styled.div`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 30rem;
    height: 30rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -15rem;
    right: -15rem;
  }

  &::after {
    content: "";
    position: absolute;
    width: 20rem;
    height: 20rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    bottom: -10rem;
    left: -10rem;
  }

  @media (max-width: 768px) {
    order: 1;
    min-height: 20rem;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.8rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #94a3b8;
  margin-bottom: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const Logo = styled.div`
  position: relative;
  z-index: 2;

  img {
    animation: logoScale 4s ease-in-out infinite;
    height: 12rem;
    width: auto;

    @media (max-width: 768px) {
      height: 10rem;
    }

    @media (max-width: 480px) {
      height: 8rem;
    }
  }

  @keyframes logoScale {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: !important rgba(255, 255, 255, 0.1);
  border-radius: 0.8rem;
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #22c55e;
    box-shadow: 0 0 0 0.3rem rgba(34, 197, 94, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
  }
`;

const StyledInput = styled.input`
  background: transparent;

  border: none;
  color: white;
  font-size: 1.4rem;
  flex: 1;
  padding: 0.4rem 0;
  margin-left: 1rem;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    background: transparent !important;
  }

  &:active {
    background: transparent !important;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: white !important;
    background: transparent !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }

  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: white !important;
    background: transparent !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }

  &:-webkit-autofill:hover {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: white !important;
    background: transparent !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }

  &:-webkit-autofill:active {
    -webkit-text-fill-color: white !important;
    transition: background-color 5000s ease-in-out 0s !important;
    background: transparent !important;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-left: 0.8rem;
  }
`;

const IconWrapper = styled.div`
  color: #94a3b8;
  font-size: 1.6rem;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const LoginButton = styled.button`
  background: #22c55e;
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #16a34a;
    transform: translateY(-0.2rem);
    box-shadow: 0 0.5rem 1.5rem rgba(34, 197, 94, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const Checkbox = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  accent-color: #22c55e;
`;

const CheckboxLabel = styled.label`
  color: #94a3b8;
  font-size: 1.4rem;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
  text-align: center;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.8rem;
  border-radius: 6px;
  border-left: 4px solid #ef4444;
`;

function Login() {
  const [email, setEmail] = useState("super@admin.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError("");

    try {
      login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }

  return (
    <LoginLayout>
      {/* Animated bubbles */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <LoginContainer>
        <LoginFormSection>
          <Title>تسجيل الدخول</Title>
          <Subtitle>أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك</Subtitle>

          <StyledForm onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <InputGroup>
              <IconWrapper>
                <HiOutlineUser />
              </IconWrapper>
              <StyledInput
                type="email"
                dir="ltr"
                placeholder="اسم المستخدم"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="username"
              />
            </InputGroup>

            <InputGroup>
              <IconWrapper>
                <HiOutlineLockClosed />
              </IconWrapper>
              <StyledInput
                type="password"
                dir="ltr"
                placeholder="كلمة المرور"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </InputGroup>

            <RememberMe>
              <Checkbox type="checkbox" id="remember" />
              <CheckboxLabel htmlFor="remember">تذكرني</CheckboxLabel>
            </RememberMe>

            <LoginButton type="submit" disabled={isLoading}>
              {!isLoading ? "دخول" : <SpinnerMini />}
            </LoginButton>
          </StyledForm>
        </LoginFormSection>

        <LogoSection>
          <Logo>
            <img src="/logo.svg" alt="Saudi Reef Logo" />
          </Logo>
        </LogoSection>
      </LoginContainer>
    </LoginLayout>
  );
}

export default Login;
