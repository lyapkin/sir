import { Stack, StyledEngineProvider, ThemeProvider } from "@mui/material";
import Body from "./components/Body/Body";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./app/store";
import Layout from "./Layout";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Stack className="App" height="100vh" justifyContent="space-between">
            <Layout>
              <Body />
            </Layout>
          </Stack>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
