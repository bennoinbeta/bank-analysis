import React from 'react';
import styled from 'styled-components';
import DollarBackground from '../DollarBackground';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';

type Props = {
  shouldRenderNavbar?: boolean;
  shouldRenderHeader?: boolean;
  shouldRenderFooter?: boolean;
  isLoading?: boolean;
};

const PageLayout: React.FC<Props> = (props) => {
  const {
    shouldRenderNavbar,
    shouldRenderHeader,
    shouldRenderFooter,
    children,
    isLoading,
  } = props;

  return (
    <Container isLoading={isLoading}>
      <InnerContainer>
        {shouldRenderHeader && <Header />}

        {shouldRenderNavbar && <Navbar />}

        <Main>{children}</Main>

        {shouldRenderFooter && <Footer />}
      </InnerContainer>
    </Container>
  );
};

PageLayout.defaultProps = {
  shouldRenderHeader: true,
  shouldRenderNavbar: true,
  shouldRenderFooter: true,
  isLoading: false,
};

export default PageLayout;

const Container = styled(DollarBackground)`
  display: flex;
  flex: 1;

  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.background};
`;

const InnerContainer = styled.div`
  display: flex;
  flex: 1;

  max-width: 1100px;

  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
`;
