import styled from 'styled-components';

const ButtonStyled = styled.button`
  background: #1544BD;
  width: 100%;
  border-radius: 4px;
  padding: 10px 20px;
  border: none;
  min-height: 46px;
  font-family: "Lato";
  color: #fff;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  
  &:disabled{
    background: #1544BD22 !important;
  }
`;

export default function Button(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonStyled {...props} />
  );
}
