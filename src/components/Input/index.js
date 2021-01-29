import styled from 'styled-components';

const InputStyled = styled.input`
  background: #ffffff;
  border-radius: 4px;
  text-align:center;
  width: 100%;
  border: none;
  height: 46px;
  padding: 15px;
  border: 1px solid rgba(128, 128, 128, 0.548);
  margin-bottom: 15px
`;

export default function Input(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <InputStyled {...props} />
  );
}
