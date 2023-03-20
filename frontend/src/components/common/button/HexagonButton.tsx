// import React from 'react';
// import styled from 'styled-components';

// const ButtonContainer = styled.div`
//   display: inline-block;
//   cursor: pointer;
// `;

// const HexagonButtonWrapper = styled.div`
//   width: 100px;
//   height: 50px;
//   background-color: #3498db;
//   position: relative;
//   margin: 25px 0;

//   &::before,
//   &::after {
//     content: '';
//     position: absolute;
//     width: 0;
//     border-left: 50px solid transparent;
//     border-right: 50px solid transparent;
//   }

//   &::before {
//     bottom: 100%;
//     border-bottom: 25px solid #3498db;
//   }

//   &::after {
//     top: 100%;
//     width: 0;
//     border-top: 25px solid #3498db;
//   }
// `;

// const HexagonButtonInner = styled.div`
//   height: 100%;
//   overflow: hidden;
// `;

// const HexagonButtonContent = styled.div`
//   @apply flex items-center justify-center h-full text-white font-bold text-center;
//   font-size: 16px;
// `;

// const HexagonButton = ({ onClick, children }) => {
//   return (
//     <ButtonContainer onClick={onClick}>
//       <HexagonButtonWrapper>
//         <HexagonButtonInner>
//           <HexagonButtonContent>{children}</HexagonButtonContent>
//         </HexagonButtonInner>
//       </HexagonButtonWrapper>
//     </ButtonContainer>
//   );
// };

// export default HexagonButton;
import React from 'react';

export default function HexagonButton() {
  return <div>HexagonButton</div>;
}
