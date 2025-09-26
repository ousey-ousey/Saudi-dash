import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* Saudi Green Theme */
  --color-brand-50: #f0f9f4;
  --color-brand-100: #dcf4e4;
  --color-brand-200: #bbe8cd;
  --color-brand-500: #22c55e;
  --color-brand-600: #16a34a;
  --color-brand-700: #15803d;
  --color-brand-800: #166534;
  --color-brand-900: #14532d;

  /* Primary Gradient Background */

  --color-dark:#0f172a;
  /* Dark Theme Colors */
  --color-grey-0: linear-gradient(to right, #3f3f46, #27272a);
  --color-grey-50: linear-gradient(to right, #3f3f46, #27272a);
  --color-grey-100:  linear-gradient(to right, #3f3f46, #27272a);
  --color-grey-200: #27272a;
  --color-grey-300: #0f172a;
  --color-grey-400: #71717a;
  --color-grey-500: #a1a1aa;
  --color-grey-600: #d4d4d8;
  --color-grey-700: #e4e4e7;
  --color-grey-800: #f4f4f5;
  --color-grey-900: #fafafa;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(0, 0, 0, 0.3);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;

}

body {
  font-family: "Cairo", "Poppins", sans-serif;
  color: var(--color-grey-700);
  background: var(--color-dark);
  direction: rtl;

  transition: color 0.3s, background-color 0.3s;
  line-height: 1.5;
  font-size: 1.6rem;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Hide scrollbars but keep functionality */
* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

*::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
