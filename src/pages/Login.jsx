import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi2";
import { useAuth } from "../contexts/AuthContext";
import SpinnerMini from "../ui/SpinnerMini";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  background: var(--primary-gradient);
  position: relative;
  overflow: hidden;

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
    z-index: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const WelcomeSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 40rem 0 30rem 0;
    background: var(--color-brand-500);
    z-index: 1;
  }
  /* &::after {
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
    z-index: 1;
  } */
  @media (max-width: 768px) {
    flex: none;
    min-height: 30rem;
    border-radius: 0 0 4rem 4rem;
    padding: 3rem 2rem;

    &::before {
      border-radius: 0 0 4rem 4rem;
    }
  }
`;

const LoginFormSection = styled.div`
  flex: 1;
  padding: 4rem;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    flex: 1;
    padding: 3rem 2rem;
  }

  &::before {
    content: "";
    position: absolute;
    left: -10%;
    top: -1%;
    height: 10rem;
    width: 22rem;
    transform: rotate(-21deg);
    background: var(--color-brand-600);
    border-radius: 37rem 0 45rem 0;
  }

  @media (max-width: 768px) {
    &::before {
      display: none;
    }
  }
`;

const Logo = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 2rem;

  img {
    height: 15rem;
    width: auto;
    animation: logoFloat 3s ease-in-out infinite;

    @media (max-width: 768px) {
      height: 12rem;
    }

    @media (max-width: 480px) {
      height: 10rem;
    }
  }

  @keyframes logoFloat {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-1rem) scale(1.05);
    }
  }
`;

const FormTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: #2e8b57;
  margin-bottom: 0.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const FormSubtitle = styled.p`
  font-size: 1.4rem;
  color: #fff;
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-grey-100);
  border-radius: 0.8rem;
  padding: 1rem 1.2rem;
  border: 2px solid var(--color-grey-300);
  transition: all 0.3s ease;

  &:focus-within {
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 0.2rem rgba(46, 139, 87, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
  }
`;

const StyledInput = styled.input`
  background: var(--color-grey-100) !important;
  color: #fff;
  font-size: 1.4rem;
  flex: 1;
  padding: 1rem;
  margin-left: 1rem;
  border-radius: 1rem;
  outline: none;
  border: none;
  &:focus {
    outline: none;
  }
  /* Prevent background change on text selection */
  &::selection {
    background: var(--color-brand-600) !important;
    color: #fff !important;
  }

  &::-moz-selection {
    background: var(--color-brand-600) !important;
    color: #fff !important;
  }

  /* Prevent autofill background changes */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px var(--color-grey-100) inset !important;
    -webkit-text-fill-color: #fff !important;
    background: var(--color-grey-100) !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-left: 0.8rem;
  }
`;

const IconWrapper = styled.div`
  color: #2e8b57;
  font-size: 1.6rem;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const LoginButton = styled.button`
  background: #2e8b57;
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
    background: #228b22;
    transform: translateY(-0.1rem);
    box-shadow: 0 0.3rem 1rem rgba(46, 139, 87, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: translateY(0rem);
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
  }
`;

const ForgotPassword = styled.a`
  color: #fff;
  font-size: 1.3rem;
  text-decoration: none;
  text-align: right;
  margin-top: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #2e8b57;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #666;

  a {
    color: #2e8b57;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #228b22;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
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
      <LoginContainer>
        <WelcomeSection>
          <Logo>
            <img src="/logo.svg" alt="Saudi Reef Logo" />
          </Logo>
        </WelcomeSection>

        <LoginFormSection>
          <FormTitle>أهلاً وسهلاً</FormTitle>
          <FormSubtitle>سجل دخولك إلى حسابك للمتابعة</FormSubtitle>

          <StyledForm onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <InputGroup>
              <IconWrapper>
                <HiOutlineUser />
              </IconWrapper>
              <StyledInput
                type="email"
                placeholder="البريد الإلكتروني"
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
                placeholder="كلمة المرور"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </InputGroup>

            <ForgotPassword href="#">نسيت كلمة المرور؟</ForgotPassword>

            <LoginButton type="submit" disabled={isLoading}>
              {!isLoading ? "تسجيل الدخول" : <SpinnerMini />}
            </LoginButton>
          </StyledForm>
        </LoginFormSection>
      </LoginContainer>
    </LoginLayout>
  );
}

export default Login;
