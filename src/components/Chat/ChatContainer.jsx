import { Box, Card, styled, useMediaQuery } from "@mui/material";
import Chat from "./Chat";

const CustomCard = styled(Card)`
  width: 100%;
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 275px;
  max-width: 1000px;
  padding: 24px;
  margin-inline: 24px;
`;

const ChatContainer = () => {
  const mobileBreakpoint = useMediaQuery("(max-width: 599px)");

  if (mobileBreakpoint) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: "column",
        width: '100%',
        height: '100%'
      }}>
        <Chat />
      </Box>
    );
  } else {
    return (
      <CustomCard>
        <Chat />
      </CustomCard>
    );
  }
};

export default ChatContainer;
