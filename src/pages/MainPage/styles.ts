import styled from 'styled-components';

export const Container = styled.div`
  background: #c2c2c2;
  padding: 16px;
  border-width: 4px;
  border-style: solid;
  border-right-color: #999;
  border-bottom-color: #999;
  border-left-color: white;
  border-top-color: white;
`;
export const Header = styled.div`
  background: #c0c0c0;
  padding: 10px 12px;
  border-width: 4px;
  border-style: solid;
  border-right-color: white;
  border-bottom-color: white;
  border-left-color: #7b7b7b;
  border-top-color: #7b7b7b;

  display: flex;
  justify-content: space-between;
`;

export const Body = styled.div`
  margin-top: 16px;
  border-width: 4px;
  border-style: solid;
  border-right-color: white;
  border-bottom-color: white;
  border-left-color: #7b7b7b;
  border-top-color: #7b7b7b;
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(9, 1fr);
`;

export const Face = styled.div`
  width: 52px;
  height: 52px;
  font-size: 35px;
  border-width: 4px;
  border-style: solid;
  border-right-color: #7b7b7b;
  border-bottom-color: #7b7b7b;
  border-left-color: white;
  border-top-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:active {
    border-bottom-color: white;
    border-right-color: white;
    border-left-color: #7b7b7b;
    border-top-color: #7b7b7b;
  }
`;
